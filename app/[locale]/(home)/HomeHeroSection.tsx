import { ArrowDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CameronBalloonsLogo } from "@/components/CameronBalloonsLogo";
import { HomeHeroSlideshow } from "@/components/HomeHeroSlideshow";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export async function HomeHeroSection() {
  const t = await getTranslations("herosection");

  return (
    <section className="home-hero relative isolate flex flex-col justify-end overflow-hidden bg-secondary text-background">
      <div className="home-hero-scene absolute inset-x-0 bottom-0 -z-10">
        <HomeHeroSlideshow />
        <div aria-hidden="true" className="home-hero-shade absolute inset-0" />
      </div>
      <div className="home-hero-intro px-5 md:text-center">
        <svg viewBox="0 0 100 24" aria-hidden="true" className="hero-stars mb-2 w-20 fill-current md:mx-auto md:w-24">
          {[8, 3, 0, 3, 8].map((y, i) => (
            <path key={i} transform={`translate(${i * 21} ${y})`}
              d="m8 0 2.3 5 5.5.7-4 3.9 1 5.5L8 12.5l-4.8 2.6 1-5.5-4-3.9L5.7 5Z" />
          ))}
        </svg>
        <h1 className="hero-enter mx-auto max-w-4xl font-poppins font-bold text-balance md:whitespace-pre-line">{t("h1")}</h1>
        <p className="hero-enter hero-follow mt-2 font-libre-baskerville italic leading-snug">
          {t("tagline")} <span>{t("morning")}</span>
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 md:justify-center">
          <Button variant="outline" className="max-sm:px-5 max-sm:text-sm" asChild>
            <Link href="/flight-experiences">{t("ctaPrimary")}</Link>
          </Button>
          <span className="order-last basis-full text-sm md:order-none md:basis-auto">{t("ctaSecondary")}</span>
          <a href="#flight-experiences" aria-label={t("explorePackages")}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2">
            <ArrowDown size={19} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="home-hero-foot mx-auto grid w-full max-w-5xl items-center gap-3 px-5 pb-5 pt-4 md:grid-cols-2 md:gap-10 md:py-5">
        <p className="max-w-lg text-sm leading-relaxed text-background/90">{t("paragraph")}</p>
        <div className="flex max-w-md items-center gap-3 md:justify-self-end">
          <CameronBalloonsLogo className="w-[68px] sm:w-[78px]" />
          <p className="font-libre-baskerville text-sm italic leading-snug text-background/90">
            <span className="lg:hidden">{t("aircraftOrigin")}</span>
            <span className="hidden lg:inline">{t("poweredBy")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
