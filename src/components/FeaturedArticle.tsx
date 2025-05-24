
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Article } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

interface FeaturedArticleProps {
  article: Article;
  variant?: 'large' | 'small';
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ 
  article, 
  variant = 'large' 
}) => {
  const isLarge = variant === 'large';

  return (
    <article className="group relative h-full">
      <Link 
        to={`/article/${article.slug}`}
        className="block relative h-full rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 ease-out"
      >
        {/* Image Container */}
        <div className={`relative overflow-hidden ${isLarge ? 'aspect-[4/3]' : 'aspect-video'}`}>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          <Badge 
            variant="secondary" 
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 border-0 shadow-sm font-medium z-10"
          >
            {article.category}
          </Badge>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-white/80 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
          </div>

          {/* Title */}
          <h2 className={`font-serif font-bold text-white mb-3 leading-tight group-hover:text-white/90 transition-colors duration-200 ${
            isLarge ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'
          }`}>
            {article.title}
          </h2>

          {/* Excerpt - Only show on large variant */}
          {isLarge && (
            <p className="text-white/90 text-base leading-relaxed mb-4 line-clamp-2">
              {article.excerpt}
            </p>
          )}

          {/* Author and Read More */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {article.author.avatar && (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
                />
              )}
              <div className="flex items-center gap-1 text-sm text-white/80">
                <User className="w-4 h-4" />
                <span>{article.author.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm text-white/80 group-hover:text-white transition-colors duration-200">
              <span>Read more</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>

        {/* Hover Ring Effect */}
        <div className="absolute inset-0 ring-2 ring-primary/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Link>
    </article>
  );
};

export default FeaturedArticle;
