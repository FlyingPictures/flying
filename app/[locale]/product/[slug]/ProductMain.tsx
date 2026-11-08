"use client";

import { useLocale, useTranslations } from "next-intl";
import type { ProductTranslation } from "@/types/product";
import { TRIPADVISOR_RATING, TRIPADVISOR_REVIEW_COUNT } from "@/lib/tripadvisor-reviews";
import { PackagePrices } from "@/components/booking/package-prices";
import { ReservationLink } from "@/components/booking/reservation-link";
import { Button } from "@/components/ui/button";
import { BOOKING_URLS, PRODUCT_PRICING, getInquiryUrl, getPriceDisplay, getProductName, type ProductSlug } from "@/lib/commercial-config";
import { ProductGallery } from "./ProductGallery";

export default function ProductMain({ slug, data }: { slug: ProductSlug; data: ProductTranslation }) {
  const locale = useLocale();
  const t = useTranslations("flightExperiences.cards");
  const price = getPriceDisplay(PRODUCT_PRICING[slug], locale);

  return (
    <section className="site-frame max-lg:max-w-[calc(100%-2rem)] grid min-w-0 gap-4 pt-36 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-[clamp(2rem,4vw,4rem)] lg:pt-47">
      <div className="space-y-2 lg:col-start-2">
        <h1 className="product-title">{getProductName(slug, locale)}</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">{data.hero.subtitle}</p>
      </div>
      <ProductGallery key={slug} slug={slug} subtitle={data.hero.subtitle} />
      <div className="flex min-w-0 flex-col items-start gap-5 lg:col-start-2">
        <div className="order-2 lg:order-none">
          <h2 className="text-left font-inter text-lg font-bold tracking-normal">{data.description.title}</h2>
          <p className="product-body mt-2">{data.description.paragraph}</p>
        </div>
        <div className="w-full space-y-4 rounded-2xl bg-secondary/[.045] p-4 sm:p-5">
          <PackagePrices rows={price.rows} />
          {price.note && <p className="text-xs text-muted-foreground">{price.note}</p>}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Button asChild><ReservationLink slug={slug} locale={locale} /></Button>
            {BOOKING_URLS[slug] && <a className="inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4" href={getInquiryUrl(slug, locale)} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
          </div>
        </div>
        <span className="order-3 text-sm text-muted-foreground">★ {TRIPADVISOR_RATING} · {t("tripadvisorReviews", { count: TRIPADVISOR_REVIEW_COUNT })}</span>
      </div>
    </section>
  );
}
