import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FlightHero } from "@/components/flight-experiences/flight-hero";
import { TrustBadges } from "@/components/flight-experiences/trust-badges";
import { FlightCard } from "@/components/flight-experiences/flight-card";
import { FlightFAQ } from "@/components/flight-experiences/flight-faq";
import { StickyCTA } from "@/components/flight-experiences/sticky-cta";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "flightExperiences" });
  const title = t("pageTitle");
  return {
    title,
    description: t("pageDescription"),
    openGraph: { title, url: `${SITE_URL}/${locale}/flight-experiences`, locale, type: "website" },
    alternates: { canonical: `${SITE_URL}/${locale}/flight-experiences` }
  };
}

export default async function FlightExperiencesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "flightExperiences" });
  
  const experiences = t.raw("experiencesList"); // 👈 Mueve tus textos al JSON de traducciones

  return (
    <main className="min-h-screen bg-white">
      <FlightHero title={t("hero.title")} subtitle={t("hero.subtitle")} description={t("hero.description")} locale={locale} />
      <TrustBadges title={t("trustBadges.title")} badges={t.raw("trustBadges.badges")} />

      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp: any) => <FlightCard key={exp.slug} {...exp} />)}
        </div>
      </section>

      <section className="py-16 bg-[#03303B] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl mb-8 italic">{t("whyChoose.title")}</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {t.raw("whyChoose.reasons").map((r: any, i: number) => (
              <div key={i} className="bg-white/5 p-6 rounded-2xl">
                <h3 className="text-[#F7A533] font-bold">{r.title}</h3>
                <p className="text-white/80">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FlightFAQ title={t("faq.title")} items={t.raw("faq.items")} />
      <StickyCTA title={t("cta.title")} description={t("cta.description")} buttonText={t("cta.button")} locale={locale} />
    </main>
  );
}