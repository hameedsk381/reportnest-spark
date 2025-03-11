
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '@/lib/data';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add('animate-slide-up');
          cardRef.current?.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
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
    <div 
      ref={cardRef} 
      className="group opacity-0"
      style={{ animationDelay: `${0.1 * index}s`, animationFillMode: 'forwards' }}
    >
      <Link to={`/article/${article.slug}`} className="block overflow-hidden">
        <div className="relative overflow-hidden rounded-lg aspect-[16/9] mb-4">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="uppercase tracking-wider">{article.category}</span>
            <span>•</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span>•</span>
            <span>{article.readTime} min read</span>
          </div>
          <h3 className="text-xl font-serif font-medium line-clamp-2 group-hover:text-primary/80 transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {article.excerpt}
          </p>
          <div className="flex items-center space-x-3 pt-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{article.author.name}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
