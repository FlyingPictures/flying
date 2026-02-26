import { notFound } from "next/navigation";
import { cache } from "react";

import ProductMain from "./ProductMain";
import Meet from "./Meet";
import ProductFooter from "./Footer";
import Reviews from "./Reviews";
import RecommendedExtras from "./Recommended";
import Included from "./Included";

import {
  PRODUCTS,
  ProductSlug,
  ProductTranslation,
} from "@/types/product";

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
  return PRODUCTS.includes(slug as ProductSlug);
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
    <main className="flex flex-col gap-12">
      <ProductMain slug={slug} data={data} />
      <Included />
      <RecommendedExtras />
      <Reviews />
      <Meet />
      <ProductFooter />
    </main>
  );
}