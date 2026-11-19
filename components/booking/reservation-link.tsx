"use client";

import type { HTMLAttributes } from "react";
import { WhatsAppMenu, ContactMenuLabel } from "./whatsapp-menu";
import { BOOKING_URLS, getInquiryMessage, getReservationLabel, type ProductSlug } from "@/lib/commercial-config";

type ReservationLinkProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  slug: ProductSlug;
  locale: string;
  location?: string;
};

export function ReservationLink({ slug, locale, location, onClick, ...props }: ReservationLinkProps) {
  const label = getReservationLabel(slug, locale);
  const bookingUrl = BOOKING_URLS[slug];
  if (!bookingUrl) return (
    <WhatsAppMenu message={getInquiryMessage(slug, locale)} packageId={slug} location={location} onContactClick={onClick}>
      <button {...props} type="button" data-package-id={slug}>
        <ContactMenuLabel />
      </button>
    </WhatsAppMenu>
  );
  return (
    <a
      {...props}
      onClick={onClick}
      data-package-id={slug}
      href={bookingUrl}
      data-button-text={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
