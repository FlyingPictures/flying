import { CloudinaryImage } from "@/components/CloudinaryImage";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";

const TEXT_WRAP = "whitespace-pre-line";
const NAV_OFFSET = "calc(var(--navbar-height, 4.5rem) + 2rem)";

export async function SafetyHero() {
  const t = await getTranslations("safety.hero");

  return (
    <section className="relative h-[95vh] lg:h-screen overflow-hidden pt-18">
      <div className="absolute inset-0">
        <CloudinaryImage publicId={IMAGES.safety.hero.background} alt="Hero Background" fill priority sizes="100vw" className="h-full w-auto object-contain object-top" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute inset-0 flex items-end pb-40">
        <div className="w-full flex flex-col gap-4 sm:gap-8 px-6" style={{ paddingTop: NAV_OFFSET, maxHeight: `calc(100vh - ${NAV_OFFSET})` }}>
          <h1 className={`title hero ${TEXT_WRAP}`}>{t("title")}</h1>
          <h3 className={`decorative hero ${TEXT_WRAP}`}>{t("subtitle")}</h3>
          <p className={`paragraph hero ${TEXT_WRAP}`}>{t("description")}</p>
        </div>
      </div>
    </section>
  );
}
