"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { IMAGES } from "@/lib/images";
import {
  TRIPADVISOR_PROFILE_URL,
  TRIPADVISOR_RATING,
  TRIPADVISOR_REVIEW_COUNT,
  VIATOR_REVIEWS_URL,
  TRAVELER_REVIEWS,
  type TravelerReview,
} from "@/lib/tripadvisor-reviews";
import { cn } from "@/lib/utils";

type Props = {
  variant: "home" | "product";
};

export function TripadvisorReviewsCarousel({ variant }: Props) {
  const locale = useLocale();
  const t = useTranslations("reviews");
  const trackRef = useRef<HTMLDivElement>(null);
  const isHome = variant === "home";

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * Math.max(300, track.clientWidth * 0.82),
      behavior: "smooth",
    });
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        isHome
          ? "px-4 py-24 md:px-10 lg:px-20 lg:py-32"
          : "px-4 py-12 md:px-10 lg:px-20 lg:py-20",
      )}
      aria-labelledby={`tripadvisor-reviews-${variant}`}
    >
      {isHome && (
        <div className="absolute inset-0">
          <CloudinaryImage
            publicId={IMAGES.home.reviews.background}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/78 backdrop-blur-[2px]" />
        </div>
      )}

      <div className="relative mx-auto max-w-360">
        {!isHome && <div className="mb-12 h-px w-full bg-border" />}

        <header className="flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary/55">
              {t(isHome ? "homeReadRealReviews" : "readRealReviews")}
            </p>
            <h3
              id={`tripadvisor-reviews-${variant}`}
              className={cn(
                "w-full text-center text-secondary",
                isHome && "font-poppins font-semibold",
              )}
            >
              {t(isHome ? "homeTitle" : "dontJustTakeOurWord")}
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-secondary/70">
              {t(isHome ? "homeSubtitle" : "Subtittle")}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a href={TRIPADVISOR_PROFILE_URL} target="_blank" rel="noopener noreferrer nofollow" className="flex min-h-12 flex-wrap items-center justify-center gap-3 rounded-xl bg-background px-4 py-2 shadow-sm hover:shadow-md">
              <PlatformLogo platform="Tripadvisor" />
              <span className="text-sm text-secondary">{TRIPADVISOR_RATING} / 5 · {t("totalReviews", { count: TRIPADVISOR_REVIEW_COUNT })}</span>
            </a>
            <a href={VIATOR_REVIEWS_URL} target="_blank" rel="noopener noreferrer nofollow" className="flex min-h-12 items-center gap-2 rounded-xl bg-background px-4 py-2 shadow-sm hover:shadow-md">
              <PlatformLogo platform="Viator" />
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className="mt-10 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-secondary/55">
            {t("lastVerified")}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => move(-1)}
              aria-label={t("previous")}
            >
              <ArrowLeft size={19} />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => move(1)}
              aria-label={t("next")}
            >
              <ArrowRight size={19} />
            </Button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 2.5rem, black calc(100% - 2.5rem), transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, black 2.5rem, black calc(100% - 2.5rem), transparent 100%)",
          }}
        >
          {TRAVELER_REVIEWS.map((review) => (
            <ReviewCard key={review.url} review={review} locale={locale} />
          ))}
        </div>

        <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {(["Tripadvisor", "Viator"] as const).map((platform) => (
            <a key={platform} href={platform === "Tripadvisor" ? TRIPADVISOR_PROFILE_URL : VIATOR_REVIEWS_URL}
              target="_blank" rel="noopener noreferrer nofollow" className="text-card-link inline-flex items-center gap-1.5 text-secondary">
              {t("readMoreReviews", { platform })} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformLogo({ platform }: { platform: TravelerReview["platform"] }) {
  const viator = platform === "Viator";
  return (
    <Image src={viator ? "/reviews/viator.svg" : "/reviews/tripadvisor.svg"} alt={platform}
      width={viator ? 80 : 130} height={20} unoptimized className="h-5 w-auto" />
  );
}

function ReviewCard({ review, locale }: { review: TravelerReview; locale: string }) {
  const t = useTranslations("reviews");
  const language = locale === "es" ? "es" : "en";
  const date = new Intl.DateTimeFormat(language === "es" ? "es-MX" : "en-US", {
    dateStyle: "long", timeZone: "UTC",
  }).format(new Date(review.date));

  return (
    <article className="flex min-h-92 w-[min(86vw,360px)] shrink-0 snap-center flex-col rounded-(--radius) border border-secondary/10 bg-background p-6 shadow-[0_18px_55px_rgba(3,48,59,0.10)] sm:w-90">
      <div className="flex items-center justify-between gap-2 border-b border-secondary/10 pb-4">
        <PlatformLogo platform={review.platform} />
        <span className="text-sm tracking-wider text-primary" aria-label={`${review.rating}/5`}>
          {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
        </span>
      </div>
      <strong className="mt-4 text-secondary">{review.author}</strong>
      <time dateTime={review.date} className="text-xs text-secondary/65">{date}</time>
      <h3 className="mt-3 text-xl leading-tight text-secondary">{review.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-secondary/80">“{review.excerpt[language]}”</p>
      <a href={review.url} target="_blank" rel="noopener noreferrer nofollow"
        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-secondary underline underline-offset-4">
        {t("readFullReview", { platform: review.platform })} <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
