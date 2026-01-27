import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ProductHero } from "@/components/product/product-hero";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductItinerary } from "@/components/product/product-itinerary";
import { ProductInclusions } from "@/components/product/product-inclusions";
import { ProductPricing } from "@/components/product/product-pricing";
import { ProductFAQ } from "@/components/product/product-faq";

interface ProductData {
  title: string;
  description: string;
  price: string;
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flyingpicturesmexico.com";

const products: Record<string, ProductData> = {
  "amanecer-privilegiado": {
    title: "Amanecer Privilegiado",
    description: "La experiencia clásica de vuelo en globo aerostático sobre Teotihuacán.",
    price: "$5,500",
  },
  "vuelo-privado-exclusivo": {
    title: "Vuelo Privado Exclusivo",
    description: "Canasta privada para tu grupo. Privacidad y exclusividad.",
    price: "$45,000",
  },
  "amanecer-romantico": {
    title: "Amanecer Romántico",
    description: "La propuesta perfecta. Decoración especial, fotografía y champagne.",
    price: "$18,000",
  },
  "tour-vip-piramedes": {
    title: "Tour VIP Pirámides",
    description: "Vuelo en globo + tour privado por las pirámides + desayuno gourmet.",
    price: "$28,000",
  },
  "vuelo-al-amanecer": {
    title: "Vuelo Amanecer Clásico",
    description: "La aventura auténtica sobre las pirámides.",
    price: "$4,800",
  },
  "experiencia-grupos-corporativos": {
    title: "Experiencia Corporativa",
    description: "Team building con múltiples globos simultáneamente.",
    price: "Desde $80,000",
  },
};

export async function generateStaticParams() {
  const locales = ["es", "en"];
  const slugs = Object.keys(products);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = products[slug] || { title: "Experiencia", description: "" };
  const title = `${product.title} | Flying Pictures México`;

  return {
    title,
    description: product.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/product/${slug}`,
      languages: { es: `${SITE_URL}/es/product/${slug}`, en: `${SITE_URL}/en/product/${slug}` },
    },
    openGraph: { title, description: product.description, type: "website" },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "product" });
  const product = products[slug] || { title: "Experiencia", description: "", price: "$5,500" };

  const images = [
    { src: "/images/products/balloon-1.jpg", alt: product.title },
    { src: "/images/products/balloon-2.jpg", alt: product.title },
    { src: "/images/products/balloon-3.jpg", alt: product.title },
    { src: "/images/products/balloon-4.jpg", alt: product.title },
    { src: "/images/products/balloon-5.jpg", alt: product.title },
    { src: "/images/products/balloon-6.jpg", alt: product.title },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: images.map((img) => `${SITE_URL}${img.src}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      price: product.price.replace(/[^0-9]/g, ""),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main className="min-h-screen bg-white">
        <ProductHero
          title={product.title}
          subtitle={t("hero.experience")}
          duration={`${t("hero.duration")}: 60-90 min`}
          participants={`${t("hero.participants")}: 2-12`}
          minAge={`${t("hero.minAge")}: 6+`}
          rating={4.9}
          reviewCount={2847}
          locale={locale}
        />

        <ProductGallery images={images} viewAllText={t("gallery.viewGallery")} photosText={t("gallery.photos")} />
        <ProductItinerary title={t("itinerary.title")} subtitle={t("itinerary.subtitle")} timeline={t.raw("itinerary.timeline")} />
        <ProductInclusions title={t("inclusions.title")} included={t.raw("inclusions.included")} notIncluded={t.raw("inclusions.notIncluded")} />
        
        <ProductPricing
          title={t("pricing.title")}
          fromText={t("pricing.from")}
          price={product.price}
          perPerson={t("pricing.perPerson")}
          bookNowText={t("pricing.bookNow")}
          whatsappText={t("pricing.whatsapp")}
          locale={locale}
          {...t.raw("pricing")} // Pasa el resto de props del JSON si coinciden
        />

        <ProductFAQ title={t("faq.title")} items={t.raw("faq.items")} />
      </main>
    </>
  );
}