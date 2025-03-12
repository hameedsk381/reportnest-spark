import React, { useEffect, useState, useLayoutEffect } from 'react';
import { fetchFeaturedArticles, fetchTrendingArticles, fetchLatestArticles } from '@/lib/supabase';
import { Article } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import CategoryList from '@/components/CategoryList';
import NewsletterSignup from '@/components/NewsletterSignup';
import { toast } from '@/components/ui/use-toast';
import { FeaturedSection } from '@/components/FeaturedSection';
import ScrollVelocity from '@/components/ScrollVelocity/ScrollVelocity';
import RollingGallery from '@/components/RollingGallery/RollingGallery';
import FeaturedArticle from '@/components/FeaturedArticle';

const Index = () => {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useLayoutEffect(() => {
    // Reduce initial animation time
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'OpenVaartha - The Truth Openly Told';
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [featured, trending, latest] = await Promise.all([
          fetchFeaturedArticles(),
          fetchTrendingArticles(),
          fetchLatestArticles(6)
        ]);
        
        // Batch state updates to reduce re-renders
        setTimeout(() => {
          setFeaturedArticles(featured);
          setTrendingArticles(trending);
          setLatestArticles(latest);
        }, 100);
      } catch (error) {
        console.error('Error loading home page data:', error);
        toast({
          title: "Error",
          description: "Failed to load articles. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setTimeout(() => setIsLoading(false), 300);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Categories Navigation */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="max-w-7xl mx-auto">
            <CategoryList />
          </div>
        </section>

        {/* Hero Section with Featured Article */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            {isLoading || isAnimating ? (
              <div className="h-[50vh] bg-gray-200 animate-pulse rounded-lg transition-opacity duration-300 ease-in-out" />
            ) : featuredArticles.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6">
                  {featuredArticles.slice(0, 1).map((article) => (
                    <FeaturedArticle key={article.id} article={article} />
                  ))}
                </div>
                <div className="lg:col-span-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredArticles.slice(1, 3).map((article) => (
                      <FeaturedArticle key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No featured articles available</p>
              </div>
            )}
          </div>
        </section>

        {/* Trending Articles */}
        <section className="container mx-auto px-4 pb-8">
          <h2 className="text-2xl font-serif font-medium mb-6">
            Trending Now
          </h2>
          
          {isLoading || isAnimating ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-video bg-gray-200 rounded-lg" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-8 bg-gray-200 rounded" />
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
          <h2 className="text-2xl font-serif font-medium mb-6">
            Latest Articles
          </h2>
          
          {isLoading || isAnimating ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-video bg-gray-200 rounded-lg" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-8 bg-gray-200 rounded" />
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
      
        <ScrollVelocity
          texts={['OpenVaartha', 'OpnVaartha']} 
          velocity={20} // Reduced velocity for smoother scrolling
          className="custom-scroll-text"
        />
        <RollingGallery autoplay={true} pauseOnHover={false} />
        
        <section className="container mx-auto px-4 pb-8">
          {isLoading || isAnimating ? (
            <div className="w-full aspect-video bg-gray-200 rounded-lg" />
          ) : featuredArticles.length > 0 ? (
            <FeaturedSection />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured articles available</p>
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
