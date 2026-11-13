"use client";

import { useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { Link, usePathname } from "@/i18n/routing";
import { ReservationLink } from "@/components/booking/reservation-link";
import { Button } from "@/components/ui/button";
import { PackagePrices } from "@/components/booking/package-prices";
import { cn } from "@/lib/utils";
import { CallMenu } from "./call-menu";
import { SITE_CONTACT } from "@/lib/site-config";
import { BOOKING_URLS, getInquiryUrl, getPriceDisplay, isProductSlug, PRODUCT_PRICING } from "@/lib/commercial-config";

function subscribeToViewportChanges(update: () => void) {
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  const resize = new ResizeObserver(update);
  resize.observe(document.body);
  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    resize.disconnect();
  };
}

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
  const pastBookingOptions = useSyncExternalStore(subscribeToViewportChanges, () => {
    if (!slug) return window.scrollY > 80;
    const options = document.getElementById(`booking-options-${slug}`);
    return options !== null && options.getBoundingClientRect().bottom <= 0;
  }, () => false);
  const [calling, setCalling] = useState(false);
  const hidden = !pastBookingOptions && (slug !== null || !calling);
  const actionClass = "min-h-11 min-w-0 whitespace-normal px-3 text-center text-xs leading-tight sm:px-5 sm:text-sm";

  return (
    <aside key={pathname} aria-label={t("contactSupport")} inert={hidden} hidden={hidden}
      className={cn(
        "fixed inset-x-0 bottom-[max(.6rem,env(safe-area-inset-bottom))] z-40 mx-auto w-fit max-w-[calc(100%-1rem)] md:inset-x-auto md:right-6 md:bottom-5",
        slug && "package-booking-bar max-md:w-[calc(100%-1.5rem)]",
      )}>
      <div className={cn(
        "flex items-center gap-1 rounded-[1.75rem] bg-background p-1.5 text-secondary shadow-[0_6px_30px_rgba(3,48,59,.2)]",
        slug && "max-md:flex-wrap max-md:gap-x-3 max-md:gap-y-2 max-md:rounded-2xl max-md:px-3 max-md:py-2",
      )}>
        {price && price.rows.length > 0 && <div className="px-2 max-[519px]:basis-full">
          <PackagePrices rows={price.rows} compact />
        </div>}
        {isContact && <span className="hidden flex-col px-3 text-xs sm:flex"><strong>{concierge("hours")}</strong>{concierge("location")}</span>}
        <div className={cn("flex items-center gap-1", slug && "max-md:flex-1 max-md:justify-end max-[519px]:[&>a]:flex-1")}>
          {slug && <Button asChild size="xs" className={actionClass}><ReservationLink slug={slug} locale={locale} /></Button>}
          {showCatalogLink && <Button asChild size="xs" className={actionClass}><Link href="/flight-experiences">{t("bookFlight")}</Link></Button>}
          {(!slug || BOOKING_URLS[slug]) && <a href={inquiry} target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1 rounded-full bg-secondary px-2.5 text-xs font-bold text-white hover:bg-secondary/90 focus-visible:ring-2 focus-visible:ring-primary sm:px-4 sm:text-sm">
            <WhatsappLogoIcon size={18} aria-hidden="true" />WhatsApp
          </a>}
          {!hidden && <CallMenu onOpenChange={slug ? undefined : setCalling} />}
        </div>
      </div>
    </aside>
  );
}
