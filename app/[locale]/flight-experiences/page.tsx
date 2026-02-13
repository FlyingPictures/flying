import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { FlightHero } from "./flight-hero";
import { FlightCardsSection } from "./flight-card";

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
   STATIC LOCALES
========================= */

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

/* =========================
   METADATA
========================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "flightExperiences.hero",
  });

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,

    metadataBase: new URL(SITE_URL),

    alternates: {
      canonical: `${SITE_URL}/${locale}/flight-experiences`,
      languages: {
        es: `${SITE_URL}/es/flight-experiences`,
        en: `${SITE_URL}/en/flight-experiences`,
      },
    },

    openGraph: {
      type: "website",
      locale,
      url: `${SITE_URL}/${locale}/flight-experiences`,
      siteName: "Flying Pictures México",
      title,
      description,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =========================
   PAGE
========================= */

export default async function FlightExperiencesPage() {
  return (
    <main className="w-full">
      <FlightHero />
      <FlightCardsSection />
    </main>
  );
}
