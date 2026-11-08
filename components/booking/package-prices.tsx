import type { PriceRow } from "@/lib/product-pricing";

export function PackagePrices({ rows, compact = false }: { rows: PriceRow[]; compact?: boolean }) {
  if (!rows.length) return null;

  return (
    <dl className={compact ? "flex flex-wrap items-end gap-x-4 gap-y-1" : "flex flex-wrap items-end gap-x-6 gap-y-3 sm:gap-x-8"}>
      {rows.map(({ label, formattedAmount }) => (
        <div key={label}>
          <dt className={compact ? "text-xs leading-tight text-secondary/80" : "text-sm font-medium text-secondary/80"}>{label}</dt>
          <dd className={compact
            ? "mt-0.5 whitespace-nowrap text-sm font-bold leading-tight tabular-nums"
            : "mt-0.5 whitespace-nowrap text-xl font-bold leading-tight tracking-tight tabular-nums sm:text-2xl"}>
            {formattedAmount}
          </dd>
        </div>
      ))}
    </dl>
  );
}
