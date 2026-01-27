import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { Locale } from "@/i18n/config"

import { fontVariables } from "@/lib/fonts"
import { Footer } from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import { 
  StructuredData, 
  getOrganizationSchema, 
  getWebSiteSchema 
} from "@/lib/structured-data"
import { cloudinaryUrl } from "@/lib/cloudinary"

const SITE_CONFIG = {
  name: "Flying Pictures México",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com",
  description: {
    es: "Experimenta Teotihuacán desde el cielo con vuelos en globo aerostático. Vive una aventura inolvidable sobre las pirámides.",
    en: "Experience Teotihuacán from the sky with hot air balloon flights. Live an unforgettable adventure over the pyramids.",
  },
  keywords: {
    es: ["globo aerostático", "Teotihuacán", "vuelo", "México", "pirámides"],
    en: ["hot air balloon", "Teotihuacán", "flight", "Mexico", "pyramids"],
  },
  twitter: "@flyingpicturesmx",
  ogImage: cloudinaryUrl("v1769092256/home_hero_y2htjn", 1200),
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const lang = (locale === "es" || locale === "en") ? locale : "en"
  const description = SITE_CONFIG.description[lang]
  const keywords = SITE_CONFIG.keywords[lang]

  return {
    metadataBase: new URL(SITE_CONFIG.url),

    title: {
      default: SITE_CONFIG.name,
      template: `%s | ${SITE_CONFIG.name}`,
    },

    description,
    keywords,

    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,

    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },

    manifest: "/site.webmanifest",

    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
      languages: {
        es: `${SITE_CONFIG.url}/es`,
        en: `${SITE_CONFIG.url}/en`,
        "x-default": `${SITE_CONFIG.url}/en`,
      },
    },

    openGraph: {
      type: "website",
      locale: lang,
      url: `${SITE_CONFIG.url}/${locale}`,
      siteName: SITE_CONFIG.name,
      title: SITE_CONFIG.name,
      description,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.name,
      description,
      images: [SITE_CONFIG.ogImage],
      creator: SITE_CONFIG.twitter,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },

    verification: {
      google: process.env.GOOGLE_VERIFICATION_CODE || "",
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  const messages = await getMessages()
  const tFooter = await getTranslations({
    locale,
    namespace: "footer",
  })

  const footerTranslations = {
    description: tFooter("description"),
    termsConditions: tFooter("termsConditions"),
    privacyPolicy: tFooter("privacyPolicy"),
    cancellations: tFooter("cancellations"),
  }

  const organizationSchema = getOrganizationSchema(locale as Locale)
  const websiteSchema = getWebSiteSchema(locale as Locale)

  return (
    <html 
      lang={locale} 
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
      </head>

      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        
        <GoogleAnalytics />

        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer translations={footerTranslations} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export { SITE_CONFIG }