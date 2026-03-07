import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

import { HomeHeroSection } from "@/app/[locale]/(home)/HomeHeroSection";
import { StructuredData } from "@/lib/structured-data";

// Componentes cargados dinámicamente para mejorar el LCP y reducir el JS inicial
const FlightExperienceSection = dynamic(
  () => import("@/app/[locale]/(home)/HomeFlightExperience").then(m => ({ default: m.FlightExperienceSection })),
  { loading: () => <div className="min-h-[400px]" /> }
);
const WhyFlightWhitUs = dynamic(
  () => import("@/app/[locale]/(home)/WhyFlightWhitUs").then(m => ({ default: m.WhyFlightWhitUs }))
);
const LiveMonitoringSection = dynamic(
  () => import("@/app/[locale]/(home)/LiveMonitoringSection").then(m => ({ default: m.LiveMonitoringSection }))
);
const HomeReviewsSection = dynamic(
  () => import("@/app/[locale]/(home)/HomeReviewsSection")
);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.mx";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tHero = await getTranslations({ locale, namespace: "herosection" });

  const title = `${tHero("h1")} | Flying Pictures México`;
  const description = tHero("paragraph");
  
  // Limpieza de URL para evitar errores de canonical
  const baseUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    robots: { 
      index: true, 
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    alternates: {
      // Usamos rutas relativas; Next.js las hace absolutas automáticamente con metadataBase
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale,
      url: `/${locale}`,
      siteName: "Flying Pictures México",
      title,
      description,
      images: [{ 
        url: `/images/og/home-${locale}.jpg`, 
        width: 1200, 
        height: 630, 
        alt: title 
      }],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#travelagency`,
    "name": "Flying Pictures México",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`, 
    "image": `${SITE_URL}/images/og/home-${locale}.jpg`,
    "description": "Premier hot air balloon flight experience over the Teotihuacán Pyramids.",
    "telephone": "+525580251057",
    "areaServed": { "@type": "Place", "name": "Teotihuacán, México" },
    "address": { 
      "@type": "PostalAddress", 
      "addressCountry": "MX", 
      "addressRegion": "Estado de México" 
    },
    "sameAs": [
      "https://www.facebook.com/flyingpicturesmexico",
      "https://www.instagram.com/flyingpicturesmexico",
      "https://wa.me/525580251057",
    ],
    "priceRange": "$$$",
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <HomeHeroSection />
      <FlightExperienceSection />
      <WhyFlightWhitUs />
      <LiveMonitoringSection />
      <HomeReviewsSection />
    </>
  );
}