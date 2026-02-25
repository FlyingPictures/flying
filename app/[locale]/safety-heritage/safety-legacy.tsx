import { CloudinaryImage } from "@/components/CloudinaryImage";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";

export async function SafetyLegacy() {
  const t = await getTranslations("safety");

  return (
    <section className="relative w-full h-263 lg:h-375 overflow-hidden">
      
      <CloudinaryImage publicId={IMAGES.safety.legacy.background} alt="Safety Legacy Background" fill sizes="100vw" className="absolute inset-0 object-cover" priority />

      <div className="relative h-full w-full flex justify-center">
  
        <div className="flex flex-col items-center text-center mt-[clamp(2rem,4vw,4rem)] gap-4 w-full max-w-175 px-6 md:px-0">
          
          <h4>
            {t("legacy.subtitle")}
          </h4>

          <h2 className="whitespace-pre-line">
            {t("legacy.title")}
          </h2>

          <p className="whitespace-pre-line md:m-8">
            {t("legacy.description")}
          </p>

        </div>

      </div>
    </section>
  );
}