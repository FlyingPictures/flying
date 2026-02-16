import { CloudinaryImage } from "@/components/CloudinaryImage";
import { IMAGES } from "@/lib/images";
import { getTranslations } from "next-intl/server";

export async function PlanFaq() {
  const t = await getTranslations("planYourVisit.dressTo");
  const tFaq = await getTranslations("planYourVisit.faq");

  const dress = ["onionStrategy", "footwear", "luggage"];

  const faq = [
    { cat: "aboutFlight", items: ["afraidHeights", "restrooms"] },
    { cat: "safetyLimits", items: ["childrenFly", "pregnantFly", "weightLimit"] },
    { cat: "bookingExtra", items: ["bringCamera", "breakfast"] },
  ];

  return (
    <section className="w-full min-h-[2400px] px-4 py-[clamp(4rem,8vw,8rem)] flex flex-col items-center" style={{ background: "linear-gradient(180deg, rgba(123,149,171,0) 0%, #7B95AB 11.17%, #9497AD 23.19%, #000000 44.67%)" }}>

      {/* HEADER */}
      <div className="flex flex-col items-center text-center gap-4 mb-[clamp(3rem,6vw,6rem)] max-w-[800px]">
        <h4>{t("label")}</h4>
        <h2 className="whitespace-pre-line leading-tight">{t("title")}</h2>
      </div>

      {/* CARDS */}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-10 w-full max-w-[1200px] mb-[clamp(4rem,10vw,10rem)]">
        {dress.map((key, i) => (
          <div key={key} className="flex flex-col items-center md:items-start w-full max-w-[368px]">
            <div className="relative w-full aspect-[345/192] md:aspect-[365/437] overflow-hidden">
              <CloudinaryImage publicId={IMAGES.plan.dressTo.cards[i]} alt={t(`items.${key}.title`)} fill className="object-cover rounded-[var(--radius)]" />
            </div>
            <div className="flex flex-col gap-4 mt-6 text-left">
              <h3 className="text-background"> {t(`items.${key}.title`)}</h3>
              <p className="text-background/80 text-sm leading-relaxed">{t(`items.${key}.description`)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ TITLE */}
      <h2 className="text-background text-center mb-[clamp(2.5rem,6vw,5rem)] whitespace-pre-line">
        {tFaq("title")}
      </h2>

      {/* FAQ */}
      <div className="flex flex-col gap-16 w-full max-w-[900px]">
        {faq.map((section) => (
          <div key={section.cat} className="flex flex-col gap-6">
            <h3 className="text-background italic md:text-left">
              {tFaq(`categories.${section.cat}`)}
            </h3>

            <div className="flex flex-col gap-4">
              {section.items.map((item, i) => (
                <details
                  key={item}
                  open={section.cat === "aboutFlight" && i === 0}
                  className="group rounded-[var(--radius)] border-2 border-background bg-transparent px-6 py-4 overflow-hidden transition-all duration-300"
                >
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="text-background text-base md:text-xl font-bold">
                      {tFaq(`items.${item}.question`)}
                    </span>
                    <span className="text-background text-2xl">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>

                  {tFaq(`items.${item}.answer`) && (
                    <p className="mt-4 text-background/70">
                      {tFaq(`items.${item}.answer`)}
                    </p>
                  )}
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
