
import { Article, Category } from '@/lib/data';

export const generateArticleStructuredData = (article: Article) => {
  const baseUrl = window.location.origin;
  
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.excerpt,
    "image": [article.image],
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "image": article.author.avatar
    },
    "publisher": {
      "@type": "Organization",
      "name": "OpenVaartha",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/openvaartha-logo.jpg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/article/${article.slug}`
    },
    "articleSection": article.category,
    "wordCount": article.content.split(' ').length,
    "articleBody": article.content
  };
};

export const generateWebsiteStructuredData = () => {
  const baseUrl = window.location.origin;
  
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "OpenVaartha",
    "description": "The truth to be openly told",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/openvaartha-logo.jpg`
    },
    "sameAs": [
      // Add social media links here when available
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  };
};

export const generateBreadcrumbStructuredData = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const injectStructuredData = (data: object) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  script.setAttribute('data-structured-data', 'true');
  
  // Remove existing structured data
  const existing = document.querySelector('script[data-structured-data="true"]');
  if (existing) {
    existing.remove();
  }
  
  document.head.appendChild(script);
};
