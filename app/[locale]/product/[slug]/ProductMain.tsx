"use client";

import { useState, useCallback, useEffect } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { ProductTranslation } from "@/types/product";
import { IMAGES } from "@/lib/images";
import { usePricing } from "@/components/layout/floating-bar";
import { Button } from "@/components/ui/button";
import { SITE_CONTACT } from "@/lib/site-config";
import {
  BOOKING_URLS,
  PRODUCT_PRICING,
  formatMxn,
  getProductName,
  type ProductSlug,
} from "@/lib/commercial-config";

const CORNERS = [
  "rounded-tl-(--radius)",
  "rounded-tr-(--radius)",
  "rounded-bl-(--radius)",
  "rounded-br-(--radius)",
];

interface ProductMainProps {
  slug: ProductSlug;
  data: ProductTranslation;
}

export default function ProductMain({ slug, data }: ProductMainProps) {
  const images: string[] = [
    ...(IMAGES.product.gallery[slug as keyof typeof IMAGES.product.gallery] ?? []),
  ];
  const [carouselIndex, setCarouselIndex] = useState<number | null>(null);
  const locale = useLocale();
  const pricing = usePricing();
  const setPricing = pricing?.setPricing;
  const productPricing = PRODUCT_PRICING[slug];
  const reservationUrl = BOOKING_URLS[slug] ?? SITE_CONTACT.whatsapp;

  useEffect(() => {
    setPricing?.({
      adults: data.pricing.adults,
      kids: data.pricing.kids,
      priceAdults: productPricing ? formatMxn(productPricing.primary) : "",
      priceKids: productPricing?.secondary
        ? formatMxn(productPricing.secondary)
        : "",
      dates: data.pricing.dates,
    });
  }, [data.pricing, productPricing, setPricing]);

  const prev = useCallback(
    () => setCarouselIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setCarouselIndex((i) => (i === null ? 0 : (i + 1) % images.length)),
    [images.length]
  );
  const close = useCallback(() => setCarouselIndex(null), []);

  useEffect(() => {
    if (carouselIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [carouselIndex, prev, next, close]);

  return (
    <section className="mt-25 flex w-full flex-col gap-10 px-4 pb-0 pt-10 md:px-10 lg:mt-35 lg:px-20">

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-10">

        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 grid-rows-2 gap-1">
            {images.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                aria-label={`${locale === "es" ? "Abrir foto" : "Open photo"} ${i + 1}`}
                className={`relative aspect-square overflow-hidden ${CORNERS[i]} cursor-pointer`}
              >
                <Image
                  src={cloudinaryUrl(img)}   // ← sin parámetros
                  alt={`${locale === "es" ? "Foto" : "Photo"} ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  unoptimized={true}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-12 text-center lg:text-center lg:self-center py-6 lg:py-0">
          <h1 className="product-title">{getProductName(slug, locale)}</h1>
          <p className="text-sm text-muted-foreground">{data.hero.subtitle}</p>
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-(--radius) border border-border bg-card/50 p-4 sm:flex-row sm:justify-between">
            {productPricing && (
              <div className="flex flex-col text-left text-sm lg:text-base">
                <span>
                  <strong>{data.pricing.adults}</strong>{" "}
                  {formatMxn(productPricing.primary)}
                </span>
                {productPricing.secondary && (
                  <span>
                    <strong>{data.pricing.kids}</strong>{" "}
                    {formatMxn(productPricing.secondary)}
                  </span>
                )}
              </div>
            )}
            <Button variant="primary" size="sm" className="shrink-0" asChild>
              <a href={reservationUrl} target="_blank" rel="noopener noreferrer">
                {data.pricing.dates}
              </a>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-bold text-lg">{data.description.title}</h5>
            <p className="product-body">{data.description.paragraph}</p>
          </div>
          <div className="text-md lg:text-xl flex items-center gap-2 justify-center text-muted-foreground">
            <span>★ {data.rating.score}</span>
            <span>{data.rating.reviewsCount}</span>
          </div>
        </div>

      </div>

      {carouselIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={locale === "es" ? "Galería de fotos" : "Photo gallery"}
          className="fixed inset-0 z-60 bg-background flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-bold text-secondary/90 text-xl">
              {carouselIndex + 1} {locale === "es" ? "de" : "of"} {images.length}
            </span>
            <button
              onClick={close}
              aria-label={locale === "es" ? "Cerrar galería" : "Close gallery"}
              className="text-secondary hover:text-secondary/80 transition-colors"
            >
              <X size={40} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative px-4 lg:px-16">
            <button
              onClick={prev}
              aria-label={locale === "es" ? "Foto anterior" : "Previous photo"}
              className="hidden lg:block absolute left-4 text-secondary/80 hover:text-secondary/90 transition-colors"
            >
              <ChevronLeft size={40} />
            </button>

            <div
              className="relative w-full max-w-3xl h-full max-h-[80vh] rounded-(--radius) overflow-hidden mx-4 lg:mx-auto"
              onTouchStart={(e) => e.currentTarget.dataset.touchX = String(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const startX = Number(e.currentTarget.dataset.touchX)
                const diff = startX - e.changedTouches[0].clientX
                if (Math.abs(diff) > 50) {
                  if (diff > 0) next()
                  else prev()
                }
              }}
            >
              <Image
                src={cloudinaryUrl(images[carouselIndex])} // ← sin parámetros
                alt={`${locale === "es" ? "Foto" : "Photo"} ${carouselIndex + 1}`}
                fill
                className="object-cover rounded-(--radius)"
                priority
                unoptimized={true}   // ← añadido
              />
            </div>

            <button
              onClick={next}
              aria-label={locale === "es" ? "Foto siguiente" : "Next photo"}
              className="hidden lg:block absolute right-4 text-secondary/80 hover:text-secondary/90 transition-colors"
            >
              <ChevronRight size={40} />
            </button>
          </div>

          <div className="h-8" />
        </div>
      )}

    </section>
  );
}
