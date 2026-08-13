import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";
import {
  PRODUCT_PRICING,
  formatMxn,
} from "@/lib/commercial-config";
import { SITE_CONTACT } from "@/lib/site-config";
import {
  TRIPADVISOR_RATING,
  TRIPADVISOR_REVIEW_COUNT,
} from "@/lib/tripadvisor-reviews";

export async function FlightHero() {
  const t = await getTranslations("flightExperiences.hero");
  const entryPrice = PRODUCT_PRICING.classic!.primary;

  return (
    <section className="relative flex min-h-[780px] overflow-hidden bg-secondary pb-14 pt-40 text-background md:min-h-[720px] md:pt-44 lg:min-h-[820px] lg:items-center lg:pb-16 lg:pt-44">
      <div className="absolute inset-0">
        <CloudinaryImage
          publicId={IMAGES.flightExperiences.hero.background}
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-[center_45%]"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-secondary/10" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,48,59,0.88)_0%,rgba(3,48,59,0.67)_43%,rgba(3,48,59,0.14)_78%,rgba(3,48,59,0.04)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,48,59,0.58)_0%,transparent_44%,rgba(3,48,59,0.04)_100%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-330 gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end lg:gap-14">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-background/25 bg-secondary/35 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.17em] text-background backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            {t("eyebrow")}
          </div>

          <h1 className="mt-5 max-w-4xl font-poppins text-[clamp(2.45rem,5.15vw,4.35rem)] font-semibold leading-[1.01] tracking-[-0.05em] text-background drop-shadow-[0_3px_20px_rgba(0,0,0,0.34)]">
            {t("conversionTitleLead")} {" "}
            <em className="font-libre-baskerville font-normal italic tracking-[-0.055em]">
              {t("conversionTitleAccent")}
            </em>{" "}
            {t("conversionTitleTail")}
          </h1>

          <p className="mt-4 max-w-2xl text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-background/82">
            {t("conversionDescription")}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <strong className="text-xl text-background md:text-2xl">
              {t("experiencesFrom", { price: formatMxn(entryPrice) })}
            </strong>
            <span className="hidden h-5 w-px bg-background/25 sm:block" aria-hidden="true" />
            <span className="text-sm font-semibold text-background/65">{t("secureBooking")}</span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" size="lg" className="px-8" asChild>
              <a href="#catalog-complete">{t("ctaPrimary")}</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border border-background/35 bg-background/10 px-8 text-background shadow-none backdrop-blur-md hover:bg-background hover:text-secondary"
              asChild
            >
              <a href={SITE_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                <svg aria-hidden="true" viewBox="0 0 256 256" width="20" height="20" fill="currentColor">
                  <path d="M187.58 144.84l-32-16a8 8 0 0 0-8 .5l-14.69 9.8a40.55 40.55 0 0 1-16-16l9.8-14.69a8 8 0 0 0 .5-8l-16-32A8 8 0 0 0 104 64a40 40 0 0 0-40 40 88.1 88.1 0 0 0 88 88 40 40 0 0 0 40-40 8 8 0 0 0-4.42-7.16ZM152 176a72.08 72.08 0 0 1-72-72 24 24 0 0 1 19.29-23.54l11.48 23-9.77 14.54a8 8 0 0 0-.73 7.51 56.47 56.47 0 0 0 30.15 30.15A8 8 0 0 0 138 155l14.61-9.74 23 11.48A24 24 0 0 1 152 176Zm-24-152A104 104 0 0 0 36.18 176.88L24.83 210.93a16 16 0 0 0 20.24 20.24l34.05-11.35A104 104 0 1 0 128 24Zm0 192a87.87 87.87 0 0 1-44.06-11.81 8 8 0 0 0-6.54-.67L40 216l12.47-37.4a8 8 0 0 0-.66-6.54A88 88 0 1 1 128 216Z" />
                </svg>
                {t("ctaSecondary")}
              </a>
            </Button>
          </div>

          <div className="mt-6 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 border-t border-background/20 pt-5 text-sm sm:grid-cols-3">
            <div>
              <strong className="block text-base text-background">★ {TRIPADVISOR_RATING}</strong>
              <span className="text-background/60">{t("reviews", { count: TRIPADVISOR_REVIEW_COUNT })}</span>
            </div>
            <div>
              <strong className="block text-base text-background">{t("certifiedTitle")}</strong>
              <span className="text-background/60">{t("certifiedDescription")}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <strong className="block text-base text-background">{t("insuredTitle")}</strong>
              <span className="text-background/60">{t("insuredDescription")}</span>
            </div>
          </div>
        </div>

        <aside className="hidden overflow-hidden rounded-[1.75rem] border border-background/20 bg-background/92 text-secondary shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:block">
          <div className="relative aspect-[16/9] overflow-hidden">
            <CloudinaryImage
              publicId={IMAGES.product.gallery.transport[0]}
              alt={t("recommendedImageAlt")}
              fill
              sizes="390px"
              className="h-full w-full object-cover object-[center_48%]"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-secondary/70 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 rounded-full bg-primary px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-secondary">
              {t("recommended")}
            </span>
          </div>
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary/45">
              {t("firstVisit")}
            </p>
            <h2 className="mt-2 text-left font-libre-baskerville text-2xl font-normal leading-tight tracking-[-0.035em] text-secondary">
              {t("recommendedTitle")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-secondary/70">
              {t("recommendedDescription")}
            </p>
            <a
              href="#catalog-complete"
              className="mt-5 inline-flex font-bold text-secondary underline decoration-current underline-offset-4 transition-opacity hover:opacity-70"
            >
              {t("viewRecommended")}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
