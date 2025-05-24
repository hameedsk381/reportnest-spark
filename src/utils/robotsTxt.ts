
export const generateRobotsTxt = () => {
  const baseUrl = window.location.origin;
  
  return `User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin
Disallow: /auth
Disallow: /profile

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;
};
