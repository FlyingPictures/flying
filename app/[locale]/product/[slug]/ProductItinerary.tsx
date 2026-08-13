"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

import { cloudinaryUrl } from "@/lib/cloudinary";
import { IMAGES } from "@/lib/images";
import type { ProductTranslation } from "@/types/product";
import type { ProductSlug } from "@/lib/commercial-config";

const SUMMARY_STEP_COUNT = 5;
const FALLBACK_IMAGES = IMAGES.product.gallery.itinerary;

type Props = {
  slug: ProductSlug;
  data: ProductTranslation;
};

function getSummaryIndexes(length: number) {
  if (length <= SUMMARY_STEP_COUNT) {
    return Array.from({ length }, (_, index) => index);
  }

  return Array.from({ length: SUMMARY_STEP_COUNT }, (_, index) =>
    Math.round((index * (length - 1)) / (SUMMARY_STEP_COUNT - 1))
  );
}

export default function ProductItinerary({ slug, data }: Props) {
  const t = useTranslations("product.itineraryControls");
  const [isExpanded, setIsExpanded] = useState(false);
  const [progressHeight, setProgressHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itinerary = data.details?.itinerary ?? data.itinerary;
  const productImages = [
    ...(IMAGES.product.gallery[slug as keyof typeof IMAGES.product.gallery] ?? []),
  ];
  const images = productImages.length > 0 ? productImages : FALLBACK_IMAGES;
  const summaryIndexes = useMemo(
    () => getSummaryIndexes(itinerary.steps.length),
    [itinerary.steps.length]
  );
  const visibleSteps = isExpanded
    ? itinerary.steps.map((step, index) => ({ step, index }))
    : summaryIndexes.map((index) => ({ step: itinerary.steps[index], index }));
  const canExpand = itinerary.steps.length > SUMMARY_STEP_COUNT;

  useEffect(() => {
    let animationFrame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;

        const rect = timeline.getBoundingClientRect();
        const imageRadius = window.innerWidth >= 768 ? 32 : 24;
        const lineLength = Math.max(rect.height - imageRadius * 2, 0);
        const start = rect.top + imageRadius;
        const end = rect.bottom - imageRadius;
        const trigger = window.innerHeight * 0.55;
        const progress = Math.min(
          Math.max((trigger - start) / Math.max(end - start, 1), 0),
          1
        );

        setProgressHeight(Math.round(lineLength * progress));
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [isExpanded, visibleSteps.length]);

  return (
    <section className="w-full px-4 pb-10 pt-4 md:px-10 lg:px-20 lg:pb-14 lg:pt-6">
      <div className="mx-auto w-full max-w-270 border-t border-border pt-8 lg:pt-10">
        <header className="max-w-180 lg:mx-auto lg:text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
            {t("eyebrow")}
          </p>
          <h3 className="mt-2">{itinerary.title}</h3>
        </header>

        <div
          id={`itinerary-${slug}`}
          ref={timelineRef}
          className="relative mx-auto mt-8 grid w-full max-w-200 gap-y-8 lg:mt-10 lg:gap-y-10"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-0.5 -translate-x-1/2 rounded-full bg-secondary/15 md:bottom-8 md:left-8 md:top-8"
          />
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 w-0.5 -translate-x-1/2 rounded-full bg-primary md:left-8 md:top-8"
            style={{ height: progressHeight }}
          />
          {visibleSteps.map(({ step, index }) => (
            <article
              key={`${step.title}-${index}`}
              className="relative z-10 grid grid-cols-[3rem_1fr] items-start gap-4 md:grid-cols-[4rem_1fr] md:gap-5"
            >
              <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-background ring-4 ring-background md:size-16">
                <Image
                  src={cloudinaryUrl(images[index % images.length] ?? FALLBACK_IMAGES[0])}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                {step.time && (
                  <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-primary-foreground/70">
                    {step.time}
                  </p>
                )}
                <h4 className="mt-1 text-base font-bold normal-case leading-snug text-secondary md:text-lg">
                  {step.title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-secondary/75 md:text-[0.9375rem]">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {canExpand && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={`itinerary-${slug}`}
              onClick={() => setIsExpanded((current) => !current)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-secondary px-5 py-2.5 text-sm font-bold text-secondary transition-colors hover:bg-secondary hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              {isExpanded
                ? t("showSummary")
                : `${t("showAll")} (${itinerary.steps.length} ${t("steps")})`}
              {isExpanded ? (
                <ChevronUp className="size-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
