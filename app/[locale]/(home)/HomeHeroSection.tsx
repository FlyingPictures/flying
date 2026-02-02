"use client";

import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const BRAND_LOGOS = [
  { publicId: "v1769092252/bbclogo150150_kqylht", alt: "BBC" },
  { publicId: "v1769694287/columbialogo_birqjy", alt: "Columbia" },
  { publicId: "v1769092252/Discoveryogo150150_qrubrn", alt: "Discovery" },
  { publicId: "v1769092252/natgeoogo150150_leob98", alt: "National Geographic" },
  { publicId: "v1769092252/redbullogo150150_z0uxsl", alt: "Red Bull" },
  { publicId: "v1769092252/telcelogo150150_wslrln", alt: "Telcel" },
] as const;

const TEXT_WRAP = "whitespace-pre-line";
const NAV_OFFSET = "calc(var(--navbar-height, 4.5rem) + 2rem)";

export function HomeHeroSection() {
  const t = useTranslations("herosection");

  return (
    <section className="relative h-[95vh] lg:h-screen overflow-hidden pt-[4.5rem] lg:pt-0">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <CloudinaryImage
          publicId="v1769270545/hero1_rszxmn"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end justify-center px-[clamp(0.75rem,5vw,1.5rem)] text-center">
        <div
          className="
            w-full
            max-w-[1024px]
            flex
            flex-col
            items-center
            gap-2
            sm:gap-4
          "
          style={{
            paddingTop: NAV_OFFSET,
            maxHeight: `calc(100vh - ${NAV_OFFSET})`,
          }}
        >
          {/* Stars */}
          <CloudinaryImage
            publicId="v1769270546/5_stars_xbtijo"
            alt="5 Stars"
            width={161}
            height={43}
            className="w-40 h-auto object-contain mb-2"
          />

          {/* Title */}
          <h1 className={`title hero ${TEXT_WRAP}`}>
            {t("h1")}
          </h1>

          {/* Decorative */}
          <h3 className={`decorative hero ${TEXT_WRAP}`}>
            {t("h3")}
          </h3>

          {/* Paragraph */}
          <p className={`paragraph hero ${TEXT_WRAP}`}>
            {t("paragraph")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button variant="outline" size="sm">
              {t("ctaPrimary")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex text-[color:var(--surface)]"
            >
              {t("ctaSecondary")}
            </Button>
          </div>

          {/* Powered by */}
          <div className="flex items-center gap-4 mt-4">
            <CloudinaryImage
              publicId="v1769096588/b5884911c3141d5efecb262d7371f5c738f8aff1_o9yrql"
              alt="Cameron Logo"
              width={70}
              height={30}
              className="w-16 object-contain"
            />
            <h5 className={`powered hero ${TEXT_WRAP}`}>
              {t("poweredBy")}
            </h5>
          </div>

          {/* Authority bar — SIN SCROLL EN MOBILE */}
          <div
            className="
              w-full
              mt-3
              flex
              items-center
              justify-center
              gap-x-[clamp(0.5rem,3vw,0.75rem)]
              sm:overflow-x-auto
              sm:snap-x sm:snap-mandatory
              lg:flex-wrap
            "
          >
            {BRAND_LOGOS.map((logo) => (
              <div key={logo.publicId} className="flex-none sm:snap-center">
                <CloudinaryImage
                  publicId={logo.publicId}
                  alt={logo.alt}
                  width={150}
                  height={150}
                  className="
                    h-[clamp(3.5rem,16vw,5rem)]
                    sm:h-[clamp(4.5rem,10vw,6.5rem)]
                    lg:h-[clamp(6rem,8vw,9.375rem)]
                    w-auto
                    object-contain
                    opacity-80
                    transition-opacity
                    hover:opacity-100
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
