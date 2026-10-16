import { CloudinaryImage } from "@/components/CloudinaryImage";
import { ReservationLink } from "@/components/booking/reservation-link";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";
import {
  PRODUCT_PRICING,
  getPriceDisplay,
  getProductName,
  type ProductSlug,
} from "@/lib/commercial-config";
import { Link } from "@/i18n/routing";
import {
  TRIPADVISOR_PROFILE_URL,
  TRIPADVISOR_RATING,
  TRIPADVISOR_REVIEW_COUNT,
} from "@/lib/tripadvisor-reviews";
import { cn } from "@/lib/utils";

type FlightId = ProductSlug;

const CATALOG_FLIGHTS = [
  "transport",
  "classic",
  "journey",
  "celebration",
  "private",
  "charter",
  "vip",
] as const satisfies readonly FlightId[];

const CARD_IMAGES: Record<(typeof CATALOG_FLIGHTS)[number], string> = {
  transport: IMAGES.product.gallery.transport[0],
  classic: IMAGES.product.gallery.classic[0],
  journey: IMAGES.product.gallery.journey[0],
  celebration: IMAGES.product.gallery.celebration[0],
  private: IMAGES.product.gallery.private[0],
  charter: IMAGES.product.gallery.charter[0],
  vip: IMAGES.product.gallery.vip[0],
};

const IMAGE_POSITION: Partial<Record<FlightId, string>> = {
  transport: "object-[center_48%]",
  classic: "object-[center_46%]",
  journey: "object-center",
  celebration: "object-center",
  private: "object-center",
  charter: "object-center",
  vip: "object-[center_46%]",
};

const CARD_CATEGORY: Record<(typeof CATALOG_FLIGHTS)[number], string> = {
  transport: "complete",
  classic: "shared",
  journey: "complete",
  celebration: "celebration",
  private: "private",
  charter: "vip",
  vip: "vip",
};

export async function FlightCardsSection() {
  const [t, locale] = await Promise.all([
    getTranslations("flightExperiences.cards"),
    getLocale(),
  ]);

  return (
    <section
      id="flight-options"
      className="relative scroll-mt-28 overflow-hidden bg-[#f2f5f6] py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(116,150,165,0.22),transparent_65%)]"
        aria-hidden="true"
      />

      <header className="relative mx-auto max-w-4xl px-6 text-center">
        <h4 className="mb-4 text-foreground">{t("subtitle")}</h4>
        <h2 className="mb-5 whitespace-pre-line text-foreground">{t("title")}</h2>
        <p className="mx-auto max-w-3xl text-foreground/75">{t("description")}</p>
      </header>

      <nav
        aria-label={t("browseByIntent")}
        className="relative mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-2 px-6"
      >
        {(["complete", "shared", "celebration", "privateVip"] as const).map((intent) => (
          <a
            key={intent}
            href={`#catalog-${intent === "privateVip" ? "private-vip" : intent}`}
            className="rounded-full border border-secondary/12 bg-background/85 px-4 py-2 text-sm font-bold text-secondary shadow-sm backdrop-blur transition-colors hover:border-secondary hover:bg-secondary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t(`intents.${intent}`)}
          </a>
        ))}
      </nav>

      <div className="relative mx-auto mt-14 grid max-w-330 grid-cols-1 gap-6 px-4 md:px-8 lg:grid-cols-2 lg:gap-8">
        {CATALOG_FLIGHTS.map((flightId) => (
          <FlightCard
            key={flightId}
            id={flightId}
            t={t}
            locale={locale}
            featured={flightId === "transport"}
          />
        ))}
      </div>
    </section>
  );
}

function FlightCard({
  id,
  t,
  locale,
  featured = false,
}: {
  id: (typeof CATALOG_FLIGHTS)[number];
  t: Awaited<ReturnType<typeof getTranslations>>;
  locale: string;
  featured?: boolean;
}) {
  const pricing = PRODUCT_PRICING[id]!;
  const priceDisplay = getPriceDisplay(pricing, locale);
  const features = getFeatures(t(`includes.${id}`));
  const intentId = getIntentId(id);

  return (
    <article
      id={intentId}
      className={cn(
        "group relative flex scroll-mt-36 flex-col overflow-hidden rounded-[1.75rem] border border-secondary/10 bg-background shadow-[0_20px_65px_rgba(3,48,59,0.10)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(3,48,59,0.16)]",
        featured && "lg:col-span-2 lg:grid lg:grid-cols-[1.18fr_0.82fr]",
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden bg-secondary/10",
          featured && "lg:aspect-auto lg:min-h-132",
        )}
      >
        <CloudinaryImage
          publicId={CARD_IMAGES[id]}
          alt={getProductName(id, locale)}
          fill
          sizes={featured ? "(max-width: 1023px) 100vw, 760px" : "(max-width: 1023px) 100vw, 620px"}
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]",
            IMAGE_POSITION[id],
          )}
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-secondary/85 via-secondary/10 via-55% to-transparent" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5 md:p-7">
          <span className="rounded-full border border-white/20 bg-secondary/75 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-background backdrop-blur-md">
            {t(`categories.${CARD_CATEGORY[id]}`)}
          </span>
          {featured && (
            <span className="rounded-full bg-primary px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-secondary shadow-sm">
              {t("recommended")}
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-background md:p-7">
          <h3 className="max-w-2xl font-libre-baskerville text-[clamp(1.55rem,3vw,2.35rem)] leading-tight tracking-[-0.035em]">
            {getProductName(id, locale)}
          </h3>
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col p-6 md:p-8", featured && "lg:justify-center lg:p-10")}>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary/45">
          {t("idealFor")}
        </p>
        <p className="mt-2 text-[1rem] leading-relaxed text-secondary/80">
          {stripIdealPrefix(t(`subtitles.${id}`))}
        </p>

        <div className="my-6 h-px bg-secondary/10" />

        <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary/45">
          {t("keyIncludes")}
        </p>
        <ul className="mt-3 grid gap-2.5 text-sm font-medium text-secondary/75">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-secondary/50">
                {priceDisplay.unitLabel}
              </p>
              <strong className="mt-1 block text-[clamp(1.2rem,2vw,1.65rem)] text-secondary">
                {priceDisplay.summary}
              </strong>
              {priceDisplay.note && <p className="mt-2 max-w-sm text-xs text-secondary/60">{priceDisplay.note}</p>}
            </div>
            <Button variant="primary" size="sm" asChild>
              <ReservationLink slug={id} locale={locale} />
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-secondary/10 pt-5">
            <a
              href={TRIPADVISOR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-1.5 text-xs font-semibold text-secondary/60 transition-opacity hover:opacity-70"
              aria-label={`Tripadvisor ${TRIPADVISOR_RATING} / 5`}
            >
              <span className="text-primary" aria-hidden="true">★</span>
              <span>{TRIPADVISOR_RATING} · {t("tripadvisorReviews", { count: TRIPADVISOR_REVIEW_COUNT })}</span>
            </a>
            <Link
              href={`/product/${id}`}
              scroll
              className="font-bold text-secondary underline decoration-current underline-offset-4 transition-opacity hover:opacity-70"
            >
              {t("viewDetails")}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function getFeatures(includes: string) {
  const content = includes.includes(":") ? includes.split(":").slice(1).join(":") : includes;
  return content
    .replace(/\.$/, "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function stripIdealPrefix(text: string) {
  const value = text.replace(/^Ideal (for|para):?\s*/i, "");
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getIntentId(id: (typeof CATALOG_FLIGHTS)[number]) {
  if (id === "transport") return "catalog-complete";
  if (id === "classic") return "catalog-shared";
  if (id === "celebration") return "catalog-celebration";
  if (id === "private") return "catalog-private-vip";
  return undefined;
}
