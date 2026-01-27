import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });

  return {
    title: t("safetyHeritage"),
    description: "Nuestra historia, certificaciones y compromiso con la seguridad",
  };
}

export default async function SafetyHeritagePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-12">
        <h1 className="font-poppins text-4xl md:text-5xl font-bold text-foreground mb-4">
          {t("safetyHeritage")}
        </h1>
        <p className="font-inter text-muted-foreground text-lg">
          Compromiso con la seguridad y tradición desde 1992
        </p>
      </header>

      <div className="prose prose-lg max-w-none font-inter">
        <p className="text-muted-foreground">
          Contenido en desarrollo...
        </p>
      </div>
    </article>
  );
}
