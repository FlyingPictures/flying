import type { ProductPricing } from "./product-pricing";

// Public widget key and flow IDs supplied in “Scripts HTML - Paquetes Peek FP 2026”.
export const PEEK_WIDGET_KEY = "3ed46494-9c75-4a7a-b02c-e78f1decab9b";
const baseUrl = `https://book.peek.com/s/${PEEK_WIDGET_KEY}`;

export const PEEK_BOOKING_URLS = {
  classic: `${baseUrl}/aDOeY`,
  transport: `${baseUrl}/OvVBY`,
  vip: `${baseUrl}/XWOzq`,
  celebration: `${baseUrl}/qjNAb`,
  journey: `${baseUrl}/D06ep`,
  private: `${baseUrl}/RdYP4`,
} as const;

// Active offers, transcribed from the M1 source matrix. Unconfirmed purchase terms stay explicit.
export const NEW_PACKAGE_SLUGS = [
  "classic", "transport", "vip", "celebration", "journey", "private", "charter",
] as const;

export type NewPackageSlug = (typeof NEW_PACKAGE_SLUGS)[number];

export interface PackageOffer {
  names: { es: string; en: string };
  mode: "shared" | "private";
  pricing: ProductPricing;
  priceSource: string;
  unresolvedPriceCandidates?: readonly number[];
  bookingUrl: string | null;
  additionalPassengers: readonly {
    category: "adult" | "child" | "guest" | "nonFlyingGuest";
    observedAmount: number;
    source: string;
    status: "pendingConfirmation";
  }[];
}

export const NEW_PACKAGE_OFFERS: Record<NewPackageSlug, PackageOffer> = {
  classic: {
    names: { es: "Vuelo Esencial", en: "Essential Flight" }, mode: "shared",
    pricing: { primary: 2599, secondary: 1999, model: "perPerson" },
    priceSource: "Paquetes!B11:B12", bookingUrl: PEEK_BOOKING_URLS.classic, additionalPassengers: [],
  },
  transport: {
    names: { es: "+Transporte + Pirámides", en: "Flight + Transport + Pyramids" }, mode: "shared",
    pricing: { primary: 3550, secondary: 2850, model: "perPerson" },
    priceSource: "Paquetes!C11:C12", bookingUrl: PEEK_BOOKING_URLS.transport, additionalPassengers: [],
  },
  vip: {
    names: { es: "Premium - VIP", en: "Premium - VIP" }, mode: "private",
    pricing: { primary: 22500, secondary: null, model: "perPackage", includedPeople: null, minimumPeople: null },
    priceSource: "Paquetes!D13", bookingUrl: PEEK_BOOKING_URLS.vip,
    additionalPassengers: [
      { category: "adult", observedAmount: 4559, source: "Paquetes!D51", status: "pendingConfirmation" },
      { category: "child", observedAmount: 3559, source: "Paquetes!D52", status: "pendingConfirmation" },
      { category: "nonFlyingGuest", observedAmount: 1960, source: "Paquetes!D55", status: "pendingConfirmation" },
    ],
  },
  celebration: {
    names: { es: "Celebración", en: "Celebration" }, mode: "private",
    pricing: { primary: 11999, secondary: null, model: "perPackage", includedPeople: null, minimumPeople: 2 },
    priceSource: "Paquetes!E13", bookingUrl: PEEK_BOOKING_URLS.celebration,
    additionalPassengers: [
      { category: "guest", observedAmount: 2799, source: "Paquetes!E63", status: "pendingConfirmation" },
    ],
  },
  journey: {
    names: { es: "Viajero", en: "Traveler" }, mode: "shared",
    pricing: { primary: null, secondary: null, model: "perPackage", includedPeople: null, minimumPeople: 2 },
    priceSource: "Paquetes!F13 y comentario", unresolvedPriceCandidates: [7999, 8099], bookingUrl: PEEK_BOOKING_URLS.journey,
    additionalPassengers: [
      { category: "guest", observedAmount: 1450, source: "Paquetes!F53", status: "pendingConfirmation" },
    ],
  },
  private: {
    names: { es: "Experiencia en Globo Privada", en: "Private Balloon Experience" }, mode: "private",
    pricing: { primary: 11499, secondary: null, model: "perPackage", includedPeople: null, minimumPeople: 2 },
    priceSource: "Paquetes!G13", bookingUrl: PEEK_BOOKING_URLS.private,
    additionalPassengers: [
      { category: "guest", observedAmount: 1999, source: "Paquetes!G59", status: "pendingConfirmation" },
    ],
  },
  charter: {
    names: { es: "FPM Private Charter", en: "FPM Private Charter" }, mode: "private",
    pricing: { primary: 30000, secondary: null, model: "perPackage", includedPeople: null, minimumPeople: null },
    priceSource: "Paquetes!H13", bookingUrl: null,
    additionalPassengers: [
      { category: "guest", observedAmount: 5000, source: "Paquetes!H51", status: "pendingConfirmation" },
    ],
  },
};
