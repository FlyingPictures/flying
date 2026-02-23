import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"

import { FlightHero } from "./flight-hero"
import { FlightCardsSection } from "./flight-card"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.flyingpicturesmexico.com"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "flightExperiences.hero" })

  const title = t("title")
  const description = t("description")
  const url = `${SITE_URL}/${locale}/flight-experiences`

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: { index: true, follow: true },

    alternates: {
      canonical: url,
      languages: {
        es: `${SITE_URL}/es/flight-experiences`,
        en: `${SITE_URL}/en/flight-experiences`,
        "x-default": `${SITE_URL}/en/flight-experiences`,
      },
    },

    openGraph: {
      type: "website",
      locale,
      url,
      siteName: "Flying Pictures México",
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/images/og/flight-experiences-${locale}.jpg`,
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
      images: [`${SITE_URL}/images/og/flight-experiences-${locale}.jpg`],
    },
  }
}

export default function FlightExperiencesPage() {
  return (
    <main className="w-full">
      <FlightHero />
      <FlightCardsSection />
    </main>
  );
}
