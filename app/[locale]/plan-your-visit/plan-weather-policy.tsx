import { CloudinaryImage } from "@/components/CloudinaryImage";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

const BLOCK = "flex flex-col gap-4";
const DIVIDER = "border-t border-secondary w-full";

export async function PlanWeatherPolicy() {
  const [t, policy] = await Promise.all([
    getTranslations("planYourVisit.weatherPolicy"),
    getTranslations("legal.cancellation"),
  ]);

  return (
    <section id="weather-policy" className="relative w-full min-h-[758px] scroll-mt-32 md:min-h-[1031px]">
      <CloudinaryImage
        publicId={IMAGES.plan.weatherPolicy.cancelation}
        alt=""
        fill
        className="object-cover"
      />

      <div className="relative z-10 flex flex-col justify-between items-center h-full mx-auto px-6 md:px-10 lg:px-16 py-[clamp(3rem,8vh,6rem)]">
        
        <div className="flex flex-col max-w-[800px] items-center text-center gap-4">
          <h4>{t("label")}</h4>
          <h2 className="mb-6 whitespace-pre-line leading-tight">
            {t("title")}
          </h2>
          <p className="max-w-[400px] md:max-w-[600px] whitespace-pre-line mb-14">
            {t("description")}
          </p>
        </div>

        <div className="w-full max-w-[345px] md:max-w-[720px] lg:max-w-[900px] flex flex-col gap-8 items-start">
  
          <section aria-labelledby="weather-cancellation-title" className={`${BLOCK} w-full md:text-left`}>
            <h3 id="weather-cancellation-title" className="italic">{t("companyCancellation.title")}</h3>
            <p>{t("companyCancellation.description")}</p>
          </section>

          <section aria-labelledby="customer-cancellation-title" className="flex w-full flex-col gap-6 rounded-2xl border border-secondary/30 bg-background/20 p-5 md:p-8">
            <header className="flex flex-col gap-3">
              <h3 id="customer-cancellation-title" className="font-poppins text-xl font-semibold tracking-normal md:text-2xl">
                {t("customerCancellation.title")}
              </h3>
              <p className="text-sm leading-relaxed">{t("customerCancellation.intro")}</p>
            </header>

            {(["72plus", "24to72", "24less"] as const).map((key, index) => (
              <div key={key} className="w-full">
                <div className={`${BLOCK} w-full`}>
                  <h4 className="font-libre-baskerville text-xl font-normal normal-case italic tracking-tight md:text-2xl">
                    {t(`customerCancellation.${key}.label`)}
                  </h4>
                  <p>{t(`customerCancellation.${key}.description`)}</p>
                </div>
                {index < 2 && <div className={`${DIVIDER} mt-6`} />}
              </div>
            ))}

            <div className="flex w-full flex-col gap-4 border-t border-secondary pt-6">
              <p className="text-sm leading-relaxed">{policy("changesNote")}</p>
              <p className="text-sm leading-relaxed">{policy("customerNote")}</p>
            </div>
          </section>

          <Link
            href="/legal/cancellation"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-secondary underline underline-offset-4 hover:opacity-80"
          >
            {t("policyLink")}
            <ArrowRight size={18} className="shrink-0" aria-hidden="true" />
          </Link>

        </div>
      </div>
    </section>
  );
}
