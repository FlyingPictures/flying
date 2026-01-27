import { Locale } from '@/i18n/config';

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Schema.org Organization
export function getOrganizationSchema(locale: Locale = 'en') {
  const isSpanish = locale === 'es';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Flying Pictures México',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.flyingpicturesmexico.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.flyingpicturesmexico.com'}/favicon.svg`,
    description: isSpanish
      ? 'Empresa de aviación líder en vuelos en globo aerostático sobre Teotihuacán'
      : 'Leading aviation company for hot air balloon flights over Teotihuacán',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MX',
      addressRegion: 'Estado de México',
      addressLocality: 'Teotihuacán',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [
      // Agregar redes sociales aquí cuando estén disponibles
      // 'https://www.facebook.com/flyingpicturesmexico',
      // 'https://www.instagram.com/flyingpicturesmexico',
    ],
  };
}

// Schema.org TouristAttraction
export function getTouristAttractionSchema(locale: Locale = 'en') {
  const isSpanish = locale === 'es';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: isSpanish
      ? 'Vuelos en Globo Aerostático Teotihuacán'
      : 'Hot Air Balloon Flights Teotihuacán',
    description: isSpanish
      ? 'Vive una experiencia única volando sobre las pirámides de Teotihuacán en globo aerostático'
      : 'Experience a unique adventure flying over the Teotihuacán pyramids in a hot air balloon',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MX',
      addressRegion: 'Estado de México',
      addressLocality: 'Teotihuacán',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.6925',
      longitude: '-98.8439',
    },
  };
}

// Schema.org Service
export function getServiceSchema(locale: Locale = 'en') {
  const isSpanish = locale === 'es';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: isSpanish ? 'Vuelo en Globo Aerostático' : 'Hot Air Balloon Flight',
    provider: {
      '@type': 'Organization',
      name: 'Flying Pictures México',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Mexico',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.flyingpicturesmexico.com',
    },
  };
}

// Schema.org BreadcrumbList
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Schema.org WebSite
export function getWebSiteSchema(locale: Locale = 'en') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.flyingpicturesmexico.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Flying Pictures México',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: locale,
    alternateName: ['Flying Pictures', 'Vuelos en Globo Teotihuacán'],
  };
}
