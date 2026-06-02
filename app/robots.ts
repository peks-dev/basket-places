import type { MetadataRoute } from 'next';

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://www.basket-places.website';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/contribuir', '/perfil'],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
