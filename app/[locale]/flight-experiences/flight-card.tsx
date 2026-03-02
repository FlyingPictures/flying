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

const BOOKING_URLS: Record<FlightId, string> = {
  classic: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/Dz8p",
  journey: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/E7Ro",
  transport: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/lwxwj",
  open: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/Exzbg",
  proposal: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/YxVm",
  anniversary: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/Yx28",
  birthday: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/B8xN",
  vip: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/Exzbg",
  corporate: "https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/lwxwj",
}

export async function FlightCardsSection() {
  const t = await getTranslations("flightExperiences.cards");

  return (
    <section className="py-15 mb-20">
      <header className="text-center max-w-5xl mx-auto mb-12 lg:mb-24 px-6">
        <h4 className="text-foreground mb-4">{t("subtitle")}</h4>
        <h2 className="text-foreground whitespace-pre-line mb-4">
          {t("title")}
        </h2>
        <p className="text-foreground lg:whitespace-pre-line">
          {t("description")}
        </p>
      </header>

      <div className="max-w-360 mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-8 justify-items-center lg:justify-items-stretch">
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
    <div className="w-full max-w-150 bg-background overflow-hidden flex flex-col">
      <div className="relative w-full h-93 md:h-109 overflow-hidden rounded-(--radius)">
        <CloudinaryImage
          publicId={imageSrc}
          alt={id}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 768px) 345px, (max-width: 1024px) 48vw, 600px"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-secondary via-transparent to-secondary opacity-70" />

        <div className="absolute inset-0 flex flex-col items-center justify-between text-center p-10 text-background">
          <h3 className="font-libre-baskerville text-[clamp(22px,2vw,28px)] whitespace-pre-line">
            {t(`titles.${id}`)}
          </h3>

          <div className="flex flex-col items-center gap-4">
            <p className="text-[clamp(14px,1.5vw,18px)] font-medium lg:px-14">
              {t(`subtitles.${id}`)}
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <strong className="text-[clamp(16px,1.8vw,22px)]">
                {t(`prices.${id}`)}
              </strong>
              <Button variant="primary" size="sm" asChild>
                <a href={BOOKING_URLS[id]} target="_blank" rel="noopener noreferrer">
                  {t(`books.${id}`)}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col py-6 gap-3 lg:gap-5">
        <p>{t(`descriptions.${id}`)}</p>

        <span className="text-md text-muted-foreground font-medium">
          {t(`includes.${id}`)}
        </span>

        <div className="flex items-center gap-2 text-muted-foreground text-md font-medium">
          <span className="text-xl">★</span>
          <span>{t(`ratings.${id}`)}</span>
        </div>
      </div>
    </div>
  );
}
