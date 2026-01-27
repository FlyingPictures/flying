import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

import { PlanHero } from "@/components/plan-your-visit/plan-hero";
import { PlanSunrise } from "@/components/plan-your-visit/plan-sunrise";
import { PlanGettingHere } from "@/components/plan-your-visit/plan-getting-here";
import { PlanWeatherPolicy } from "@/components/plan-your-visit/plan-weather-policy";
import { PlanEssentialPrep } from "@/components/plan-your-visit/plan-essential-prep";
import { PlanFAQ } from "@/components/plan-your-visit/plan-faq";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });

  return {
    title: t("planYourVisit"),
    description: "Everything you need to know before your hot air balloon flight in Teotihuacán",
    alternates: {
      canonical: `${SITE_URL}/${locale}/plan-your-visit`,
      languages: {
        es: `${SITE_URL}/es/plan-your-visit`,
        en: `${SITE_URL}/en/plan-your-visit`,
        "x-default": `${SITE_URL}/en/plan-your-visit`,
      },
    },
  };
}

export default async function PlanYourVisitPage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <PlanHero />
      <PlanSunrise />
      <PlanGettingHere />
      <PlanWeatherPolicy />
      <PlanEssentialPrep />
      <PlanFAQ />
    </main>
  );
}
