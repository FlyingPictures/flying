import { MetadataRoute } from 'next';

const SITE_NAME = 'Flying Pictures México';
const SITE_DESCRIPTION = {
  es: 'Experimenta Teotihuacán desde el cielo con vuelos en globo aerostático',
  en: 'Experience Teotihuacán from the sky with hot air balloon flights',
};

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Flying Pictures',
    description: SITE_DESCRIPTION.en,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon-16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['travel', 'tourism', 'adventure'],
    lang: 'en',
    dir: 'ltr',
    scope: '/',
  };
}
