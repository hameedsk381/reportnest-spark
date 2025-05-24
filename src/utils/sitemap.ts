
import { fetchArticles, fetchCategories } from '@/lib/supabase';

export const generateSitemap = async () => {
  const baseUrl = window.location.origin;
  const currentDate = new Date().toISOString();
  
  try {
    const [articles, categories] = await Promise.all([
      fetchArticles(),
      fetchCategories()
    ]);

    const staticPages = [
      { url: '/', changefreq: 'daily', priority: '1.0' },
      { url: '/about', changefreq: 'monthly', priority: '0.8' },
      { url: '/contribute', changefreq: 'monthly', priority: '0.7' },
    ];

    const categoryPages = categories.map(category => ({
      url: `/category/${category.slug}`,
      changefreq: 'weekly',
      priority: '0.8'
    }));

    const articlePages = articles.map(article => ({
      url: `/article/${article.slug}`,
      changefreq: 'monthly',
      priority: '0.9',
      lastmod: article.date
    }));

    const allPages = [...staticPages, ...categoryPages, ...articlePages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return null;
  }
};
