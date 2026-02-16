import { getTranslations } from "next-intl/server";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { IMAGES } from "@/lib/images";

export async function WhyFlightWhitUs() {
  const t = await getTranslations("whyChoose");

  const reasons = t.raw("reasons") as Array<{ title: string; description: string }>;
  const titleWidths = ["302px", "291px", "328px"];

  return (
    <section className="relative w-full bg-foreground overflow-hidden border-0 outline-none ring-0 shadow-none h-[2304px] lg:h-[1655px]">
      <CloudinaryImage publicId={IMAGES.home.whyChoose.background} alt="" fill sizes="100vw" className="object-cover object-fill lg:object-cover object-[center_top]" priority />

      <div className="absolute left-1/2 -translate-x-1/2 w-[clamp(345px,90vw,1240px)] px-6 lg:px-0 bottom-0 lg:bottom-[224px] lg:h-[clamp(520px,60vw,785px)] pb-[clamp(24px,6vw,40px)] lg:pb-0">
        <div className="flex flex-col lg:flex-row w-full items-start">
          <div className="hidden lg:block w-full lg:w-1/2">
            <h2 className="text-background !text-left">{t("title")}</h2>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            <h4 className="text-background font-bold text-[14px] uppercase tracking-widest text-center lg:text-left">{t("takeAway")}</h4>
            <h2 className="text-background text-left lg:hidden mb-6">{t("title")}</h2>
            <p className="text-background px-6 lg:px-0">{t("await")}</p>
          </div>
        </div>

        <div className="mt-[287px] lg:mt-16 flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center">
          {reasons.slice(0, 3).map((reason, index) => (
            <div key={index} className="flex flex-col items-center lg:items-start w-[clamp(345px,90vw,374px)] h-[513px]">
              <div className="relative w-full h-[437px] overflow-hidden rounded-card">
                <CloudinaryImage publicId={IMAGES.home.whyChoose.cards[index]} alt={reason.title} fill sizes="(max-width: 768px) 90vw, 374px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-popover-foreground/73 opacity-40" />
                <div className="absolute bottom-8 left-[31px] flex flex-col" style={{ maxWidth: titleWidths[index] }}>
                  {index === 0 && (
                    <div className="relative mb-[14px] w-[66px] h-[28px]">
                      <CloudinaryImage publicId={IMAGES.home.whyChoose.cameronLogo} alt="Cameron Balloons UK" width={300} height={150} className="object-contain" />
                    </div>
                  )}
                  <h3 className="text-card-title text-left text-background">{reason.title}</h3>
                </div>
              </div>

              <p className="text-card-body text-center lg:text-left text-background opacity-90 mt-4">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
