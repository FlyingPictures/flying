import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "notFound" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/404`,
      languages: {
        es: `${SITE_URL}/es/404`,
        en: `${SITE_URL}/en/404`,
        "x-default": `${SITE_URL}/en/404`,
      },
    },
  };
}

export default async function NotFoundPage({ params }: Props) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations("notFound");

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <h1 className="font-poppins text-[5rem] md:text-[7rem] lg:text-[8rem] font-bold text-[#03303B] leading-none mb-4 tracking-tight">
        404
      </h1>
      <h2 className="font-poppins text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center">
        {t("title")}
      </h2>
      <p className="font-inter text-muted-foreground text-lg md:text-xl text-center max-w-md mb-10 leading-relaxed">
        {t("description")}
      </p>
      <Link
        href={`/${locale}`}
        className="inline-flex items-center justify-center px-8 py-6 text-lg font-semibold text-white bg-[#03303B] rounded-lg transition-all duration-300 hover:scale-105 hover:bg-[#03303B]/90"
      >
        {t("backHome")}
      </Link>
    </section>
  );
}
