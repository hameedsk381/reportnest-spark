
import { supabase } from '@/integrations/supabase/client';
import { Article, Category } from '@/lib/data';

// Articles
export const fetchArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
  
  return data || [];
};

export const fetchArticleBySlug = async (slug: string): Promise<Article | null> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
  
  return data;
};

export const fetchArticlesByCategory = async (categorySlug: string): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', categorySlug)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error(`Error fetching articles for category ${categorySlug}:`, error);
    return [];
  }
  
  return data || [];
};

export const fetchFeaturedArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
  
  return data || [];
};

export const fetchTrendingArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('trending', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching trending articles:', error);
    return [];
  }
  
  return data || [];
};

export const fetchLatestArticles = async (limit = 6): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
  
  return data || [];
};

// Categories
export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data || [];
};

export const fetchCategoryBySlug = async (slug: string): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
  
  return data;
};
