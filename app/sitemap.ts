import { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://dentl.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/services', '/about', '/blog', '/contact'].map(path => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
  return staticRoutes;
}
