import type { ProductSlug } from "./commercial-config";

type PageContext = "home" | "catalog" | "safety" | "plan" | "contact" | "terms" | "privacy" | "cancellation" | "general";
export type WhatsAppContextKey = PageContext | ProductSlug;

const PRODUCT_CONTEXTS: Record<ProductSlug, ProductSlug> = {
  classic: "classic",
  transport: "transport",
  journey: "journey",
  vip: "vip",
  celebration: "celebration",
  private: "private",
  charter: "charter",
  open: "open",
  corporate: "corporate",
};

const PAGE_CONTEXTS: Record<string, PageContext> = {
  "/": "home",
  "/flight-experiences": "catalog",
  "/safety-heritage": "safety",
  "/plan-your-visit": "plan",
  "/contact": "contact",
  "/legal/terms": "terms",
  "/legal/privacy": "privacy",
  "/legal/cancellation": "cancellation",
};

export function resolveWhatsAppContext(pathname: string, packageId?: ProductSlug): { key: WhatsAppContextKey; packageId?: ProductSlug } {
  const path = pathname.replace(/^\/(?:es|en)(?=\/|$)/, "").replace(/\/+$/, "") || "/";
  // A package card or corporate form takes priority over the surrounding page.
  const candidate = packageId ?? /^\/product\/([^/]+)$/.exec(path)?.[1];
  if (candidate && Object.prototype.hasOwnProperty.call(PRODUCT_CONTEXTS, candidate)) {
    const product = candidate as ProductSlug;
    return { key: PRODUCT_CONTEXTS[product], packageId: product };
  }
  return { key: PAGE_CONTEXTS[path] ?? "general" };
}
