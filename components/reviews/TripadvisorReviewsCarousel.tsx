"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useNow, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";

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
  const interactionRef = useRef({ hovered: false, focused: false, dragging: false, lastManualMove: 0 });
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, prefersReducedMotion, () => true);
  const [autoplayPreference, setAutoplayPreference] = useState<boolean | null>(null);
  const isPlaying = autoplayPreference ?? !reducedMotion;
  const isHome = variant === "home";

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    interactionRef.current.lastManualMove = Date.now();
    moveReview(track, direction, reducedMotion ? "instant" : "smooth");
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isPlaying) return;
    let inView = false;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    }, { threshold: 0.35 });
    observer.observe(track);
    const timer = window.setInterval(() => {
      const interaction = interactionRef.current;
      if (!inView || document.hidden || interaction.hovered || interaction.focused || interaction.dragging
        || Date.now() - interaction.lastManualMove < 6000) return;
      moveReview(track, 1, reducedMotion ? "instant" : "smooth");
    }, 6000);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [isPlaying, reducedMotion]);

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

        <div className="mt-8 flex items-center justify-between gap-3">
          <CurrentDate />
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
              onClick={() => setAutoplayPreference(!isPlaying)}
              aria-label={t(isPlaying ? "pauseAutoplay" : "playAutoplay")}
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
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
          tabIndex={0}
          aria-label={t("readRealReviews")}
          className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-9 motion-safe:scroll-smooth sm:gap-5 sm:pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          onPointerEnter={(event) => { if (event.pointerType === "mouse") interactionRef.current.hovered = true; }}
          onPointerLeave={() => { interactionRef.current.hovered = false; interactionRef.current.dragging = false; }}
          onPointerDown={() => { interactionRef.current.dragging = true; interactionRef.current.lastManualMove = Date.now(); }}
          onPointerUp={() => { interactionRef.current.dragging = false; interactionRef.current.lastManualMove = Date.now(); }}
          onPointerCancel={() => { interactionRef.current.dragging = false; interactionRef.current.lastManualMove = Date.now(); }}
          onWheel={() => { interactionRef.current.lastManualMove = Date.now(); }}
          onFocusCapture={() => { interactionRef.current.focused = true; }}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) interactionRef.current.focused = false; }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          {TRAVELER_REVIEWS.map((review) => (
            <ReviewCard key={review.url} review={review} locale={locale} />
          ))}
        </div>

        <p className="mt-2 text-center text-[clamp(0.75rem,3.3vw,0.875rem)] font-semibold whitespace-nowrap text-secondary">
          {t.rich("moreReviews", {
            tripadvisor: (chunks) => <a href={TRIPADVISOR_PROFILE_URL} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-4">{chunks}</a>,
            viator: (chunks) => <a href={VIATOR_REVIEWS_URL} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-4">{chunks}</a>,
          })}
        </p>
      </div>
    </section>
  );
}

function moveReview(track: HTMLDivElement, direction: -1 | 1, behavior: ScrollBehavior) {
  const first = track.children[0] as HTMLElement | undefined;
  const second = track.children[1] as HTMLElement | undefined;
  if (!first || !second) return;
  const step = second.offsetLeft - first.offsetLeft;
  const maxScroll = track.scrollWidth - track.clientWidth;
  const atEnd = track.scrollLeft >= maxScroll - 2;
  const next = direction === 1 && atEnd ? 0
    : direction === -1 && track.scrollLeft <= 2 ? maxScroll
    : (Math.round(track.scrollLeft / step) + direction) * step;
  track.scrollTo({ left: Math.max(0, Math.min(next, maxScroll)), behavior });
}

function subscribeToReducedMotion(refresh: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", refresh);
  return () => media.removeEventListener("change", refresh);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const mexicoDay = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit",
});

function currentDay() {
  return mexicoDay.format(Date.now());
}

function subscribeToDayChange(refresh: () => void) {
  let timer: number;
  function tick() {
    refresh();
    timer = window.setTimeout(tick, 60_000 - Date.now() % 60_000);
  }
  timer = window.setTimeout(tick, 60_000 - Date.now() % 60_000);
  document.addEventListener("visibilitychange", refresh);
  window.addEventListener("pageshow", refresh);
  return () => {
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", refresh);
    window.removeEventListener("pageshow", refresh);
  };
}

function CurrentDate() {
  const initialNow = useNow();
  const locale = useLocale();
  const t = useTranslations("reviews");
  const day = useSyncExternalStore(subscribeToDayChange, currentDay, () => mexicoDay.format(initialNow));
  const date = new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", {
    dateStyle: "long", timeZone: "UTC",
  }).format(new Date(day));

  return <time dateTime={day} className="text-[10px] uppercase tracking-[0.08em] text-secondary/55 sm:text-xs sm:tracking-[0.16em]">{t("today", { date })}</time>;
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
    <article className="flex min-h-80 w-[calc(100%-2.75rem)] max-w-76 shrink-0 snap-start flex-col rounded-(--radius) border border-secondary/10 bg-background p-5 shadow-[0_18px_55px_rgba(3,48,59,0.10)] sm:min-h-92 sm:w-90 sm:max-w-none sm:p-6">
      <div className="flex items-center justify-between gap-2 border-b border-secondary/10 pb-4 [&_img]:max-w-[48%] [&_img]:object-contain">
        <PlatformLogo platform={review.platform} />
        <span className="shrink-0 text-xs tracking-wider text-primary sm:text-sm" aria-label={`${review.rating}/5`}>
          {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
        </span>
      </div>
      <strong className="mt-4 text-secondary">{review.author}</strong>
      <time dateTime={review.date} className="text-xs text-secondary/65">{date}</time>
      <h3 className="mt-3 text-lg leading-tight text-secondary sm:text-xl">{review.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-secondary/80">“{review.excerpt[language]}”</p>
      <a href={review.url} target="_blank" rel="noopener noreferrer nofollow"
        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-secondary underline underline-offset-4">
        {t("readFullReview", { platform: review.platform })} <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
