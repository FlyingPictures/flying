import { CloudinaryImage } from "@/components/CloudinaryImage";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";
import { Button } from "@/components/ui/button";

export async function PlanGettingHere() {
  const t = await getTranslations("planYourVisit.gettingHere");

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h4 className="h4">{t("label")}</h4>
          <h2 className="h2 whitespace-pre-line">{t("title")}</h2>
        </div>

        <div className="flex flex-col items-center gap-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:justify-start lg:items-stretch">

          {/* Shuttle */}
          <div className="flex flex-col rounded-[var(--radius)] overflow-hidden lg:justify-self-end w-full max-w-[clamp(345px,90vw,582px)]">
            <div className="relative w-full h-[clamp(300px,45vw,432px)] flex flex-col justify-end rounded-[var(--radius)] overflow-hidden">
              <CloudinaryImage
                publicId={IMAGES.plan.gettingHere.shuttle}
                alt={t("shuttle.cardTitle")}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 p-6 sm:p-8 text-white">
                <h3 className="text-card-title mb-2">{t("shuttle.cardTitle")}</h3>
                <p>{t("shuttle.cardBody")}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3 text-sm text-gray-600">
              <div className="flex gap-2">
                <svg className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="whitespace-pre-line">{t("shuttle.pickupTime")}\n{t("shuttle.pickupNote")}</span>
              </div>
              <div className="flex gap-2">
                <svg className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>{t("shuttle.perks")}</span>
              </div>
            </div>
          </div>

          {/* Self Drive */}
          <div className="flex flex-col rounded-[var(--radius)] overflow-hidden lg:justify-self-start w-full max-w-[clamp(345px,90vw,582px)]">
            <div className="relative w-full h-[clamp(300px,45vw,432px)] flex flex-col justify-end rounded-[var(--radius)] overflow-hidden">
              <CloudinaryImage
                publicId={IMAGES.plan.gettingHere.selfDrive}
                alt={t("selfDrive.cardTitle")}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 p-6 sm:p-8 text-white">
                <h3 className="text-card-title mb-2">{t("selfDrive.cardTitle")}</h3>
                <p>{t("selfDrive.cardBody")}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3 text-sm text-gray-600">
              <div className="flex gap-2">
                <svg className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>{t("selfDrive.parking")}</span>
              </div>

              <div className="flex gap-3">
                <Button
                  asChild
                  className="w-[clamp(40%,45%,50%)] h-[clamp(2rem,2.5vw,2.5rem)] text-[clamp(0.65rem,1vw,0.75rem)] rounded-full flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white"
                >
                  <a href="https://maps.google.com">{t("selfDrive.openMaps")}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-[clamp(40%,45%,50%)] h-[clamp(2rem,2.5vw,2.5rem)] text-[clamp(0.65rem,1vw,0.75rem)] rounded-full flex items-center justify-center border-2 border-secondary text-secondary hover:bg-secondary/10"
                >
                  <a href="https://waze.com">{t("selfDrive.openWaze")}</a>
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">{t("selfDrive.disclaimer")}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
