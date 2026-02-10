import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { HomeHeroSection } from "@/app/[locale]/(home)/HomeHeroSection";
import { FlightExperienceSection } from "@/app/[locale]/(home)/HomeFlightExperience";
import { WhyFlightWhitUs } from "@/app/[locale]/(home)/WhyFlightWhitUs";
import { LiveMonitoringSection } from "@/app/[locale]/(home)/LiveMonitoringSection";
import HomeReviewsSection from "@/app/[locale]/(home)/HomeReviewsSection";

/* =========================
   CONFIG
========================= */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.flyingpicturesmexico.com";

type Props = {
  params: Promise<{ locale: string }>;
};

/* =========================
   METADATA (SEO + LLM)
========================= */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  const tHero = await getTranslations({
    locale,
    namespace: "herosection",
  });

  const title = `${tHero("h1")} | Flying Pictures México`;
  const description = tHero("paragraph");

  return {
    title,
    description,

    metadataBase: new URL(SITE_URL),

    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
      },
    },

    openGraph: {
      type: "website",
      locale,
      url: `${SITE_URL}/${locale}`,
      siteName: "Flying Pictures México",
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/images/og/home-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/og/home-${locale}.jpg`],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =========================
   STATIC LOCALES
========================= */
export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

/* =========================
   PAGE
========================= */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  /* ---------- Live Monitoring (Server data) ---------- */
  const tWeather = await getTranslations({
    locale,
    namespace: "weather",
  });

  const liveMonitoringData = {
    badge: tWeather("liveMonitoring"),
    h2: tWeather("heading"),
    paragraph: tWeather("description"),
    cards: [
      {
        title: tWeather("safetyPromise.title"),
        paragraph: tWeather("safetyPromise.description"),
        link: tWeather("safetyPromise.cta"),
      },
      {
        title: tWeather("viewPromise.title"),
        paragraph: tWeather("viewPromise.description"),
        link: tWeather("viewPromise.cta"),
      },
    ],
  };

  /* ---------- Structured Data (SEO / LLMs) ---------- */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Flying Pictures México",
    url: SITE_URL,
    description:
      "Premier hot air balloon flight experience over the Teotihuacán Pyramids, combining British aviation standards with Mexican hospitality.",
    telephone: "+525580251057",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
      addressRegion: "Estado de México",
    },
    sameAs: [
      "https://www.facebook.com/flyingpicturesmexico",
      "https://www.instagram.com/flyingpicturesmexico",
      "https://wa.me/525580251057",
    ],
    priceRange: "$$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <HomeHeroSection />

      <main className="w-full">
        <FlightExperienceSection />
        <WhyFlightWhitUs />
        <LiveMonitoringSection />
        <HomeReviewsSection />
      </main>
    </>
  );
}
