
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/lib/data';

interface CategoryListProps {
  currentCategory?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ currentCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
      <Link
        to="/"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !currentCategory
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentCategory === category.slug
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
