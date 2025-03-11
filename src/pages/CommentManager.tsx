import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const CommentManager = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all comments
  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .select(`*, profiles(display_name, avatar_url), articles(title)`)
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error fetching comments', variant: 'destructive' });
    } else {
      setComments(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Delete a comment
  const handleDeleteComment = async (commentId: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      toast({ title: 'Error deleting comment', variant: 'destructive' });
    } else {
      toast({ title: 'Comment deleted successfully' });
      fetchComments(); // Refresh the list
    }
  };

  // Filter comments by article title or user name
  const filteredComments = comments.filter(
    (comment) =>
      comment.articles?.title.toLowerCase().includes(filter.toLowerCase()) ||
      comment.profiles?.display_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Comment Management</h2>
        <Input
          placeholder="Search by article or user..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Article</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredComments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={comment.profiles?.avatar_url || '/default-avatar.png'}
                    alt={comment.profiles?.display_name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{comment.profiles?.display_name || 'Anonymous'}</span>
                </div>
              </TableCell>
              <TableCell>{comment.articles?.title}</TableCell>
              <TableCell>{comment.content}</TableCell>
              <TableCell>
                {new Date(comment.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {loading && <div className="text-center py-4">Loading comments...</div>}
      {!loading && filteredComments.length === 0 && (
        <div className="text-center py-4">No comments found.</div>
      )}
    </div>
  );
};

export default CommentManager;