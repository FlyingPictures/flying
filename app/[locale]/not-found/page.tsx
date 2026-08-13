import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site-config";
import { NotFoundContent } from "@/components/not-found-content";

type Locale = (typeof routing.locales)[number];

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "notFound",
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/404`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function NotFoundPage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "notFound",
  });

  return <NotFoundContent title={t("title")} description={t("description")} backHome={t("backHome")} homeHref={`/${locale}`} />;
}
