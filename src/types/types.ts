
import { Tables } from "@/integrations/supabase/types";

export type Article = {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: number;
  excerpt: string;
  content: string;
  featured: boolean;
  trending: boolean;
};

export type DatabaseArticle = Tables<"articles">;

export type Profile = {
  id: string;
  email: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};
