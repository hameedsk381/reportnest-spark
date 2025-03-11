
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { articles } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const DataImporter = () => {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const importArticles = async () => {
    setImporting(true);
    setProgress(0);
    
    try {
      // Import articles
      for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        
        // Check if article already exists
        const { data: existingArticle } = await supabase
          .from('articles')
          .select('id')
          .eq('slug', article.slug)
          .maybeSingle();
          
        if (!existingArticle) {
          // Insert the article
          const { error } = await supabase
            .from('articles')
            .insert({
              title: article.title,
              subtitle: article.subtitle || null,
              slug: article.slug,
              category: article.category,
              image: article.image,
              author_name: article.author.name,
              author_avatar: article.author.avatar,
              date: new Date(article.date).toISOString(),
              read_time: article.readTime,
              excerpt: article.excerpt,
              content: article.content,
              featured: article.featured || false,
              trending: article.trending || false,
            });
            
          if (error) {
            console.error('Error importing article:', error);
            toast({
              title: "Error",
              description: `Failed to import article: ${article.title}`,
              variant: "destructive",
            });
          }
        }
        
        // Update progress
        setProgress(Math.round(((i + 1) / articles.length) * 100));
      }
      
      toast({
        title: "Success",
        description: "Articles imported successfully",
      });
    } catch (error) {
      console.error('Error importing data:', error);
      toast({
        title: "Error",
        description: "Failed to import data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Data Importer</h3>
      <p className="text-muted-foreground mb-4">
        Use this tool to import sample articles into the database.
      </p>
      
      {importing ? (
        <div className="space-y-4">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-center">{progress}% Complete</p>
        </div>
      ) : (
        <Button onClick={importArticles}>
          Import Sample Articles
        </Button>
      )}
    </div>
  );
};

export default DataImporter;
