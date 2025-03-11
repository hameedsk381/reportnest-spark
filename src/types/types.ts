export type Article = {
    id: string;
    title: string;
    subtitle?: string;
    slug: string;
    category: string;
    image: string;
    author_name: string;
    author_avatar: string;
    date: string;
    read_time: number;
    excerpt: string;
    content: string;
    featured: boolean;
    trending: boolean;
    created_at: string;
    updated_at: string;
  };
  
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