import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

import { ContactHero } from "@/components/contact/contact-hero";
import { ContactToggle } from "@/components/contact/contact-toggle";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactLocation } from "@/components/contact/contact-location";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactCTA } from "@/components/contact/contact-cta";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("heroTitle"),
    description: t("heroDescription"),
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
      <ContactToggle />
      <ContactInfo />
      <ContactLocation />
      <FAQSection />
      <ContactCTA />
    </main>
  );
}
