import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HomeHeroSection } from '@/app/[locale]/(home)/HomeHeroSection';
import { FlightExperienceSection } from '@/app/[locale]/(home)/HomeFlightExperience';
import HomeReviewsSection from '@/app/[locale]/(home)/HomeReviewsSection';
import { WhyFlightWhitUs } from '@/app/[locale]/(home)/WhyFlightWhitUs';
import { LiveMonitoringSection } from '@/app/[locale]/(home)/LiveMonitoringSection';

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "herosection" });

  const title = t("h1") + " | Flying Pictures México";
  const description = t("paragraph");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: "Flying Pictures México",
      images: [
        {
          url: `${SITE_URL}/images/og/home-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/og/home-${locale}.jpg`],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // 1. Cargar traducciones
  const tWeather = await getTranslations({ locale, namespace: "weather" });
  const tWhy = await getTranslations({ locale, namespace: "flightExperiences.whyChoose" });

  // 2. Mapear datos para LiveMonitoringSection 
  // CORRECCIÓN: Se añaden los campos faltantes para cumplir con la Interface
  const liveMonitoringData = {
    badge: tWeather("liveMonitoring"),
    h2: tWeather("heading"),
    paragraph: tWeather("description"),
    cards: [
      { 
        title: tWeather("safetyPromise.title"), 
        paragraph: tWeather("safetyPromise.description"), 
        link: tWeather("safetyPromise.cta") 
      },
      { 
        title: tWeather("viewPromise.title"), 
        paragraph: tWeather("viewPromise.description"), 
        link: tWeather("viewPromise.cta") 
      }
    ],
    station: {
      name: tWeather("station"),
      status: tWeather("status"),
      // Campos requeridos por la interface de LiveMonitoringSection:
      windSpeed: tWeather("windSpeed"),
      visibility: tWeather("visibility"),
      temperature: tWeather("temperature"),
      pressure: tWeather("pressure")
    }
  };

  // 3. Mapear datos para WhyFlightWhitUs
  const whyFlyData = {
    h2: tWhy("title"),
    paragraph: "", 
    cards: [
      { title: tWhy("reasons.0.title"), paragraph: tWhy("reasons.0.description") },
      { title: tWhy("reasons.1.title"), paragraph: tWhy("reasons.1.description") },
      { title: tWhy("reasons.2.title"), paragraph: tWhy("reasons.2.description") },
      { title: tWhy("reasons.3.title"), paragraph: tWhy("reasons.3.description") },
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Flying Pictures México",
    description: "Premier hot air balloon flight experience over Teotihuacán Pyramids.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    telephone: "+525580251057",
    email: "fly@flyingpictures.mx",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carretera a las Pirámides",
      addressLocality: "Teotihuacán",
      addressRegion: "Edo. Mex.",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.692,
      longitude: -98.844,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "04:00",
      closes: "20:00",
    },
    sameAs: [
      "https://www.facebook.com/flyingpicturesmexico",
      "https://www.instagram.com/flyingpicturesmexico",
      "https://wa.me/525580251057",
    ],
    award: "Best Balloon Experience 2024",
    priceRange: "$$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HomeHeroSection />
      
      <main className="w-full">
        <FlightExperienceSection />
        
        {/* Secciones con traducciones mapeadas */}
        <WhyFlightWhitUs translations={whyFlyData} />
        <LiveMonitoringSection translations={liveMonitoringData} />
        
        <HomeReviewsSection />
      </main>
    </>
  );
}