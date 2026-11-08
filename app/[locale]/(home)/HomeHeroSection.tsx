import { ArrowDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CameronBalloonsLogo } from "@/components/CameronBalloonsLogo";
import { HomeHeroSlideshow } from "@/components/HomeHeroSlideshow";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export async function HomeHeroSection() {
  const t = await getTranslations("herosection");

  return (
    <section className="home-hero bg-secondary text-background">
      <div className="home-hero-layout">
        <div className="home-hero-photo relative">
          <HomeHeroSlideshow />
        </div>
        <div className="home-hero-intro">
          <svg viewBox="0 0 100 24" aria-hidden="true" className="hero-stars mb-3 w-20 fill-current">
            {[8, 3, 0, 3, 8].map((y, i) => (
              <path key={i} transform={`translate(${i * 21} ${y})`}
                d="m8 0 2.3 5 5.5.7-4 3.9 1 5.5L8 12.5l-4.8 2.6 1-5.5-4-3.9L5.7 5Z" />
            ))}
          </svg>
          <h1 className="hero-enter font-poppins font-bold text-balance">{t("h1")}</h1>
          <p className="hero-enter hero-follow mt-3 font-libre-baskerville italic leading-snug">
            {t("tagline")} <span>{t("morning")}</span>
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/flight-experiences">{t("ctaPrimary")}</Link>
            </Button>
            <a href="#flight-experiences" aria-label={t("explorePackages")}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2">
              <ArrowDown size={19} aria-hidden="true" />
            </a>
          </div>
          <p className="mt-2 text-sm text-background/80">{t("ctaSecondary")}</p>
        </div>
        <div className="home-hero-foot">
          <p className="max-w-lg text-sm leading-relaxed text-background/85">{t("paragraph")}</p>
          <div className="flex max-w-md items-center gap-3">
            <CameronBalloonsLogo className="w-[68px] sm:w-[78px]" />
            <p className="font-libre-baskerville text-sm italic leading-snug text-background/85">
              <span className="lg:hidden">{t("aircraftOrigin")}</span>
              <span className="hidden lg:inline">{t("poweredBy")}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
