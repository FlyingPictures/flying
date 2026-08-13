import { getTranslations } from "next-intl/server";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { IMAGES } from "@/lib/images";

type Reason = { title: string; description: string }

type CardProps = {
  publicId: string
  reason: Reason
  index: number
  titleWidth: string
}

const Card = ({ publicId, reason, index, titleWidth }: CardProps) => (
  <article className="flex min-w-0 w-full flex-col items-start">
    <div className="relative w-full aspect-[374/437] overflow-hidden rounded-(--radius) shrink-0">
      <CloudinaryImage publicId={publicId} alt={reason.title} fill sizes="(max-width: 767px) 90vw, (max-width: 1199px) 30vw, 374px" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-popover-foreground/73 opacity-40" />
      <div className="absolute inset-x-5 bottom-5 md:inset-x-4 md:bottom-4 xl:left-8 xl:right-auto xl:bottom-8 flex flex-col" style={{ maxWidth: titleWidth }}>
        {index === 0 && (
          <div className="relative mb-4 w-17 h-7">
            <CloudinaryImage publicId={IMAGES.home.whyChoose.cameronLogo} alt="Cameron Balloons UK" width={300} height={150} className="object-contain" />
          </div>
        )}
        <h3 className="text-card-title text-left">{reason.title}</h3>
      </div>
    </div>
    <p className="text-left mt-4 whitespace-pre-line text-background/85">{reason.description}</p>
  </article>
)

export async function WhyFlightWhitUs() {
  const t = await getTranslations("whyChoose");
  const reasons = t.raw("reasons") as Reason[];
  const titleWidths = ["302px", "291px", "328px"];

  return (
    <section className="relative w-full overflow-hidden bg-black text-background">
      <div className="mx-auto w-[clamp(345px,90vw,1240px)] py-20 xl:py-32">
        <div className="flex flex-col lg:flex-row w-full items-start">
          <div className="hidden lg:block w-full lg:w-1/2">
            <h2 className="text-left!">{t("title")}</h2>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4>{t("takeAway")}</h4>
            <h2 className="lg:hidden mt-2 mb-6">{t("title")}</h2>
            <p className="max-w-3xl py-4 lg:py-6">{t("await")}</p>
          </div>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-y-14 gap-x-5 lg:gap-x-8 xl:gap-x-12 items-start">
          {reasons.slice(0, 3).map((reason, index) => (<Card key={index} publicId={IMAGES.home.whyChoose.cards[index]} reason={reason} index={index} titleWidth={titleWidths[index]}/> ))}
        </div>
      </div>
    </section>
  );
}
