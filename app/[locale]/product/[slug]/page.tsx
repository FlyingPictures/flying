import { notFound } from "next/navigation";
import { cache } from "react";

import ProductMain from "./ProductMain";
import ProductFooter from "./Footer";

import {
  PRODUCTS,
  ProductSlug,
  ProductTranslation,
} from "@/types/product";

/* ===============================
   TYPES (Next 16)
================================= */
interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

/* ===============================
   STATIC PARAMS
================================= */
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

/* ===============================
   TYPE GUARD
================================= */
function isValidProduct(slug: string): slug is ProductSlug {
  return PRODUCTS.includes(slug as ProductSlug);
}

/* ===============================
   DATA LOADER (cached)
================================= */
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

/* ===============================
   PAGE
================================= */
export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;

  // 1️⃣ Validar slug
  if (!isValidProduct(slug)) {
    notFound();
  }

  // 2️⃣ Obtener data
  const data = await getProductData(locale, slug);

  // 3️⃣ Validar data
  if (!data) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-24">
      <ProductMain slug={slug} data={data} />
      
      <ProductFooter />
    </main>
  );
}