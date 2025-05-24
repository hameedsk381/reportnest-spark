
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/lib/data';

interface CategoryListProps {
  currentCategory?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ currentCategory }) => {
  return (
    <div className="relative">
      {/* Gradient Fade Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide px-4 py-2 animate-slide-up opacity-0" 
           style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <Link
          to="/"
          className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out ${
            !currentCategory
              ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 hover:shadow-md'
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap ${
              currentCategory === category.slug
                ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 hover:shadow-md'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
