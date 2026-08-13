import { getLocale, getTranslations } from "next-intl/server";
import { NotFoundContent } from "@/components/not-found-content";

export default async function LocalizedNotFound() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("notFound"),
  ]);

  return (
    <NotFoundContent
      title={t("title")}
      description={t("description")}
      backHome={t("backHome")}
      homeHref={`/${locale}`}
    />
  );
}
