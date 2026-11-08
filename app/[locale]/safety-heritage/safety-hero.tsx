import { EditorialHero } from "@/components/EditorialHero";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";

export async function SafetyHero() {
  const t = await getTranslations("safety.hero");

  return (
    <EditorialHero image={IMAGES.safety.hero.background} title={t("title")}
      subtitle={t("subtitle")} description={t("description")} />
  );
}
