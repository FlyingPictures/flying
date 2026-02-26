"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { ProductTranslation } from "@/types/product";
import { IMAGES } from "@/lib/images";
import { usePricing } from "@/components/layout/floating-bar";

const CORNERS = [
  "rounded-tl-(--radius)",
  "rounded-tr-(--radius)",
  "rounded-bl-(--radius)",
  "rounded-br-(--radius)",
];

const ITINERARY_IMAGES = IMAGES.product.gallery.itinerary;

interface ProductMainProps {
  slug: string;
  data: ProductTranslation;
}

export default function ProductMain({ slug, data }: ProductMainProps) {
  const images: string[] = [
    ...(IMAGES.product.gallery[slug as keyof typeof IMAGES.product.gallery] ?? []),
  ];
  const [carouselIndex, setCarouselIndex] = useState<number | null>(null);
  const pricing = usePricing();

  useEffect(() => {
    pricing?.setPricing({
      adults: data.pricing.adults,
      kids: data.pricing.kids,
      priceAdults: data.pricing.priceAdults,
      priceKids: data.pricing.priceKids,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

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
    <section className="w-full px-4 md:px-10 lg:px-20 py-10 mt-25 lg:mt-35 flex flex-col gap-10">

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-10">

        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 grid-rows-2 gap-1">
            {images.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                className={`relative aspect-square overflow-hidden ${CORNERS[i]} cursor-pointer`}
              >
                <Image
                  src={cloudinaryUrl(img, 800)}
                  alt={`Photo ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-12 text-center lg:text-center lg:self-center py-6 lg:py-0">
          <h3>{data.hero.title}</h3>
          <p className="text-sm text-muted-foreground">{data.hero.subtitle}</p>
          <div className="flex flex-col gap-2">
            <h5 className="font-bold text-lg">{data.description.title}</h5>
            <p className="text-sm leading-relaxed">{data.description.paragraph}</p>
          </div>
          <div className="text-md lg:text-xl flex items-center gap-2 justify-center text-muted-foreground">
            <span>★ {data.rating.score}</span>
            <span>{data.rating.reviewsCount}</span>
          </div>
          <div className="w-full h-px bg-border lg:hidden" />
        </div>

      </div>

      <div className="flex flex-col gap-16 lg:w-1/2">
        <h3 className="text-left lg:text-center">{data.itinerary.title}</h3>

        <div className="flex flex-col gap-12">
          {data.itinerary.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-6">
              <div className="shrink-0 w-15 h-15 lg:w-30 lg:h-30 rounded-2xl overflow-hidden relative">
                <Image
                  src={cloudinaryUrl(ITINERARY_IMAGES[i] ?? ITINERARY_IMAGES[0], 400)}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="font-bold leading-snug text-[clamp(10px,2vw,18px)]">{step.title}</h5>
                <span className="leading-relaxed text-[clamp(10px,2vw,18px)]">{step.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen carousel */}
      {carouselIndex !== null && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-bold text-secondary/90 text-xl">
              {carouselIndex + 1} de {images.length}
            </span>
            <button onClick={close} className="text-secondary hover:text-secondary/80 transition-colors">
              <X size={40} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative px-16">
            <button onClick={prev} className="absolute left-4 text-secondary/80 hover:text-secondary/90 transition-colors">
              <ChevronLeft size={40} />
            </button>

            <div className="relative w-full max-w-3xl h-full max-h-[80vh] rounded-(--radius) overflow-hidden">
              <Image
                src={cloudinaryUrl(images[carouselIndex], 1200)}
                alt={`Photo ${carouselIndex + 1}`}
                fill
                className="object-cover rounded-(--radius)"
                priority
              />
            </div>

            <button onClick={next} className="absolute right-4 text-secondary/80 hover:text-secondary/90 transition-colors">
              <ChevronRight size={40} />
            </button>
          </div>

          <div className="h-8" />
        </div>
      )}

    </section>
  );
}