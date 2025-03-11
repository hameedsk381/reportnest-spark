
import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { fetchArticleBySlug, fetchLatestArticles } from '@/lib/supabase';
import { Article as ArticleType } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { toast } from '@/components/ui/use-toast';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      
      const loadData = async () => {
        try {
          const articleData = await fetchArticleBySlug(slug);
          setArticle(articleData);
          
          if (articleData) {
            document.title = `${articleData.title} | NewsDaily`;
            
            // Get related articles (in a real app, these would be more relevant)
            const latest = await fetchLatestArticles(4);
            setRelatedArticles(latest.filter(a => a.id !== articleData.id).slice(0, 3));
          }
        } catch (error) {
          console.error(`Error loading article ${slug}:`, error);
          toast({
            title: "Error",
            description: "Failed to load article. Please try again later.",
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!isLoading && !article) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {isLoading ? (
          <div className="container mx-auto px-4 py-16 flex justify-center">
            <div className="animate-pulse space-y-8 w-full max-w-3xl">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-[400px] bg-gray-200 rounded w-full"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ) : article ? (
          <>
            <article className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
              {/* Category and Date */}
              <div className="mb-4 flex items-center space-x-2 text-sm text-muted-foreground">
                <Link 
                  to={`/category/${article.category}`} 
                  className="uppercase tracking-wider hover:text-primary transition-colors"
                >
                  {article.category}
                </Link>
                <span>•</span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                <span>•</span>
                <span>{article.readTime} min read</span>
              </div>
              
              {/* Title and Subtitle */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-4">
                {article.title}
              </h1>
              {article.subtitle && (
                <p className="text-xl md:text-2xl text-muted-foreground font-light mb-6">
                  {article.subtitle}
                </p>
              )}
              
              {/* Author */}
              <div className="flex items-center space-x-4 mb-8">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{article.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Published on {formatDate(article.date)}
                  </div>
                </div>
              </div>
              
              {/* Featured Image */}
              <figure className="my-8">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto rounded-lg"
                />
              </figure>
              
              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none" 
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              
              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Published in{' '}
                    <Link 
                      to={`/category/${article.category}`} 
                      className="text-primary hover:underline"
                    >
                      {article.category}
                    </Link>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-sm font-medium hover:text-primary transition-colors">
                      Share
                    </button>
                    <button className="text-sm font-medium hover:text-primary transition-colors">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </article>
            
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section className="container mx-auto px-4 py-12 max-w-6xl">
                <h2 className="text-2xl font-serif font-medium mb-8">More Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedArticles.map((relatedArticle, index) => (
                    <ArticleCard 
                      key={relatedArticle.id} 
                      article={relatedArticle} 
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}
            
            {/* Newsletter */}
            <section className="container mx-auto px-4 py-12 max-w-4xl">
              <NewsletterSignup />
            </section>
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default Article;
