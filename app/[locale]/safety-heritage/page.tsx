import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SafetyHero } from "./safety-hero";
import { SafetyLegacy } from "./safety-legacy";
import { SafetyFinest } from "./safety-finest-aircraft";
import { SafetyMeetGiants } from "./safety-meet-giants";
import { SafetyMastery } from "./safety-mastery";
import { SafetySafety } from "./safety-safety";
import { SafetyTale } from "./safety-tale";
import { SafetyFooter } from "./safety-footer";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.flyingpicturesmexico.com";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });

  const title = t("safetyHeritage");
  const description =
    locale === "es"
      ? "Nuestra historia, certificaciones y compromiso con la seguridad."
      : "Our history, certifications and commitment to safety.";

  const url = `${SITE_URL}/${locale}/safety-heritage`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE_URL}/es/safety-heritage`,
        en: `${SITE_URL}/en/safety-heritage`,
        "x-default": `${SITE_URL}/en/safety-heritage`,
      },
    },
    openGraph: {
      type: "website",
      locale,
      url,
      title,
      description,
      siteName: "Flying Pictures México",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function SafetyHeritagePage() {
  return (
    <main className="w-full">
      <SafetyHero />
      <SafetyLegacy />
      <SafetyFinest />
      <SafetyMeetGiants />
      <SafetyMastery />
      <SafetySafety />
      <SafetyTale />
      <SafetyFooter />
    </main>
  );
}