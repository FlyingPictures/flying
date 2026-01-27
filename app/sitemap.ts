import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.flyingpicturesmexico.com';

// Rutas estáticas de la aplicación
const staticRoutes = [
  '',
  '/contact',
  '/flight-experiences',
  '/plan-your-visit',
  '/safety-heritage',
  '/legal/terms',
  '/legal/privacy',
  '/legal/cancellation',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Generar entradas para cada idioma y ruta
  routing.locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      const url = `${SITE_URL}/${locale}${route}`;
      const alternateUrls = routing.locales.map((altLocale) => ({
        hreflang: altLocale,
        url: `${SITE_URL}/${altLocale}${route}`,
      }));

      routes.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            alternateUrls.map((alt) => [alt.hreflang, alt.url])
          ),
        },
      });
    });
  });

  return routes;
}
