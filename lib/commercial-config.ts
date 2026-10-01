import type { ProductPricing } from "./product-pricing";
export { formatMxn, getPriceDisplay } from "./product-pricing";
export type { ProductPricing, PriceDisplay, PriceRow } from "./product-pricing";

export const PRODUCT_SLUGS = [
  "classic",
  "journey",
  "transport",
  "open",
  "proposal",
  "anniversary",
  "birthday",
  "vip",
  "corporate",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export type CommercialLocale = "es" | "en";

export const PACKAGE_SLUGS = [
  "classic",
  "transport",
  "journey",
  "birthday",
  "anniversary",
  "proposal",
  "vip",
  "open",
] as const satisfies readonly ProductSlug[];

export const PRODUCT_NAMES: Record<
  ProductSlug,
  Record<CommercialLocale, string>
> = {
  classic: { es: "Tradicional", en: "Traditional" },
  journey: { es: "Experiencia Viajero", en: "Traveler's Flight" },
  transport: {
    es: "Vuelo + transporte + pirámides",
    en: "+Transportation + Pyramids",
  },
  open: { es: "Tarjeta de regalo", en: "Gift Card" },
  proposal: { es: "Propuesta de matrimonio", en: "Commitment" },
  anniversary: { es: "Aniversario", en: "Anniversary" },
  birthday: { es: "Cumpleaños", en: "Birthday" },
  vip: {
    es: "VIP — Vuelo, Inframundo y Pirámides",
    en: "VIP Flight — Flight, Underworld & Pyramids",
  },
  corporate: {
    es: "Vuelos para grupos y empresas",
    en: "Group & Corporate Flights",
  },
};

export function getProductName(slug: ProductSlug, locale: string) {
  return PRODUCT_NAMES[slug][locale === "es" ? "es" : "en"];
}

export const BOOKING_URLS: Partial<Record<ProductSlug, string>> = {
  classic: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/Dz8p",
  journey: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/E7Ro",
  transport: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/lwxwj",
  open: "https://flyingpictures.mx/producto/voucher-de-vuelo/",
  proposal: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/YxVm",
  anniversary: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/Yx28",
  birthday: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/B8xN",
  vip: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/Exzbg",
};

export const PRODUCT_PRICING: Record<ProductSlug, ProductPricing | null> = {
  classic: { primary: 2599, secondary: 1999, model: "perPerson" },
  journey: { primary: 3950, secondary: 3250, model: "perPerson" },
  transport: { primary: 3250, secondary: 2299, model: "perPerson" },
  open: { primary: 2600, secondary: null, model: "voucher" },
  proposal: { primary: 11500, secondary: 2600, model: "privateForTwo" },
  anniversary: { primary: 2799, secondary: 1999, model: "perPerson" },
  birthday: { primary: 2799, secondary: 1999, model: "perPerson" },
  vip: { primary: 4499, secondary: 3499, model: "perPerson" },
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
