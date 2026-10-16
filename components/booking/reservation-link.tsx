import type { ComponentProps } from "react";
import { BOOKING_URLS, getReservationLabel, getReservationUrl, type ProductSlug } from "@/lib/commercial-config";

type ReservationLinkProps = Omit<ComponentProps<"a">, "href" | "children"> & {
  slug: ProductSlug;
  locale: string;
};

export function ReservationLink({ slug, locale, ...props }: ReservationLinkProps) {
  const label = getReservationLabel(slug, locale);
  return (
    <a
      {...props}
      href={getReservationUrl(slug, locale)}
      data-button-text={BOOKING_URLS[slug] ? label : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
