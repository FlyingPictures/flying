import type { ProductPricing } from "./product-pricing";
import { NEW_PACKAGE_OFFERS, NEW_PACKAGE_SLUGS, PEEK_BOOKING_URLS } from "./package-catalog";
import { SITE_CONTACT } from "./site-config";
export { formatMxn, getPriceDisplay } from "./product-pricing";
export type { ProductPricing, PriceDisplay, PriceRow } from "./product-pricing";

export const PRODUCT_SLUGS = [
  ...NEW_PACKAGE_SLUGS,
  "open",
  "corporate",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export type CommercialLocale = "es" | "en";

export const PACKAGE_SLUGS = NEW_PACKAGE_SLUGS;

export const PRODUCT_NAMES: Record<
  ProductSlug,
  Record<CommercialLocale, string>
> = {
  classic: NEW_PACKAGE_OFFERS.classic.names,
  transport: NEW_PACKAGE_OFFERS.transport.names,
  journey: NEW_PACKAGE_OFFERS.journey.names,
  vip: NEW_PACKAGE_OFFERS.vip.names,
  celebration: NEW_PACKAGE_OFFERS.celebration.names,
  private: NEW_PACKAGE_OFFERS.private.names,
  charter: NEW_PACKAGE_OFFERS.charter.names,
  open: { es: "Tarjeta de regalo", en: "Gift Card" },
  corporate: {
    es: "Vuelos para grupos y empresas",
    en: "Group & Corporate Flights",
  },
};

export function getProductName(slug: ProductSlug, locale: string) {
  return PRODUCT_NAMES[slug][locale === "es" ? "es" : "en"];
}

export const BOOKING_URLS: Partial<Record<ProductSlug, string>> = PEEK_BOOKING_URLS;

export function getReservationLabel(slug: ProductSlug, locale: string) {
  if (BOOKING_URLS[slug]) return locale === "es" ? "Reservar" : "Book now";
  if (slug === "corporate") return locale === "es" ? "Solicitar cotización" : "Request a quote";
  return locale === "es" ? "Consultar disponibilidad" : "Ask about availability";
}

export function getReservationUrl(slug: ProductSlug, locale: string) {
  const bookingUrl = BOOKING_URLS[slug];
  if (bookingUrl) return bookingUrl;
  return getInquiryUrl(slug, locale);
}

export function getInquiryUrl(slug: ProductSlug, locale: string) {
  const name = getProductName(slug, locale);
  const message = locale === "es"
    ? `Hola, quiero consultar disponibilidad, condiciones y precio total para ${name}.`
    : `Hello, I would like to ask about availability, terms and the total price for ${name}.`;
  return `${SITE_CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const PRODUCT_PRICING: Record<ProductSlug, ProductPricing | null> = {
  classic: NEW_PACKAGE_OFFERS.classic.pricing,
  transport: NEW_PACKAGE_OFFERS.transport.pricing,
  journey: NEW_PACKAGE_OFFERS.journey.pricing,
  vip: NEW_PACKAGE_OFFERS.vip.pricing,
  celebration: NEW_PACKAGE_OFFERS.celebration.pricing,
  private: NEW_PACKAGE_OFFERS.private.pricing,
  charter: NEW_PACKAGE_OFFERS.charter.pricing,
  open: null,
  corporate: null,
};

export const BUSINESS_HOURS = {
  start: 6,
  end: 20,
  timeZone: "America/Mexico_City",
} as const;

export function isBusinessOpen(date = new Date()) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hourCycle: "h23",
      timeZone: BUSINESS_HOURS.timeZone,
    }).format(date),
  );

  return hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;
}

export function isProductSlug(value: string): value is ProductSlug {
  return PRODUCT_SLUGS.includes(value as ProductSlug);
}
