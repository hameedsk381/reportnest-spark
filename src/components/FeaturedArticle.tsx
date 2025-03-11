
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '@/lib/data';

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          containerRef.current?.classList.add('animate-fade-in');
          containerRef.current?.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div ref={containerRef} className="group relative opacity-0" style={{ animationFillMode: 'forwards' }}>
      <Link to={`/article/${article.slug}`} className="block overflow-hidden">
        <div className="relative h-[70vh] max-h-[70vh] overflow-hidden rounded-lg">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 uppercase tracking-wide">
              Featured
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-medium mb-3 max-w-4xl leading-tight">
              {article.title}
            </h2>
            {article.subtitle && (
              <p className="text-xl md:text-2xl font-light mb-6 max-w-3xl text-white/90">
                {article.subtitle}
              </p>
            )}
            <p className="text-lg max-w-2xl mb-6 text-white/80">
              {article.excerpt}
            </p>
            <div className="flex items-center space-x-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
              />
              <div>
                <div className="font-medium">{article.author.name}</div>
                <div className="text-sm text-white/70">
                  {formatDate(article.date)} • {article.readTime} min read
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedArticle;
