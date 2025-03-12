import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '@/lib/data';
import ShinyText from './ui/ShinyText';

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
    <div ref={containerRef} className="group relative opacity-0 " style={{ animationFillMode: 'forwards' }}>
      <Link to={`/article/${article.slug}`} className="block overflow-hidden">
        <div className="relative h-[15rem] md:h-[25rem] overflow-hidden rounded-lg">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-2 uppercase tracking-wide">
            <ShinyText text="featured" disabled={false} speed={3} className='custom-class' />
            </div>
            <h2 className="text-xl font-serif font-medium mb-2 leading-tight">
              {article.title}
            </h2>
            {article.subtitle && (
              <p className="text-base font-light mb-3 text-white/90">
                {article.subtitle}
              </p>
            )}
            <p className="text-sm mb-3 text-white/80">
              {article.excerpt}
            </p>
            <div className="flex items-center space-x-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-white/50"
              />
              <div>
                <div className="text-sm font-medium">{article.author.name}</div>
                <div className="text-xs text-white/70">
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
