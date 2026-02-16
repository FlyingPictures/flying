import { CloudinaryImage } from "@/components/CloudinaryImage";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";

const BLOCK = "flex flex-col gap-4";
const DIVIDER = "border-t border-secondary w-full";

export async function PlanWeatherPolicy() {
  const t = await getTranslations("planYourVisit.weatherPolicy");

  return (
    <section className="relative w-full h-[758px] md:h-[1031px]">
      <CloudinaryImage
        publicId={IMAGES.plan.weatherPolicy.cancelation}
        alt="Weather Policy Background"
        fill
        className="object-cover"
      />

      <div className="relative z-10 flex flex-col justify-between items-center h-full mx-auto px-4 py-[clamp(3rem,8vh,6rem)]">
        
        <div className="flex flex-col max-w-[800px] items-center text-center gap-4">
          <h4>{t("label")}</h4>
          <h2 className="mb-6 whitespace-pre-line leading-tight">
            {t("title")}
          </h2>
          <p className="max-w-[400px] md:max-w-[600px]">
            {t("description")}
          </p>
        </div>

        <div className="w-full max-w-[345px] md:max-w-[600px] flex flex-col gap-6 items-start">
  
          <div className={`${BLOCK} w-full md:text-left`}>
            <h3 className="italic">{t("companyCancellation.title")}</h3>
            <p>{t("companyCancellation.description")}</p>
            <div className={DIVIDER}></div>
          </div>

          <div className="flex flex-row md:flex-col items-start w-full gap-4">
            
            <div className={`${BLOCK} w-1/2 md:w-full`}>
              <h3 className="italic">{t("customerCancellation.48plus.label")}</h3>
              <p>{t("customerCancellation.48plus.description")}</p>
            </div>

            <div className={`hidden md:block ${DIVIDER}`}></div>

            <div className={`${BLOCK} w-1/2 md:w-full`}>
              <h3 className="italic">{t("customerCancellation.24less.label")}</h3>
              <p>{t("customerCancellation.24less.description")}</p>
            </div>

          </div>

          <div className={DIVIDER}></div>

          <div className={`${BLOCK} w-full`}>
            <h3 className="italic">{t("customerCancellation.24to48.label")}</h3>
            <p>{t("customerCancellation.24to48.description")}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
