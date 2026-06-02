import type { MetadataRoute } from 'next';

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://www.basket-places.website';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/sign-in'];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return staticEntries;
}
