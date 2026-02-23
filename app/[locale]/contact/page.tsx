import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

import { ContactHero } from "@/app/[locale]/contact/contact-hero";
import { ContactInfo } from "@/app/[locale]/contact/contact-info";
import { LocationAndFAQ } from "@/app/[locale]/contact/contact-location";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.flyingpicturesmexico.com";

type Locale = (typeof routing.locales)[number];

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = params;

  const t = await getTranslations({
    locale,
    namespace: "contact.hero",
  });

  const title = t("title");
  const description = t("subtitle");
  const url = `${SITE_URL}/${locale}/contact`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE_URL}/es/contact`,
        en: `${SITE_URL}/en/contact`,
        "x-default": `${SITE_URL}/en/contact`,
      },
    },
    openGraph: {
      type: "website",
      locale,
      url,
      title,
      description,
      siteName: "Flying Pictures Mexico",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactInfo />
      <LocationAndFAQ />
    </main>
  );
}