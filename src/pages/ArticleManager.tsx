import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Article, Category } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CopyIcon, Share2Icon } from "lucide-react";

const ArticleManager = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<Partial<Article>>({
      featured: false,
      trending: false
    });
    const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        const { data: articlesData } = await supabase.from('articles').select('*');
        const { data: categoriesData } = await supabase.from('categories').select('*');
        
        if (articlesData) setArticles(articlesData);
        if (categoriesData) setCategories(categoriesData.map(cat => ({
            ...cat,
            updated_at: (cat as any).updated_at || cat.created_at
        })));
      };
  
      fetchData();
    }, []);

    const handleEdit = (article: Article) => {
      setFormData(article);
    };

    const handleDelete = async (id: string) => {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (!error) {
        setArticles(articles.filter(article => article.id !== id));
        toast("Article deleted successfully!");
      } else {
        toast.error("Error deleting article");
      }
    };

    const handleCopyLink = (slug: string) => {
      const url = `${window.location.origin}/articles/${slug}`;
      navigator.clipboard.writeText(url);
      toast("Link copied to clipboard!");
    };

    const handleShare = async (slug: string) => {
      const url = `${window.location.origin}/articles/${slug}`;
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Check out this article!',
            url: url
          });
        } else {
          navigator.clipboard.writeText(url);
          toast("Link copied to clipboard!");
        }
      } catch (error) {
        console.error('Error sharing:', error);
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const articleData = {
        ...formData,
        slug: formData.title?.toLowerCase().replace(/ /g, '-'),
        updated_at: new Date().toISOString(),
        author_avatar: formData.author_avatar || '',
        author_name: formData.author_name || '',
        category: formData.category || '',
        content: formData.content || '',
        excerpt: formData.excerpt || '',
        image: formData.image || '',
        read_time: formData.read_time || 0,
        date: formData.date || new Date().toISOString()
      };

      const { error } = await supabase.from('articles').upsert({
        ...articleData,
        title: formData.title || '',
        subtitle: formData.subtitle || ''
      });
  
      if (!error) {
        toast("Article saved successfully!");
        const { data: articlesData } = await supabase.from('articles').select('*');
        if (articlesData) setArticles(articlesData);
        setFormData({ featured: false, trending: false });
      } else {
        toast.error("Error saving article");
      }
    };
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Manage Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map(article => (
                  <TableRow key={article.id}>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>{article.category}</TableCell>
                    <TableCell>
                      <Badge variant={article.featured ? 'default' : 'secondary'}>
                        {article.featured ? 'Featured' : 'Regular'}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(article)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleDelete(article.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyLink(article.slug || '')}
                      >
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(article.slug || '')}
                      >
                        <Share2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle>{formData.id ? 'Edit' : 'Create'} Article</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input 
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Subtitle</Label>
                <Input 
                  value={formData.subtitle || ''}
                  onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>
              
              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category || ''}
                  onValueChange={value => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.slug} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Image URL</Label>
                <Input 
                  value={formData.image || ''}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Excerpt</Label>
                <Textarea
                  value={formData.excerpt || ''}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Content</Label>
                <Dialog open={isContentModalOpen} onOpenChange={setIsContentModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {formData.content ? 'Edit Content' : 'Add Content'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                    <DialogHeader>
                      <DialogTitle>Article Content</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-4 overflow-hidden">
                      <div className="flex flex-col gap极4 h-full">
                        <Textarea
                          value={formData.content || ''}
                          onChange={e => setFormData({ ...formData, content: e.target.value })}
                          required
                          className="h-[40vh] md:h-full resize-none border-1"
                          placeholder="Write your markdown content here..."
                        />
                      </div>
                      <div className="overflow-y-auto p-4 border rounded h-[40vh] md:h-full">
                        <ReactMarkdown >
                          {formData.content || '*Start typing to see preview...*'}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div>
                <Label>Author Name</Label>
                <Input 
                  value={formData.author_name || ''}
                  onChange={e => setFormData({ ...formData, author_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Author Avatar URL</Label>
                <Input 
                  value={formData.author_avatar || ''}
                  onChange={e => setFormData({ ...formData, author_avatar: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Read Time (minutes)</Label>
                <Input 
                  type="number"
                  value={formData.read_time || 0}
                  onChange={e => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
                  required
                />
              </div>

              <div>
                <Label>Publish Date</Label>
                <Input 
                  type="date"
                  value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                  onChange={e => setFormData({ ...formData, date: new Date(e.target.value).toISOString() })}
                  required
                />
              </div>
  
              <div className="flex gap-4">
                <Label className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.featured}
                    onCheckedChange={checked => setFormData({ ...formData, featured: !!checked })}
                  />
                  Featured
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.trending}
                    onCheckedChange={checked => setFormData({ ...formData, trending: !!checked })}
                  />
                  Trending
                </Label>
              </div>
  
              <Button type="submit">Save Article</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };
  export default ArticleManager;