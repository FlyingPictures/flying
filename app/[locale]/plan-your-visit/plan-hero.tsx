import { EditorialHero } from "@/components/EditorialHero";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";

export async function PlanHero() {
  const t = await getTranslations("planYourVisit.hero");

  return (
    <EditorialHero image={IMAGES.plan.hero.background} title={t("title")}
      subtitle={t("subtitle")} description={t("description")} />
  );
}
