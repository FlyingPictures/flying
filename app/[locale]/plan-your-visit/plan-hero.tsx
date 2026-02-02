import { getTranslations } from "next-intl/server";
import { CloudinaryImage } from "@/components/CloudinaryImage";

const PLAN_HERO_IMAGE = "v1769106749/plan_hero_drpbt9";
const TEXT_WRAP = "whitespace-pre-line";
const NAV_OFFSET = "calc(var(--navbar-height, 4.5rem) + 2rem)";

export async function PlanHero() {
  const t = await getTranslations("planYourVisit.hero");

  return (
    <section className="relative h-[75vh] overflow-hidden pt-[4.5rem] lg:pt-0">
      <div className="absolute inset-0 -z-10">
        <CloudinaryImage
          publicId={PLAN_HERO_IMAGE}
          alt="Plan Your Visit"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <div style={{ paddingTop: NAV_OFFSET }} className="max-w-3xl">
          <h1 className={`title hero ${TEXT_WRAP} mb-4`}>
            {t("title")}
          </h1>

          <h3 className={`decorative hero ${TEXT_WRAP} mb-4`}>
            {t("subtitle")}
          </h3>

          <p className={`paragraph hero ${TEXT_WRAP}`}>
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
