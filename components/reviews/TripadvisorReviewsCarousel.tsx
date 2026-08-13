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
  TRIPADVISOR_REVIEWS,
  getTripadvisorText,
  type TripadvisorReview,
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

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-secondary">
            <div className="inline-flex items-center gap-2" aria-label="Tripadvisor">
              <span className="grid size-8 grid-cols-2 place-items-center gap-0.5 rounded-full bg-secondary px-2" aria-hidden="true">
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="size-1.5 rounded-full bg-primary" />
              </span>
              <span className="font-bold tracking-tight">Tripadvisor</span>
            </div>
            <span className="hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
            <div className="flex items-baseline gap-2">
              <strong className="font-libre-baskerville text-2xl font-normal">
                {TRIPADVISOR_RATING}
              </strong>
              <span className="text-xs font-bold">/ 5</span>
              <span className="text-sm text-secondary/65">
                {t("totalReviews", { count: TRIPADVISOR_REVIEW_COUNT })}
              </span>
            </div>
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
          {TRIPADVISOR_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} locale={locale} />
          ))}
        </div>

        <div className="mt-2 flex justify-center">
          <a
            href={TRIPADVISOR_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-card-link inline-flex items-center gap-1.5 text-secondary"
          >
            {t("readMoreReviews")}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  locale,
}: {
  review: TripadvisorReview;
  locale: string;
}) {
  const t = useTranslations("reviews");
  const initials = review.author
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="flex min-h-92 w-[min(86vw,360px)] shrink-0 snap-center flex-col overflow-hidden rounded-(--radius) border border-secondary/10 bg-background shadow-[0_18px_55px_rgba(3,48,59,0.10)] sm:w-90">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <a
            href={review.profileUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary font-bold text-primary"
            aria-label={`${review.author} — Tripadvisor`}
          >
            {review.avatarUrl ? (
              <Image
                src={review.avatarUrl}
                alt={review.author}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              initials
            )}
          </a>
          <div className="min-w-0">
            <p className="truncate font-bold text-secondary">{review.author}</p>
            <p className="truncate text-xs text-secondary/60">
              {getTripadvisorText(review.location, locale)}
            </p>
          </div>
          <span className="ml-auto text-sm tracking-[0.12em] text-primary">
            {"★".repeat(review.rating)}
          </span>
        </div>

        <div className="my-5 h-px bg-secondary/10" />

        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary/45">
          {getTripadvisorText(review.date, locale)}
        </p>
        <h3 className="mt-2 font-libre-baskerville text-2xl leading-tight text-secondary">
          {getTripadvisorText(review.title, locale)}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-secondary/75">
          “{getTripadvisorText(review.excerpt, locale)}”
        </p>

        <a
          href={review.reviewUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-secondary underline decoration-current decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
        >
          {t("readFullReview")}
          <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}
