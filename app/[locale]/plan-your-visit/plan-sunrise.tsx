import { CloudinaryImage } from "@/components/CloudinaryImage";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";


export async function PlanSunrise() {
  const t = await getTranslations("planYourVisit.sunriseRitual");

  return (
    <section className="w-full bg-gradient-to-b from-background to-[#DCD2AF] to-80%">
      <div className="flex flex-col items-center justify-center gap-8 px-4 py-30">
        <div className="mb-6 block text-center">
            <h4>
              {t("label")}
            </h4>
            
            <h2 >
              {t("title")}
            </h2>
        </div>

        <div className="relative rounded-[var(--radius)] overflow-hidden mb-6 sm:mb-8 w-full sm:w-[clamp(345px,90vw,1065px)] aspect-[1065/357]">
          <CloudinaryImage 
            publicId={IMAGES.plan.sunrise.banner} 
            alt="Imagen del amanecer" 
            fill
            className="object-cover object-top"
          />
        </div>

        <p className="leading-relaxed max-w-3xl text-center">
          {t("description")}
        </p>
      </div>
    </section>
  );
}