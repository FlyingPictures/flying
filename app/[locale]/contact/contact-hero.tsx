import { EditorialHero } from "@/components/EditorialHero";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";

export async function ContactHero() {
  const t = await getTranslations("contact.hero");

  return (
    <EditorialHero image={IMAGES.contact.hero.background} title={t("title")}
      subtitle={t("subtitle")} description={t("description")} />
  );
}
