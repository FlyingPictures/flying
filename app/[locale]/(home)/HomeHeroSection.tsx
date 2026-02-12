"use client";

import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/images";

const TEXT_WRAP = "whitespace-pre-line";
const NAV_OFFSET = "calc(var(--navbar-height, 4.5rem) + 2rem)";

export function HomeHeroSection() {
  const t = useTranslations("herosection");

  return (
    <section className="relative h-[95vh] lg:h-screen overflow-hidden pt-[4.5rem] lg:pt-0">
      <div className="absolute inset-0 -z-10 flex justify-center">
        <CloudinaryImage publicId={IMAGES.homeHero.background} alt="Hero Background" fill priority className="h-full w-auto object-contain object-top" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute inset-0 flex items-end justify-center px-[clamp(0.75rem,5vw,1.5rem)] text-center">
        <div className="w-full max-w-[1024px] flex flex-col items-center gap-4 sm:gap-6 " style={{ paddingTop: NAV_OFFSET, maxHeight: `calc(100vh - ${NAV_OFFSET})` }}>
          <CloudinaryImage publicId={IMAGES.homeHero.stars} alt="5 Stars" className="w-40 h-auto object-contain mb-2" />

          <h1 className={`title hero ${TEXT_WRAP}`}>{t("h1")}</h1>

          <h3 className={`decorative hero ${TEXT_WRAP}`}>{t("h3")}</h3>

          <p className={`paragraph hero ${TEXT_WRAP}`}>{t("paragraph")}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button variant="outline" size="sm">{t("ctaPrimary")}</Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-[color:var(--surface)]">{t("ctaSecondary")}</Button>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <CloudinaryImage publicId={IMAGES.homeHero.cameronLogo} alt="Cameron Logo"  className="w-16 object-contain" />
            <h5 className={`powered hero ${TEXT_WRAP}`}>{t("poweredBy")}</h5>
          </div>

          <div className="w-full mt-3 flex items-center justify-center gap-x-[clamp(0.5rem,3vw,0.75rem)] sm:overflow-x-auto sm:snap-x sm:snap-mandatory lg:flex-wrap mb-10">
            {IMAGES.brandLogos.map((logo) => (
              <div key={logo.publicId} className="flex-none sm:snap-center">
                <CloudinaryImage publicId={logo.publicId} alt={logo.alt}  className="h-[clamp(3.5rem,16vw,5rem)] sm:h-[clamp(4.5rem,10vw,6.5rem)] lg:h-[clamp(6rem,8vw,9.375rem)] w-auto object-contain opacity-80 transition-opacity hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}