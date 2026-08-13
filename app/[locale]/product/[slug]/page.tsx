import { notFound } from "next/navigation";
import { cache } from "react";
import type { Metadata } from "next";

import ProductMain from "./ProductMain";
import Meet from "./Meet";
import ProductFooter from "./Footer";
import Reviews from "./Reviews";
import RecommendedExtras from "./Recommended";
import Included from "./Included";
import PackageDetails from "./PackageDetails";
import ProductItinerary from "./ProductItinerary";

import {
  PRODUCTS,
  ProductSlug,
  ProductTranslation,
} from "@/types/product";
import { cloudinaryOgUrl } from "@/lib/cloudinary";
import { IMAGES } from "@/lib/images";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { getProductName, isProductSlug } from "@/lib/commercial-config";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  const locales = ["en", "es"];

  return locales.flatMap((locale) =>
    PRODUCTS.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export const revalidate = 3600;

function isValidProduct(slug: string): slug is ProductSlug {
  return isProductSlug(slug);
}

const getProductData = cache(
  async (
    locale: string,
    slug: ProductSlug
  ): Promise<ProductTranslation | null> => {
    try {
      const imported = await import(
        `@/locales/${locale}/product/${slug}.json`
      );

      return imported.default as ProductTranslation;
    } catch {
      return null;
    }
  }
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidProduct(slug)) {
    return { robots: { index: false, follow: false } };
  }

  const data = await getProductData(locale, slug);

  if (!data) {
    return { robots: { index: false, follow: false } };
  }

  const title = getProductName(slug, locale);
  const description = data.description.paragraph;
  const url = `${SITE_URL}/${locale}/product/${slug}`;
  const imageId = IMAGES.product.gallery[slug][0];
  const ogImage = cloudinaryOgUrl(imageId);

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE_URL}/es/product/${slug}`,
        en: `${SITE_URL}/en/product/${slug}`,
        "x-default": `${SITE_URL}/en/product/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale,
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isValidProduct(slug)) {
    notFound();
  }

  const data = await getProductData(locale, slug);

  if (!data) {
    notFound();
  }

  return (
    <main className="flex flex-col">
      <ProductMain slug={slug} data={data} />
      <ProductItinerary slug={slug} data={data} />
      {data.details ? (
        <PackageDetails details={data.details} />
      ) : (
        <>
          <Included />
          <RecommendedExtras />
        </>
      )}
      <Reviews />
      <Meet />
      <ProductFooter />
    </main>
  );
}
