import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { HomeHeroSection } from "@/app/[locale]/(home)/HomeHeroSection";
import { FlightExperienceSection } from "@/app/[locale]/(home)/HomeFlightExperience";
import HomeReviewsSection from "@/app/[locale]/(home)/HomeReviewsSection";
import { WhyFlightWhitUs } from "@/app/[locale]/(home)/WhyFlightWhitUs";
import { LiveMonitoringSection } from "@/app/[locale]/(home)/LiveMonitoringSection";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.flyingpicturesmexico.com";

/* =========================
   METADATA
========================= */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "herosection" });

  const title = `${t("h1")} | Flying Pictures México`;
  const description = t("paragraph");

  return {
    title,
    description,
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

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

/* =========================
   PAGE
========================= */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const tWeather = await getTranslations({ locale, namespace: "weather" });
  const tWhy = await getTranslations({
    locale,
    namespace: "flightExperiences.whyChoose",
  });

  /* ---------- Live Monitoring (CORREGIDO) ---------- */
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

  /* ---------- Why Fly With Us ---------- */
  const whyFlyData = {
    h2: tWhy("title"),
    paragraph: "",
    cards: [
      {
        title: tWhy("reasons.0.title"),
        paragraph: tWhy("reasons.0.description"),
      },
      {
        title: tWhy("reasons.1.title"),
        paragraph: tWhy("reasons.1.description"),
      },
      {
        title: tWhy("reasons.2.title"),
        paragraph: tWhy("reasons.2.description"),
      },
    ],
  };

  /* ---------- Structured Data ---------- */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Flying Pictures México",
    description:
      "Premier hot air balloon flight experience over Teotihuacán Pyramids.",
    url: SITE_URL,
    telephone: "+525580251057",
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
        <WhyFlightWhitUs translations={whyFlyData} />
        <LiveMonitoringSection translations={liveMonitoringData} />
        <HomeReviewsSection />
      </main>
    </>
  );
}
