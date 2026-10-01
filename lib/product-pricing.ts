export type PricingLocale = "es" | "en";

type PricingBase = {
  primary: number | null;
  secondary: number | null;
};

export type ProductPricing = PricingBase & (
  | { model: "perPerson" | "privateForTwo" | "voucher" }
  | {
      model: "perPackage";
      includedPeople: number | null;
      minimumPeople: number | null;
    }
);

export interface PriceRow {
  label: string;
  amount: number;
  formattedAmount: string;
}

export interface PriceDisplay {
  rows: PriceRow[];
  headline: string;
  summary: string;
  unitLabel: string;
  note: string | null;
}

const LABELS = {
  es: {
    perPerson: "Precio por adulto",
    perPackage: "Precio por paquete",
    privateForTwo: "2 adultos (vuelo privado)",
    voucher: "Tarjeta individual",
    child: "Niños (4–12)",
    additional: "Persona adicional",
    onRequest: "Consultar precio",
    from: "Desde",
    includedPending: "Confirma cuántas personas incluye el paquete y el total de tu grupo.",
    included: (count: number) => `Incluye ${count} ${count === 1 ? "persona" : "personas"}.`,
    minimum: (count: number) => `Mínimo ${count} ${count === 1 ? "persona" : "personas"}.`,
  },
  en: {
    perPerson: "Price per adult",
    perPackage: "Price per package",
    privateForTwo: "2 adults (private flight)",
    voucher: "Individual gift card",
    child: "Children (4–12)",
    additional: "Additional guest",
    onRequest: "Ask for pricing",
    from: "From",
    includedPending: "Confirm how many guests the package includes and your group's total.",
    included: (count: number) => `Includes ${count} ${count === 1 ? "guest" : "guests"}.`,
    minimum: (count: number) => `Minimum ${count} ${count === 1 ? "guest" : "guests"}.`,
  },
} as const;

export function formatMxn(amount: number) {
  return `$${new Intl.NumberFormat("en-US").format(amount)} MXN`;
}

export function getPriceDisplay(
  pricing: ProductPricing | null,
  locale: string,
): PriceDisplay {
  const labels = LABELS[locale === "es" ? "es" : "en"];
  if (!pricing) {
    return { rows: [], headline: labels.onRequest, summary: labels.onRequest, unitLabel: "", note: null };
  }

  const unitLabel = labels[pricing.model];
  const rows: PriceRow[] = [];
  if (pricing.primary !== null) {
    rows.push({ label: unitLabel, amount: pricing.primary, formattedAmount: formatMxn(pricing.primary) });
    // Secondary prices in a package need a defined passenger category before display.
    if (pricing.secondary !== null && (pricing.model === "perPerson" || pricing.model === "privateForTwo")) {
      rows.push({
        label: pricing.model === "perPerson" ? labels.child : labels.additional,
        amount: pricing.secondary,
        formattedAmount: formatMxn(pricing.secondary),
      });
    }
  }

  const headline = pricing.primary === null ? labels.onRequest : formatMxn(pricing.primary);
  const summary = pricing.primary === null ? labels.onRequest : `${labels.from} ${headline}`;
  const conditions: string[] = [];
  if (pricing.model === "perPackage") {
    if (pricing.minimumPeople !== null) conditions.push(labels.minimum(pricing.minimumPeople));
    conditions.push(pricing.includedPeople === null ? labels.includedPending : labels.included(pricing.includedPeople));
  }
  return { rows, headline, summary, unitLabel, note: conditions.length ? conditions.join(" ") : null };
}
