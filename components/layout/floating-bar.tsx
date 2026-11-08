"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { Link, usePathname } from "@/i18n/routing";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { ReservationLink } from "@/components/booking/reservation-link";
import { Button } from "@/components/ui/button";
import { CallMenu } from "./call-menu";
import { SITE_CONTACT } from "@/lib/site-config";
import { BOOKING_URLS, getInquiryUrl, getPriceDisplay, isProductSlug, PRODUCT_PRICING } from "@/lib/commercial-config";

export function FloatingBar() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const concierge = useTranslations("concierge");
  const pathname = usePathname();
  const candidate = pathname.split("/").pop() ?? "";
  const slug = pathname.startsWith("/product/") && isProductSlug(candidate) ? candidate : null;
  const inquiry = slug ? getInquiryUrl(slug, locale) : SITE_CONTACT.whatsapp;
  const price = slug && PRODUCT_PRICING[slug] ? getPriceDisplay(PRODUCT_PRICING[slug], locale) : null;
  const isContact = pathname === "/contact";
  const showCatalogLink = !slug && !isContact && pathname !== "/flight-experiences";
  const { scrollY } = useScrollDirection();
  const [calling, setCalling] = useState(false);
  const hidden = scrollY <= 80 && !calling;
  const actionClass = "min-h-11 min-w-0 whitespace-normal px-3 text-center text-xs leading-tight sm:px-5 sm:text-sm";

  return (
    <aside key={pathname} aria-label={t("contactSupport")} inert={hidden} hidden={hidden}
      className="fixed inset-x-0 bottom-[max(.6rem,env(safe-area-inset-bottom))] z-40 mx-auto w-fit max-w-[calc(100%-1rem)] md:inset-x-auto md:right-6 md:bottom-5">
      <div className="flex items-center gap-0.5 rounded-[1.75rem] border border-secondary/12 bg-background p-1.5 text-secondary shadow-[0_6px_30px_rgba(3,48,59,.2)] sm:gap-1">
        {price && <span className="hidden flex-col border-r border-border px-3 md:flex">
          <small>{price.unitLabel}</small><strong className="text-sm">{price.headline}</strong></span>}
        {isContact && <span className="hidden flex-col px-3 text-xs sm:flex"><strong>{concierge("hours")}</strong>{concierge("location")}</span>}
        {slug && <Button asChild size="xs" className={actionClass}><ReservationLink slug={slug} locale={locale} /></Button>}
        {showCatalogLink && <Button asChild size="xs" className={actionClass}><Link href="/flight-experiences">{t("bookFlight")}</Link></Button>}
        {(!slug || BOOKING_URLS[slug]) && <a href={inquiry} target="_blank" rel="noopener noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1 rounded-full bg-secondary px-2.5 text-xs font-bold text-white hover:bg-secondary/90 focus-visible:ring-2 focus-visible:ring-primary sm:px-4 sm:text-sm">
          <WhatsappLogoIcon size={18} aria-hidden="true" />WhatsApp
        </a>}
        <CallMenu onOpenChange={setCalling} />
      </div>
    </aside>
  );
}
