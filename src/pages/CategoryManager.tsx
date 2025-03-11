import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Category } from "@/lib/data";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const CategoriesManager = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
  
    useEffect(() => {
      const fetchCategories = async () => {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('created_at', { ascending: false });
  
        if (data) setCategories(data);
      };
  
      fetchCategories();
    }, []);
  
    const handleAddCategory = async () => {
      if (!newCategory.trim()) {
        toast.error("Category name cannot be empty");
        return;
      }
  
      setIsAdding(true);
      const slug = newCategory.toLowerCase().replace(/\s+/g, '-');
      
      // Check if category already exists
      const { data: existing } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (existing) {
        toast.error("Category already exists");
        setIsAdding(false);
        return;
      }

      const { data, error } = await supabase
        .from('categories')
        .insert([{ 
          name: newCategory, 
          slug,
          created_at: new Date().toISOString()
        }])
        .select();
  
      if (data) {
        setCategories([data[0], ...categories]);
        setNewCategory('');
        toast.success("Category added successfully");
      } else {
        toast.error("Error adding category");
      }
      setIsAdding(false);
    };

    const handleDeleteCategory = async (id: string) => {
      setIsDeleting(true);
      
      // First check if category is being used in any articles
      const { data: articles } = await supabase
        .from('articles')
        .select('*')
        .eq('category', id);

      if (articles && articles.length > 0) {
        toast.error("Cannot delete category - it is being used by articles");
        setIsDeleting(false);
        return;
      }

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (!error) {
        setCategories(categories.filter(category => category.id !== id));
        toast.success("Category deleted successfully");
      } else {
        toast.error("Error deleting category");
      }
      setIsDeleting(false);
    };
  
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)} 
            placeholder="New category"
            onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
          />
          <Button 
            onClick={handleAddCategory}
            disabled={isAdding || !newCategory.trim()}
          >
            {isAdding ? "Adding..." : "Add"}
          </Button>
        </div>
        
        <Table>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDeleteCategory(category.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };