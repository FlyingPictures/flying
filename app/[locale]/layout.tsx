import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

import { fontVariables } from "@/lib/fonts";
import { Footer } from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { FloatingBar } from "@/components/layout/floating-bar";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import {
  StructuredData,
  getOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/structured-data";
import { cloudinaryUrl } from "@/lib/cloudinary";

const SITE_CONFIG = {
  name: "Flying Pictures México",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.flyingpicturesmexico.com",
  description: {
    es: "Experimenta Teotihuacán desde el cielo con vuelos en globo aerostático.",
    en: "Experience Teotihuacán from the sky with hot air balloon flights.",
  },
  keywords: {
    es: ["globo aerostático", "Teotihuacán"],
    en: ["hot air balloon", "Teotihuacán"],
  },
  twitter: "@flyingpicturesmx",
  ogImage: cloudinaryUrl("v1769092256/home_hero_y2htjn", 1200),
};

type Locale = (typeof routing.locales)[number];

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: SITE_CONFIG.name,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description[l],
    keywords: SITE_CONFIG.keywords[l],
    openGraph: {
      title: SITE_CONFIG.name,
      description: SITE_CONFIG.description[l],
      url: `/${locale}`,
      siteName: SITE_CONFIG.name,
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.name,
      description: SITE_CONFIG.description[l],
      images: [SITE_CONFIG.ogImage],
      creator: SITE_CONFIG.twitter,
    },
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`])
      ),
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const l = locale as Locale;

  const messages = await getMessages({ locale });

  const tFooter = await getTranslations({ locale, namespace: "footer" });

  const footerTranslations = {
    description: tFooter("description"),
    termsConditions: tFooter("termsConditions"),
    privacyPolicy: tFooter("privacyPolicy"),
    cancellations: tFooter("cancellations"),
  };

  const organizationSchema = getOrganizationSchema(l);
  const websiteSchema = getWebSiteSchema(l);

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <GoogleAnalytics />

      <NextIntlClientProvider messages={messages} locale={locale}>
        <div className={`${fontVariables} flex min-h-screen flex-col bg-background text-foreground antialiased`}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer translations={footerTranslations} />
          <FloatingBar />
        </div>
      </NextIntlClientProvider>
    </>
  );
}

export { SITE_CONFIG };