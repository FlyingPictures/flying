import { CloudinaryImage } from "@/components/CloudinaryImage";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";

const TEXT_WRAP = "whitespace-pre-line";
export async function SafetyHero() {
  const t = await getTranslations("safety.hero");

  return (
    <section className="relative min-h-[95svh] overflow-hidden lg:h-screen">
      <div className="absolute inset-0">
        <CloudinaryImage publicId={IMAGES.safety.hero.background} alt="" fill priority sizes="100vw" className="h-full w-auto object-contain object-top" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 flex min-h-[95svh] items-end pb-[clamp(2.5rem,12vh,10rem)] pt-36 lg:absolute lg:inset-0 lg:min-h-0 lg:pt-0">
        <div className="flex w-full flex-col gap-4 px-6 sm:gap-8">
          <h1 className={`title hero ${TEXT_WRAP}`}>{t("title")}</h1>
          <h3 className={`decorative hero ${TEXT_WRAP}`}>{t("subtitle")}</h3>
          <p className={`paragraph hero ${TEXT_WRAP}`}>{t("description")}</p>
        </div>
      </div>
    </section>
  );
}
