import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"

import { ContactHero } from "@/app/[locale]/contact/contact-hero"
import { ContactInfo } from "@/app/[locale]/contact/contact-info"
import { LocationAndFAQ } from "@/app/[locale]/contact/contact-location"

type Props = {
  params: Promise<{ locale: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact.hero" })

  const title = t("title")
  const description = t("subtitle")
  const url = `${SITE_URL}/${locale}/contact`

  return {
    metadataBase: new URL(SITE_URL),
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
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactInfo />
      <LocationAndFAQ />
    </main>
  )
}
