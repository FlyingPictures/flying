import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

import { HomeHeroSection } from "@/app/[locale]/(home)/HomeHeroSection";
import { StructuredData } from "@/lib/structured-data";
import { cloudinaryOgUrl } from "@/lib/cloudinary";
import {
  SITE_CONTACT,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_SOCIALS,
  SITE_URL,
} from "@/lib/site-config";

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

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tHero = await getTranslations({ locale, namespace: "herosection" });

  const title = `${tHero("h1")} | ${SITE_NAME}`;
  const description = tHero("paragraph");
  const ogImage = cloudinaryOgUrl("hero1_rszxmn");

  return {
    metadataBase: new URL(SITE_URL),
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
      siteName: SITE_NAME,
      title,
      description,
      images: [{ 
        url: ogImage,
        width: 1200, 
        height: 630, 
        alt: title 
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function HomePage() {
  const image = cloudinaryOgUrl("hero1_rszxmn");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#travelagency`,
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": SITE_LOGO_URL,
    "image": image,
    "description": "Premier hot air balloon flight experience over the Teotihuacán Pyramids.",
    "telephone": SITE_CONTACT.phone,
    "areaServed": { "@type": "Place", "name": "Teotihuacán, México" },
    "address": { 
      "@type": "PostalAddress", 
      "addressCountry": "MX", 
      "addressRegion": "Estado de México" 
    },
    "sameAs": [...SITE_SOCIALS, SITE_CONTACT.whatsapp],
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
