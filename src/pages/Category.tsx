
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { fetchArticlesByCategory, fetchCategoryBySlug } from '@/lib/supabase';
import { Article, Category as CategoryType } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryList from '@/components/CategoryList';
import ArticleCard from '@/components/ArticleCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { toast } from '@/components/ui/use-toast';
import { useSEO } from '@/hooks/useSEO';
import { generateBreadcrumbStructuredData, injectStructuredData } from '@/utils/structuredData';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  // SEO optimization for category pages
  useSEO({
    title: category ? `${category.name} News | OpenVaartha` : 'Category | OpenVaartha',
    description: category ? `Latest ${category.name.toLowerCase()} news and articles on OpenVaartha. Stay updated with the latest stories.` : 'Browse news by category on OpenVaartha',
    keywords: category ? `${category.name.toLowerCase()}, news, articles, OpenVaartha` : 'news categories, articles',
    url: window.location.href,
    type: 'website'
  });

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      
      const loadData = async () => {
        try {
          const [categoryData, articlesData] = await Promise.all([
            fetchCategoryBySlug(slug),
            fetchArticlesByCategory(slug)
          ]);
          
          setCategory(categoryData);
          setArticles(articlesData);
          
          if (categoryData) {
            // Inject breadcrumb structured data
            const breadcrumbs = [
              { name: 'Home', url: window.location.origin },
              { name: categoryData.name, url: window.location.href }
            ];
            injectStructuredData(generateBreadcrumbStructuredData(breadcrumbs));
          }
        } catch (error) {
          console.error(`Error loading category ${slug}:`, error);
          toast({
            title: "Error",
            description: "Failed to load category. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      loadData();
    }
    
    window.scrollTo(0, 0);
  }, [slug]);

  if (!isLoading && !category) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {isLoading ? (
          <div className="container mx-auto px-4 py-16 flex justify-center">
            <div className="animate-pulse space-y-8 w-full">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="flex space-x-2">
                <div className="h-10 bg-gray-200 rounded w-20"></div>
                <div className="h-10 bg-gray-200 rounded w-20"></div>
                <div className="h-10 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <div className="h-48 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : category ? (
          <>
            <section className="container mx-auto px-4 py-8">
              <h1 className="text-3xl md:text-4xl font-serif font-medium mb-6 animate-slide-down opacity-0" 
                  style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                {category.name}
              </h1>
              
              <CategoryList currentCategory={slug} />
              
              {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {articles.map((article, index) => (
                    <ArticleCard 
                      key={article.id} 
                      article={article} 
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-xl text-muted-foreground">
                    No articles found in this category.
                  </p>
                </div>
              )}
            </section>
            
            {/* Newsletter */}
            <section className="container mx-auto px-4 py-12">
              <NewsletterSignup />
            </section>
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default Category;
