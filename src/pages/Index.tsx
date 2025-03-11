
import React, { useEffect, useState } from 'react';
import { fetchFeaturedArticles, fetchTrendingArticles, fetchLatestArticles } from '@/lib/supabase';
import { Article } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import CategoryList from '@/components/CategoryList';
import NewsletterSignup from '@/components/NewsletterSignup';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'NewsDaily - Breaking News and In-Depth Journalism';
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [featured, trending, latest] = await Promise.all([
          fetchFeaturedArticles(),
          fetchTrendingArticles(),
          fetchLatestArticles(6)
        ]);
        
        setFeaturedArticles(featured);
        setTrendingArticles(trending);
        setLatestArticles(latest);
      } catch (error) {
        console.error('Error loading home page data:', error);
        toast({
          title: "Error",
          description: "Failed to load articles. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section with Featured Article */}
        <section className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-lg"></div>
          ) : featuredArticles.length > 0 ? (
            <FeaturedArticle article={featuredArticles[0]} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured articles available</p>
            </div>
          )}
        </section>

        {/* Categories Navigation */}
        <section className="container mx-auto px-4 py-8">
          <CategoryList />
        </section>

        {/* Trending Articles */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-serif font-medium mb-6 animate-slide-up opacity-0" 
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Trending Now
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-video bg-gray-200 animate-pulse rounded-lg"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                  <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          ) : trendingArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {trendingArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No trending articles available</p>
            </div>
          )}
        </section>

        {/* Latest Articles */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-serif font-medium mb-6 animate-slide-up opacity-0" 
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Latest Articles
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-video bg-gray-200 animate-pulse rounded-lg"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3"></div>
                  <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          ) : latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {latestArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No articles available</p>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="container mx-auto px-4 py-12">
          <NewsletterSignup />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
