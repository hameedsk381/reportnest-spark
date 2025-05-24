
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags
}: SEOProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set meta tag
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Basic meta tags
    setMetaTag('description', description);
    if (keywords) setMetaTag('keywords', keywords);
    setMetaTag('robots', 'index, follow');
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:site_name', 'OpenVaartha', true);
    
    if (url) setMetaTag('og:url', url, true);
    if (image) setMetaTag('og:image', image, true);
    
    if (type === 'article') {
      if (publishedTime) setMetaTag('article:published_time', publishedTime, true);
      if (modifiedTime) setMetaTag('article:modified_time', modifiedTime, true);
      if (author) setMetaTag('article:author', author, true);
      if (section) setMetaTag('article:section', section, true);
      if (tags) {
        tags.forEach(tag => {
          const tagElement = document.createElement('meta');
          tagElement.setAttribute('property', 'article:tag');
          tagElement.content = tag;
          document.head.appendChild(tagElement);
        });
      }
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    if (image) setMetaTag('twitter:image', image);

    // Cleanup function to remove added meta tags
    return () => {
      const metaTags = document.querySelectorAll('meta[data-dynamic="true"]');
      metaTags.forEach(tag => tag.remove());
    };
  }, [title, description, keywords, image, url, type, publishedTime, modifiedTime, author, section, tags]);
};
