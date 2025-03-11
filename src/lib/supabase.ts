
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
  
  return data?.map(transformArticleFromDB) || [];
};

export const fetchArticleBySlug = async (slug: string): Promise<Article | null> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  
  if (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
  
  return data ? transformArticleFromDB(data) : null;
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
  
  return data?.map(transformArticleFromDB) || [];
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
  
  return data?.map(transformArticleFromDB) || [];
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
  
  return data?.map(transformArticleFromDB) || [];
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
  
  return data?.map(transformArticleFromDB) || [];
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
    .maybeSingle();
  
  if (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
  
  return data;
};

// Transform function to convert database article format to our Article interface
function transformArticleFromDB(dbArticle: any): Article {
  return {
    id: dbArticle.id,
    title: dbArticle.title,
    subtitle: dbArticle.subtitle || undefined,
    slug: dbArticle.slug,
    category: dbArticle.category,
    image: dbArticle.image,
    author: {
      name: dbArticle.author_name,
      avatar: dbArticle.author_avatar,
    },
    date: dbArticle.date.toString(),
    readTime: dbArticle.read_time,
    excerpt: dbArticle.excerpt,
    content: dbArticle.content,
    featured: dbArticle.featured || false,
    trending: dbArticle.trending || false,
  };
}

// Saved Articles functions
export const saveArticle = async (articleId: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User must be logged in to save articles');
  }
  
  const { error } = await supabase
    .from('saved_articles')
    .insert({ user_id: user.user.id, article_id: articleId });
    
  if (error) {
    if (error.code === '23505') { // Unique violation
      console.log('Article already saved');
      return;
    }
    console.error('Error saving article:', error);
    throw error;
  }
};

export const unsaveArticle = async (articleId: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User must be logged in to unsave articles');
  }
  
  const { error } = await supabase
    .from('saved_articles')
    .delete()
    .eq('user_id', user.user.id)
    .eq('article_id', articleId);
    
  if (error) {
    console.error('Error unsaving article:', error);
    throw error;
  }
};

export const fetchSavedArticles = async (): Promise<Article[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('saved_articles')
    .select('article_id, articles(*)')
    .eq('user_id', user.user.id);
    
  if (error) {
    console.error('Error fetching saved articles:', error);
    return [];
  }
  
  return data?.map(item => transformArticleFromDB(item.articles)) || [];
};

// Comments functions
export const fetchComments = async (articleId: string) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*, profiles(display_name, avatar_url)')
    .eq('article_id', articleId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  
  return data || [];
};

export const addComment = async (articleId: string, content: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User must be logged in to comment');
  }
  
  const { error } = await supabase
    .from('comments')
    .insert({ 
      user_id: user.user.id, 
      article_id: articleId,
      content 
    });
    
  if (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const updateComment = async (commentId: string, content: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User must be logged in to update comments');
  }
  
  const { error } = await supabase
    .from('comments')
    .update({ content })
    .eq('id', commentId)
    .eq('user_id', user.user.id);
    
  if (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User must be logged in to delete comments');
  }
  
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', user.user.id);
    
  if (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

// User profile functions
export const fetchUserProfile = async () => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    return null;
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.user.id)
    .maybeSingle();
    
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
};

export const updateUserProfile = async (profile: { display_name?: string, avatar_url?: string, bio?: string }) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('User must be logged in to update profile');
  }
  
  const { error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', user.user.id);
    
  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
