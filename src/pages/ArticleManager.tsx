import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Article, Category } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ArticleManager = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<Partial<Article>>({
      featured: false,
      trending: false
    });
  
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
                    <TableCell>
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