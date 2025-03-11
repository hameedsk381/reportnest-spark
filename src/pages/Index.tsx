
import React, { useEffect } from 'react';
import { getFeaturedArticles, getTrendingArticles, getLatestArticles } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import CategoryList from '@/components/CategoryList';
import NewsletterSignup from '@/components/NewsletterSignup';

const Index = () => {
  const featuredArticles = getFeaturedArticles();
  const trendingArticles = getTrendingArticles();
  const latestArticles = getLatestArticles().slice(0, 6);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'NewsDaily - Breaking News and In-Depth Journalism';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section with Featured Article */}
        <section className="container mx-auto px-4 py-8">
          {featuredArticles.length > 0 && (
            <FeaturedArticle article={featuredArticles[0]} />
          )}
        </section>

        {/* Categories Navigation */}
        <section className="container mx-auto px-4 py-8">
          <CategoryList />
        </section>

        {/* Trending Articles */}
        {trendingArticles.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-serif font-medium mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Trending Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {trendingArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Latest Articles */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-serif font-medium mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {latestArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
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
