import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

import { PlanHero } from "@/app/[locale]/plan-your-visit/plan-hero";
import { PlanSunrise } from "@/app/[locale]/plan-your-visit/plan-sunrise";
import { PlanGettingHere } from "@/app/[locale]/plan-your-visit/plan-getting-here";
import { PlanWeatherPolicy } from "@/app/[locale]/plan-your-visit/plan-weather-policy";
import { PlanFaq } from "@/app/[locale]/plan-your-visit/plan-faq";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.flyingpicturesmexico.com";

type Locale = (typeof routing.locales)[number];

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "nav" });

  const title = t("planYourVisit");
  const description =
    locale === "es"
      ? "Todo lo que necesitas saber antes de tu vuelo en globo aerostático en Teotihuacán."
      : "Everything you need to know before your hot air balloon flight in Teotihuacán.";
  const url = `${SITE_URL}/${locale}/plan-your-visit`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE_URL}/es/plan-your-visit`,
        en: `${SITE_URL}/en/plan-your-visit`,
        "x-default": `${SITE_URL}/en/plan-your-visit`,
      },
    },
    openGraph: {
      type: "website",
      locale,
      url,
      title,
      description,
      siteName: "Flying Pictures México",
      images: [{ url: `${SITE_URL}/images/og/plan-your-visit-${locale}.jpg`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/og/plan-your-visit-${locale}.jpg`],
    },
  };
}

export default function PlanYourVisitPage() {
  return (
    <main className="min-h-screen">
      <PlanHero />
      <PlanSunrise />
      <PlanGettingHere />
      <PlanWeatherPolicy />
      <PlanFaq />
    </main>
  );
}