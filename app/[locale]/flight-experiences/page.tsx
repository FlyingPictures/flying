import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "flightExperiences" });

  const title = t("pageTitle");
  const description = t("pageDescription");

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/flight-experiences`,
      siteName: "Flying Pictures México",
      images: [
        {
          url: `${SITE_URL}/images/og/flight-experiences-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/og/flight-experiences-${locale}.jpg`],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/flight-experiences`,
      languages: {
        es: `${SITE_URL}/es/flight-experiences`,
        en: `${SITE_URL}/en/flight-experiences`,
      },
    },
  };

  return metadata;
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function FlightExperiencesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "flightExperiences" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const experiences = [
    {
      slug: "amanecer-privilegiado",
      title: "Amanecer Privilegiado",
      subtitle: "Vuelo Compartido",
      description: "La experiencia clásica. Vuela en una canasta compartida con hasta 11 pasajeros. Disfruta del amanecer sobre las pirámides en compañía de otros aventureros.",
      idealFor: "Viajeros solos, amigos y parejas",
      price: "$5,500",
      duration: "60-90 min",
      includes: ["Vuelo 60 min", "Desayuno buffet", "Transporte", "Certificado"],
      rating: 4.9,
      reviewCount: 2847,
      imageGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      variant: "featured" as const,
    },
    {
      slug: "vuelo-privado-exclusivo",
      title: "Vuelo Privado Exclusivo",
      subtitle: "Vuelo Privado",
      description: "Canasta privada para tu grupo. Elige a quién llevar y vive la experiencia íntima sobre Teotihuacán. Perfecto para familias y grupos de amigos.",
      idealFor: "Familias y grupos (2-12)",
      price: "$45,000",
      duration: "75-90 min",
      includes: ["Canasta privada", "Champagne", "Desayuno premium", "Transporte VIP"],
      rating: 5.0,
      reviewCount: 523,
      imageGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      slug: "amanecer-romantico",
      title: "Amanecer Romántico",
      subtitle: "Propuestas",
      description: "La propuesta perfecta. Crea un momento mágico con decoración especial, fotografía profesional y champagne para celebrar.",
      idealFor: "Parejas y propuestas",
      price: "$18,000",
      duration: "60-75 min",
      includes: ["Decoración romántica", "Fotógrafo", "Champagne", "Ramo de rosas"],
      rating: 5.0,
      reviewCount: 312,
      imageGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      slug: "tour-vip-piramedes",
      title: "Tour VIP Pirámides",
      subtitle: "VIP & Tours",
      description: "Experiencia completa: vuelo en globo + tour privado por las pirámides + breakfast gourmet. Vive Teotihuacán como nunca antes.",
      idealFor: "Viajeros exigentes",
      price: "$28,000",
      duration: "4-5 horas",
      includes: ["Vuelo privado", "Tour pirámides", "Desayuno gourmet", "Guía especializado"],
      rating: 4.9,
      reviewCount: 156,
      imageGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      slug: "vuelo-al-amanecer",
      title: "Vuelo Amanecer Clásico",
      subtitle: "Vuelo Compartido",
      description: "La aventura auténtica. Despierta antes del amanecer y experimenta el espectáculo de colores mientras Teotihuacán despierta bajo ti.",
      idealFor: "Aventureros",
      price: "$4,800",
      duration: "60 min",
      includes: ["Vuelo 60 min", "Desayuno", "Transporte básico"],
      rating: 4.8,
      reviewCount: 1523,
      imageGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      slug: "experiencia-grupos-corporativos",
      title: "Experiencia Corporativa",
      subtitle: "Grupos",
      description: "Team building activity. Organiza una experiencia única para tu empresa o grupo grande. Múltiples globos simultáneamente para crear recuerdos memorables.",
      idealFor: "Empresas y grupos (20+)",
      price: "Desde $80,000",
      duration: "3-4 horas",
      includes: ["Múltiples globos", "Coordinador", "Desayuno grupal", "Actividades"],
      rating: 4.7,
      reviewCount: 89,
      imageGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: t("pageTitle"),
    description: t("pageDescription"),
    url: `${SITE_URL}/${locale}/flight-experiences`,
    mainEntity: {
      "@type": "Service",
      name: "Hot Air Balloon Flights Teotihuacán",
      description: t("pageDescription"),
      provider: {
        "@type": "Organization",
        name: "Flying Pictures México",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        telephone: "+525580251057",
        email: "fly@flyingpictures.mx",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Carretera a las Pirámides",
          addressLocality: "Teotihuacán",
          addressRegion: "Edo. Mex.",
          addressCountry: "MX",
        },
      },
      areaServed: {
        "@type": "Place",
        name: "Teotihuacán, México",
      },
      serviceType: "Tourist Activity",
      category: "Hot Air Balloon Rides",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "4800",
        highPrice: "80000",
        priceCurrency: "MXN",
        availability: "https://schema.org/InStock",
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: tNav("experiencesTitle"),
          item: `${SITE_URL}/${locale}/flight-experiences`,
        },
      ],
    },
  };

  const { FlightHero } = await import("@/components/flight-experiences/flight-hero");
  const { TrustBadges } = await import("@/components/flight-experiences/trust-badges");
  const { FlightCard } = await import("@/components/flight-experiences/flight-card");
  const { FlightFAQ } = await import("@/components/flight-experiences/flight-faq");
  const { StickyCTA } = await import("@/components/flight-experiences/sticky-cta");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-white">
        <FlightHero
          title={t("hero.title")}
          subtitle={t("hero.subtitle")}
          description={t("hero.description")}
          locale={locale}
        />

        <TrustBadges
          title={t("trustBadges.title")}
          badges={t.raw("trustBadges.badges")}
        />

        <section id="experiences" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <span className="font-inter text-sm font-semibold text-[#F7A533] uppercase tracking-[0.15em]">
                {t("filterTitle")}
              </span>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {experiences.map((experience) => (
                <FlightCard
                  key={experience.slug}
                  {...experience}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#03303B]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-libre-baskerville italic text-3xl md:text-4xl text-white mb-8">
                {t("whyChoose.title")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {t.raw("whyChoose.reasons").map((reason: { title: string; description: string }, index: number) => (
                  <div key={index} className="bg-white/5 rounded-2xl p-6">
                    <h3 className="font-poppins font-semibold text-xl text-[#F7A533] mb-2">
                      {reason.title}
                    </h3>
                    <p className="font-inter text-white/80">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FlightFAQ
          title={t("faq.title")}
          items={t.raw("faq.items")}
        />

        <section id="booking" className="py-16 md:py-24 bg-gradient-to-b from-[#03303B] to-[#022a33]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-libre-baskerville italic text-3xl md:text-5xl text-white mb-4">
              {t("cta.title")}
            </h2>

            <p className="font-inter text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/525580251057"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F7A533] text-[#03303B] font-inter font-bold rounded-full hover:bg-[#F7A533]/90 transition-colors"
              >
                {t("cta.button")}
              </a>

              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 text-white font-inter font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                {t("cta.whatsapp")}
              </a>
            </div>
          </div>
        </section>

        <StickyCTA
          title={t("cta.title")}
          description={t("cta.description")}
          buttonText={t("cta.button")}
          locale={locale}
        />
      </main>
    </>
  );
}
