import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

const products: Record<string, { title: string; description: string; price: string }> = {
  "amanecer-privilegiado": {
    title: "Amanecer Privilegiado",
    description: "La experiencia clásica de vuelo en globo aerostático sobre Teotihuacán. Vuela en canasta compartida y disfruta del amanecer más espectacular de México.",
    price: "$5,500",
  },
  "vuelo-privado-exclusivo": {
    title: "Vuelo Privado Exclusivo",
    description: "Canasta privada para tu grupo. Experimenta Teotihuacán desde el cielo con máxima privacidad y exclusividad para tu familia o amigos.",
    price: "$45,000",
  },
  "amanecer-romantico": {
    title: "Amanecer Romántico",
    description: "La propuesta perfecta. Un momento mágico con decoración especial, fotografía profesional y champagne para celebrar tu amor.",
    price: "$18,000",
  },
  "tour-vip-piramedes": {
    title: "Tour VIP Pirámides",
    description: "Experiencia completa: vuelo en globo + tour privado por las pirámides + desayuno gourmet. Vive Teotihuacán como nunca antes.",
    price: "$28,000",
  },
  "vuelo-al-amanecer": {
    title: "Vuelo Amanecer Clásico",
    description: "La aventura auténtica. Despierta antes del amanecer y experimenta el espectáculo de colores sobre las pirámides.",
    price: "$4,800",
  },
  "experiencia-grupos-corporativos": {
    title: "Experiencia Corporativa",
    description: "Team building activity único. Organiza una experiencia memorable para tu empresa con múltiples globos simultáneamente.",
    price: "Desde $80,000",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = products[slug] || { title: "Experiencia de Vuelo", description: "", price: "" };
  const t = await getTranslations({ locale, namespace: "product" });

  const title = `${product.title} | Flying Pictures México`;
  const description = product.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/product/${slug}`,
      siteName: "Flying Pictures México",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/product/${slug}`,
      languages: {
        es: `${SITE_URL}/es/product/${slug}`,
        en: `${SITE_URL}/en/product/${slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "product" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const product = products[slug] || {
    title: "Experiencia de Vuelo",
    description: "",
    price: "$5,500",
  };

  const images = [
    { src: "/images/products/balloon-1.jpg", alt: `${product.title} - Vuelo en globo` },
    { src: "/images/products/balloon-2.jpg", alt: `${product.title} - Amanecer` },
    { src: "/images/products/balloon-3.jpg", alt: `${product.title} - Pirámides` },
    { src: "/images/products/balloon-4.jpg", alt: `${product.title} - Canasta` },
    { src: "/images/products/balloon-5.jpg", alt: `${product.title} - Aterrizaje` },
    { src: "/images/products/balloon-6.jpg", alt: `${product.title} - Desayuno` },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: images.map((img) => `${SITE_URL}${img.src}`),
    brand: {
      "@type": "Brand",
      name: "Flying Pictures México",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      price: product.price.replace(/[^0-9]/g, ""),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Flying Pictures México",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2847",
    },
  };

  const { ProductHero } = await import("@/components/product/product-hero");
  const { ProductGallery } = await import("@/components/product/product-gallery");
  const { ProductItinerary } = await import("@/components/product/product-itinerary");
  const { ProductInclusions } = await import("@/components/product/product-inclusions");
  const { ProductPricing } = await import("@/components/product/product-pricing");
  const { ProductFAQ } = await import("@/components/product/product-faq");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-white">
        <ProductHero
          title={product.title}
          subtitle={t("hero.experience")}
          duration={t("hero.duration") + ": 60-90 min"}
          participants={t("hero.participants") + ": 2-12"}
          minAge={t("hero.minAge") + ": 6+"}
          rating={4.9}
          reviewCount={2847}
          locale={locale}
        />

        <ProductGallery
          images={images}
          viewAllText={t("gallery.viewGallery")}
          photosText={t("gallery.photos")}
        />

        <ProductItinerary
          title={t("itinerary.title")}
          subtitle={t("itinerary.subtitle")}
          timeline={t.raw("itinerary.timeline")}
        />

        <ProductInclusions
          title={t("inclusions.title")}
          included={t.raw("inclusions.included")}
          notIncluded={t.raw("inclusions.notIncluded")}
        />

        <ProductPricing
          title={t("pricing.title")}
          fromText={t("pricing.from")}
          price={product.price}
          perPerson={t("pricing.perPerson")}
          selectDateText={t("pricing.selectDate")}
          availabilityText={t("pricing.availability")}
          availableText={t("pricing.available")}
          limitedText={t("pricing.limited")}
          soldOutText={t("pricing.soldOut")}
          bookNowText={t("pricing.bookNow")}
          whatsappText={t("pricing.whatsapp")}
          guarantee={t.raw("pricing.guarantee")}
          locale={locale}
        />

        <ProductFAQ
          title={t("faq.title")}
          items={t.raw("faq.items")}
        />
      </main>
    </>
  );
}
