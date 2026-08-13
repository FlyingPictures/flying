import { CheckCircle2, CircleMinus, Info, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

import type { PackageDetails as PackageDetailsData } from "@/types/product";

type Props = {
  details: PackageDetailsData;
};

export default async function PackageDetails({ details }: Props) {
  const t = await getTranslations("product");

  return (
    <section className="w-full px-4 py-10 md:px-10 lg:px-20 lg:py-14">
      <div className="mx-auto flex w-full max-w-270 flex-col gap-8 border-t border-border pt-10 lg:gap-10 lg:pt-12">
        <header className="max-w-180 lg:mx-auto lg:text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
            {t("packageDetails.eyebrow")}
          </p>
          <h3 className="mt-2">{t("packageDetails.title")}</h3>
        </header>

        <div className="grid gap-5 lg:grid-cols-12">
          <DetailCard
            title={t("included.title")}
            items={details.included}
            icon="included"
            className="lg:col-span-6"
          />
          <DetailCard
            title={t("notIncluded.title")}
            items={details.notIncluded}
            icon="excluded"
            className="lg:col-span-6"
          />
          <DetailCard
            title={t("recommended.title")}
            items={details.recommendedExtras}
            icon="extra"
            className="border-primary/25 bg-primary/8 lg:col-span-12"
            listClassName="sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>

        {details.notes.length > 0 && (
          <aside className="rounded-(--radius) border border-secondary/12 bg-secondary px-5 py-5 text-background md:px-7 md:py-6">
            <div className="flex items-center gap-2">
              <Info className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <h4 className="text-base font-bold normal-case text-background md:text-lg">
                {t("packageNotes.title")}
              </h4>
            </div>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {details.notes.map((note) => (
                <li key={note} className="text-sm leading-relaxed text-background/90">
                  {note}
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </section>
  );
}

function DetailCard({
  title,
  items,
  icon,
  className = "",
  listClassName = "sm:grid-cols-2",
}: {
  title: string;
  items: string[];
  icon: "included" | "excluded" | "extra";
  className?: string;
  listClassName?: string;
}) {
  return (
    <article className={`rounded-(--radius) border border-secondary/12 bg-card/35 p-5 shadow-[0_10px_30px_rgba(3,48,59,0.045)] md:p-6 ${className}`}>
      <h4 className="text-lg font-bold normal-case text-secondary md:text-xl">{title}</h4>
      <ul className={`mt-5 grid gap-x-6 gap-y-3.5 ${listClassName}`}>
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-secondary/85 md:text-[0.9375rem]">
            <DetailIcon type={icon} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function DetailIcon({ type }: { type: "included" | "excluded" | "extra" }) {
  if (type === "included") {
    return <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden="true" />;
  }
  if (type === "excluded") {
    return <CircleMinus className="mt-0.5 size-5 shrink-0 text-secondary/45" aria-hidden="true" />;
  }
  return <Sparkles className="mt-0.5 size-5 shrink-0 text-primary-foreground" aria-hidden="true" />;
}
