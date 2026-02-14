import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

import { ContactHero } from "@/app/[locale]/contact/contact-hero";
import { ContactInfo } from "@/app/[locale]/contact/contact-info";
import { LocationAndFAQ } from "@/app/[locale]/contact/contact-location";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.hero" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        es: `${SITE_URL}/es/contact`,
        en: `${SITE_URL}/en/contact`,
        "x-default": `${SITE_URL}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactInfo />
      <LocationAndFAQ />
    </main>
  );
}
