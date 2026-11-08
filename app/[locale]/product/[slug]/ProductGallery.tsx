"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { CloudinaryPhoto } from "@/components/CloudinaryPhoto";
import { ReservationLink } from "@/components/booking/reservation-link";
import { CallMenu } from "@/components/layout/call-menu";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { galleryCaptions } from "@/lib/gallery-captions";
import { getPriceDisplay, getProductName, PRODUCT_PRICING, type ProductSlug } from "@/lib/commercial-config";

const control = "grid size-11 shrink-0 place-items-center rounded-full border border-current/20 transition-colors hover:bg-current/10 focus-visible:ring-2 focus-visible:ring-primary";

export function ProductGallery({ slug, subtitle }: { slug: ProductSlug; subtitle: string }) {
  const images = IMAGES.product.gallery[slug];
  const locale = useLocale() === "es" ? "es" : "en";
  const t = useTranslations("product.gallery");
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const photo = images[index];
  const caption = galleryCaptions[photo][locale];
  const name = getProductName(slug, locale);
  const price = getPriceDisplay(PRODUCT_PRICING[slug], locale);
  const position = t("position", { current: index + 1, total: images.length });

  function move(delta: number) {
    setIndex(current => (current + delta + images.length) % images.length);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    event.stopPropagation();
    move(event.key === "ArrowRight" ? 1 : -1);
  }

  function onTouchStart(event: TouchEvent) {
    const point = event.touches[0];
    touch.current = event.touches.length === 1 ? { x: point.clientX, y: point.clientY } : null;
  }

  function onTouchEnd(event: TouchEvent) {
    const start = touch.current;
    touch.current = null;
    if (!start || event.touches.length) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    move(dx < 0 ? 1 : -1);
  }

  useEffect(() => {
    const track = strip.current;
    const selected = track?.children[index] as HTMLElement | undefined;
    if (!track || !selected) return;
    const left = selected.offsetLeft;
    if (left < track.scrollLeft || left + selected.offsetWidth > track.scrollLeft + track.clientWidth) {
      track.scrollLeft = left - (track.clientWidth - selected.offsetWidth) / 2;
    }
  }, [index, expanded]);

  const gestures = { onTouchStart, onTouchEnd, onTouchCancel: () => { touch.current = null; } };

  function controls() {
    return <div className="flex shrink-0 items-center gap-1.5">
      <button type="button" aria-label={t("previous")} className={control} onClick={() => move(-1)}><ChevronLeft size={21} /></button>
      <button type="button" aria-label={t("next")} className={control} onClick={() => move(1)}><ChevronRight size={21} /></button>
    </div>;
  }

  return (
    <Dialog.Root open={expanded} onOpenChange={setExpanded}>
      <section aria-label={t("title")} className="min-w-0 lg:col-start-1 lg:row-span-2 lg:row-start-1">
        <div className="grid aspect-square max-h-[40rem] grid-cols-2 grid-rows-2 gap-1 overflow-hidden rounded-(--radius) sm:aspect-[6/5]">
          {images.slice(0, 4).map((id, i) => (
            <Dialog.Trigger asChild key={id}>
              <button type="button"
                onClick={event => {
                  opener.current = event.currentTarget;
                  setIndex(i);
                }}
                className="group relative overflow-hidden rounded-sm bg-secondary/10 focus-visible:z-10 focus-visible:outline-3 focus-visible:outline-offset-[-4px] focus-visible:outline-primary">
                <span className="sr-only">{t("thumbnail", { number: i + 1, caption: galleryCaptions[id][locale] })}</span>
                <CloudinaryPhoto publicId={id} alt="" fill priority={i === 0}
                  sizes="(min-width: 1550px) 410px, (min-width: 1024px) 27vw, 48vw"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.025]" />
                {i === 3 && <span className="absolute right-2 bottom-2 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-secondary shadow sm:right-3 sm:bottom-3">
                  <Images size={16} aria-hidden="true" />{t("allPhotos", { total: images.length })}
                </span>}
              </button>
            </Dialog.Trigger>
          ))}
        </div>
      </section>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-70 bg-[#101c20]/95" />
        <Dialog.Content aria-describedby={undefined} onKeyDown={onKeyDown}
          onCloseAutoFocus={event => { event.preventDefault(); opener.current?.focus({ preventScroll: true }); }}
          className="fixed inset-0 z-80 flex h-dvh flex-col overflow-y-auto bg-[#101c20] text-white outline-none">
          <div className="flex items-center justify-between gap-3 px-4 py-2 sm:px-8">
            <Dialog.Title className="text-left text-base font-semibold tracking-normal">{name}</Dialog.Title>
            <Dialog.Close className={control} aria-label={t("close")}><X size={22} /></Dialog.Close>
          </div>
          <div {...gestures} className="relative min-h-24 flex-1 touch-pan-y">
            <CloudinaryPhoto publicId={photo} alt={caption} fill priority sizes="100vw" className="object-contain" />
          </div>
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-8">
            <div aria-live="polite" aria-atomic="true">
              <span className="block text-xs tabular-nums text-white/70">{position}</span>
              <span className="text-sm font-medium sm:text-base">{caption}</span>
            </div>
            {controls()}
          </div>
          <div ref={strip} className="relative mx-auto flex w-full max-w-6xl shrink-0 gap-2 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:px-8 [@media(max-height:540px)]:hidden">
            {images.map((id, i) => (
              <button type="button" key={id} onClick={() => setIndex(i)} aria-pressed={index === i}
                aria-label={t("thumbnail", { number: i + 1, caption: galleryCaptions[id][locale] })}
                className="relative h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-lg border-2 border-transparent opacity-65 hover:opacity-100 focus-visible:outline-offset-[-3px] aria-pressed:border-white aria-pressed:opacity-100 sm:h-14 sm:w-20">
                <CloudinaryPhoto publicId={id} alt="" fill aspectRatio="3:2" sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
          <div className="border-t border-white/15 bg-background px-4 pt-3 pb-[max(.75rem,env(safe-area-inset-bottom))] text-secondary">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 sm:px-4">
              <div className="min-w-0 flex-1">
                <p className="hidden text-sm sm:block">{subtitle}</p>
                {price.rows[0] ? <><span className="block text-xs">{price.unitLabel}</span><strong>{price.headline}</strong></> : <strong className="text-sm">{price.headline}</strong>}
              </div>
              <div className="flex max-w-full flex-wrap items-center gap-1">
                <CallMenu />
                <Button asChild size="md" className="h-auto min-h-11 max-w-full whitespace-normal px-5 text-center text-sm">
                  <ReservationLink slug={slug} locale={locale} onClick={() => setExpanded(false)} />
                </Button>
              </div>
              {price.note && <p className="basis-full text-xs text-muted-foreground">{price.note}</p>}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
