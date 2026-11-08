import { CameronBalloonsLogo } from "@/components/CameronBalloonsLogo";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { HomeHeroSlideshow } from "@/components/HomeHeroSlideshow";
import { Link } from "@/i18n/routing";

export async function HomeHeroSection() {
  const t = await getTranslations("herosection");

  return (
    <section className="bg-secondary text-background">
      <div className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden px-6 pb-9 pt-[max(12rem,35svh)] sm:min-h-[95svh] sm:items-center sm:pb-12 sm:pt-44 sm:text-center">
        <HomeHeroSlideshow />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/35 to-transparent" />
        <div className="relative flex w-full max-w-5xl flex-col items-start sm:items-center">
          <svg viewBox="0 0 100 24" aria-hidden="true" className="hero-stars mb-4 w-24 fill-current sm:w-28">
            {[8, 3, 0, 3, 8].map((y, i) => (
              <path key={i} transform={`translate(${i * 21} ${y})`}
                d="m8 0 2.3 5 5.5.7-4 3.9 1 5.5L8 12.5l-4.8 2.6 1-5.5-4-3.9L5.7 5Z" />
            ))}
          </svg>
          <h1 className="title hero hero-enter max-sm:text-left sm:whitespace-pre-line">{t("h1")}</h1>
          <p className="decorative hero hero-enter hero-follow mt-3! max-sm:text-left">
            {t("tagline")} <span className="hidden sm:block">{t("morning")}</span>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/flight-experiences">{t("ctaPrimary")}</Link>
            </Button>
            <span className="hidden text-sm font-bold sm:inline">{t("ctaSecondary")}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6 pb-10 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:py-8">
        <p className="max-w-lg text-[0.9375rem] leading-relaxed text-background/85">{t("paragraph")}</p>
        <div className="flex max-w-sm items-center gap-3">
          <CameronBalloonsLogo className="w-[68px] sm:w-[78px]" />
          <p className="font-libre-baskerville text-sm italic leading-snug text-background/85">{t("poweredBy")}</p>
        </div>
      </div>
    </section>
  );
}
