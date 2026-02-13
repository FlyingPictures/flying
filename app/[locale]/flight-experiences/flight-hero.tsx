"use client";

import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/images";
import { WhatsappLogoIcon } from "@phosphor-icons/react";

const TEXT_WRAP = "whitespace-pre-line";
const NAV_OFFSET = "calc(var(--navbar-height, 4.5rem) + 2rem)";

export function FlightHero() {
  const t = useTranslations("flightExperiences.hero");

  return (
    <section className="relative h-[95vh] lg:h-screen overflow-hidden pt-[4.5rem] lg:pt-0">
      <div className="absolute inset-0 -z-10 flex justify-center">
        <CloudinaryImage
          publicId={IMAGES.flightExperiences.hero.background}
          alt="Hero Background"
          fill
          priority
          className="h-full w-auto object-contain object-top"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute inset-0 flex items-end justify-center px-[clamp(0.75rem,5vw,1.5rem)] text-center">
        <div
          className="w-full max-w-[1024px] flex flex-col items-center gap-4 sm:gap-6"
          style={{
            paddingTop: NAV_OFFSET,
            maxHeight: `calc(100vh - ${NAV_OFFSET})`
          }}
        >
          <h1 className={`title hero ${TEXT_WRAP}`}>
            {t("pageTitle")}
          </h1>

          <h3 className={`decorative hero ${TEXT_WRAP}`}>
            {t("experiencesList")}
          </h3>

          <p className={`paragraph hero ${TEXT_WRAP}`}>
            {t("pageDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button variant="outline" size="sm" className="px-10">
              {t("ctaFlightPrimary")}
            </Button>
          </div>

          <div className="mt-4">
          <Button variant="ghost"size="md" className="flex items-center gap-2 text-background">
            <WhatsappLogoIcon size={24} weight="regular" />
            {t("talkFlight")}
          </Button>
        </div>

          <div className="w-full mt-6 mb-30 flex justify-center mt-20">
            <CloudinaryImage
              publicId="trustbadges1_2x_1_1_pq9pzn"
              alt="Award Badge"
              width={542}
              height={200}
              className="w-[257px] lg:w-[542px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
