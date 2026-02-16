import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";

type FlightId =
  | "classic"
  | "journey"
  | "transport"
  | "open"
  | "proposal"
  | "anniversary"
  | "birthday"
  | "vip"
  | "corporate";

const FLIGHTS: FlightId[] = [
  "classic",
  "journey",
  "transport",
  "open",
  "proposal",
  "anniversary",
  "birthday",
  "vip",
  "corporate",
];

export async function FlightCardsSection() {
  const t = await getTranslations("flightExperiences.cards");

  return (
    <section className="py-15 mb-20">
      {/* HEADER GENERAL */}
      <header className="text-center max-w-[1024px] mx-auto mb-12 lg:mb-24 px-6">
        <h4 className="text-foreground mb-4">{t("subtitle")}</h4>
        <h2 className="text-foreground whitespace-pre-line mb-4">
          {t("title")}
        </h2>
        <p className="text-foreground lg:whitespace-pre-line">
          {t("description")}
        </p>
      </header>

      {/* GRID */}
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-6 justify-items-center lg:justify-items-stretch">
        {FLIGHTS.map((flightId, idx) => (
          <div
            key={flightId}
            className={idx % 2 === 0 ? "flex lg:justify-end" : "flex lg:justify-start"}
          >
            <FlightCard id={flightId} t={t} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================= */
/* CARD */
/* ============================= */

function FlightCard({
  id,
  t,
}: {
  id: FlightId;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  const imageSrc =
    IMAGES.flightExperiences.flights[
      id as keyof typeof IMAGES.flightExperiences.flights
    ];

  return (
    <div className="w-full max-w-[600px] bg-white overflow-hidden flex flex-col">
      {/* IMAGE + OVERLAY CONTENT */}
      <div className="relative w-full h-[373px] md:h-[437px] overflow-hidden rounded-[var(--radius)]">
        <CloudinaryImage
          publicId={imageSrc}
          alt={id}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 768px) 345px, (max-width: 1024px) 48vw, 600px"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary opacity-40" />

        <div className="absolute inset-0 flex flex-col items-center justify-between text-center p-10 text-background">
          <h3 className="font-libre-baskerville text-[clamp(22px,2vw,28px)] whitespace-pre-line">
            {t(`titles.${id}`)}
          </h3>

          <div className="flex flex-col items-center gap-4">
            <p className="text-[clamp(14px,1.5vw,18px)] font-medium lg:px-14">
              {t(`subtitles.${id}`)}
            </p>
            <div className="flex items-center gap-4">
              <strong className="text-[clamp(16px,1.8vw,22px)]">
                {t(`prices.${id}`)}
              </strong>
              <Button variant="primary" size="sm">
                {t(`books.${id}`)}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT BELOW IMAGE */}
      <div className="flex flex-col pt-6 gap-6">
        <p>{t(`descriptions.${id}`)}</p>

        <p className="text-[clamp(14px,1.5vw,18px)] text-[#03303BB3] font-medium">
          {t(`includes.${id}`)}
        </p>

        <div className="flex items-center gap-2 text-[#03303BB3] text-[clamp(14px,1.5vw,18px)] font-medium">
          <span className="text-3xl">★</span>
          <span>{t(`ratings.${id}`)}</span>
        </div>
      </div>
    </div>
  );
}
