
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { categories } from '@/lib/data';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would trigger a search
    console.log('Search query:', searchQuery);
    setSearchOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-serif font-bold tracking-tight animate-slide-down opacity-0"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            NewsDaily
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 animate-slide-down opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="text-sm font-medium hover:text-primary/70 transition-colors relative group"
              >
                {category.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu Buttons */}
          <div className="flex items-center space-x-4 animate-slide-down opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-secondary transition-colors md:hidden"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-black shadow-lg p-4 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                placeholder="Search for articles..."
                className="flex-1 p-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground p-2 ml-2"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-black shadow-lg p-4 md:hidden animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="text-lg font-medium hover:text-primary/70 transition-colors p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
