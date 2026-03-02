import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"

function MapButtons({ t }: { t: (key: string) => string }) {
  return (
    <>
      <Button
        variant="secondary"
        className="w-1/2 h-10 text-xs rounded-full flex items-center justify-center"
        asChild
      >
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=19.6923323,-98.8244167"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("button-google")}
        </a>
      </Button>
      <a
        href="https://waze.com/ul?ll=19.6923323,-98.8244167&navigate=yes"
        target="_blank"
        rel="noopener noreferrer"
        className="w-1/2 h-10 text-xs rounded-full border border-secondary bg-background text-secondary font-semibold flex items-center justify-center transition hover:bg-secondary hover:text-background"
      >
        {t("button-waze")}
      </a>
    </>
  )
}

export async function LocationAndFAQ() {
  const t = await getTranslations("contact.locationFaq")

  const faqs = ["ask1", "ask2", "ask3"].map((key) => ({
    question: t(key),
    answer: t(`${key}-answer`),
  }))

  return (
    <section className="w-full min-w-86 flex flex-col items-center gap-[clamp(3rem,6vw,5rem)] py-[clamp(4rem,8vw,6rem)] px-[clamp(1rem,4vw,5rem)]">
      <div className="w-full max-w-227 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
          <div className="lg:w-[60%] flex flex-col gap-4 text-left">
            <h3 className="text-card-title">{t("title")}</h3>
            <p className="text-card-body whitespace-pre-line">{t("content")}</p>
          </div>
          <div className="hidden lg:flex lg:w-[50%] items-end justify-end gap-4">
            <MapButtons t={t} />
          </div>
        </div>

        <div className="w-full h-70 rounded-(--radius) overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=19.6923323,-98.8244167&z=15&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            className="border-0"
          />
        </div>

        <div className="flex lg:hidden gap-4">
          <MapButtons t={t} />
        </div>
      </div>

      <div className="w-full max-w-227 flex flex-col gap-14 mt-8">
        <div className="flex flex-col items-center text-center">
          <h4> {t("subtittleFaq")} </h4>
          <h2 className="whitespace-pre-line"> {t("tittleFaq")} </h2>
        </div>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              open={index === 0}
              className="group w-full border border-secondary rounded-[1.375rem] px-6 py-3 overflow-hidden transition-all duration-300"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-inter font-medium text-sm lg:text-lg text-black text-left">
                  {faq.question}
                </span>
                <span className="text-secondary text-2xl">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="mt-4 font-inter text-sm text-secondary whitespace-pre-line">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}