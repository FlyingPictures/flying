import { Locale } from '@/i18n/config';
import {
  SITE_CONTACT,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_SOCIALS,
  SITE_URL,
} from '@/lib/site-config';

interface StructuredDataProps {
  data: Record<string, unknown>;
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
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO_URL,
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
      telephone: SITE_CONTACT.phone,
      contactType: 'Customer Service',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [...SITE_SOCIALS],
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
      name: SITE_NAME,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Mexico',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: SITE_URL,
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
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: locale,
    alternateName: ['Flying Pictures', 'Vuelos en Globo Teotihuacán'],
  };
}
