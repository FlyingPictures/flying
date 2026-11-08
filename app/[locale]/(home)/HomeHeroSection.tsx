import { CameronBalloonsLogo } from "@/components/CameronBalloonsLogo";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { HomeHeroSlideshow } from "@/components/HomeHeroSlideshow";
import { Link } from "@/i18n/routing";

export async function HomeHeroSection() {
  const t = await getTranslations("herosection");

  return (
    <section className="home-hero flex flex-col bg-secondary text-background">
      <div className="home-hero-photo relative isolate flex flex-1 flex-col justify-end overflow-hidden px-6 pt-36 sm:items-center sm:text-center lg:pt-42">
        <HomeHeroSlideshow />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/35 to-transparent" />
        <div className="relative flex w-full max-w-5xl flex-col items-start sm:items-center">
          <svg viewBox="0 0 100 24" aria-hidden="true" className="hero-stars mb-3 w-24 fill-current sm:w-28">
            {[8, 3, 0, 3, 8].map((y, i) => (
              <path key={i} transform={`translate(${i * 21} ${y})`}
                d="m8 0 2.3 5 5.5.7-4 3.9 1 5.5L8 12.5l-4.8 2.6 1-5.5-4-3.9L5.7 5Z" />
            ))}
          </svg>
          <h1 className="title hero hero-enter max-sm:text-left sm:whitespace-pre-line">{t("h1")}</h1>
          <p className="decorative hero hero-enter hero-follow mt-3! max-sm:text-left">
            {t("tagline")} <span className="hidden sm:block">{t("morning")}</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/flight-experiences">{t("ctaPrimary")}</Link>
            </Button>
            <span className="hidden text-sm font-bold sm:inline">{t("ctaSecondary")}</span>
          </div>
        </div>
      </div>
      <div className="home-hero-foot mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:gap-8">
        <p className="home-hero-note hidden max-w-lg text-[0.9375rem] lg:block leading-relaxed text-background/85">{t("paragraph")}</p>
        <div className="flex max-w-sm items-center gap-3">
          <CameronBalloonsLogo className="w-[68px] sm:w-[78px]" />
          <p className="font-libre-baskerville text-sm italic leading-snug text-background/85">{t("aircraftOrigin")}</p>
        </div>
        <a href="#flight-experiences" aria-label={t("explorePackages")}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2">
          <ArrowDown size={19} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
