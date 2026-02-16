import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"
import { ArrowRightIcon } from "@phosphor-icons/react"

export async function LocationAndFAQ() {
  const t = await getTranslations("contact.locationFaq")

  const faqs = ["ask1", "ask2", "ask3"].map((key) => ({
    question: t(key),
    answer: t(`${key}-answer`),
  }))

  const MapButtons = () => (
    <>
      <Button
        variant="secondary"
        className="w-1/2 h-[2.5rem] text-[0.75rem] rounded-full flex items-center justify-center"
        asChild
      >
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=19.6923323,-98.8244167"
          target="_blank"
        >
          {t("button-google")}
        </a>
      </Button>

      <a
        href="https://waze.com/ul?ll=19.6923323,-98.8244167&navigate=yes"
        target="_blank"
        className="w-1/2 h-[2.5rem] text-[0.75rem] rounded-full border border-secondary bg-background text-secondary font-semibold flex items-center justify-center transition hover:bg-secondary hover:text-background"
      >
        {t("button-waze")}
      </a>
    </>
  )

  return (
    <section className="w-full min-w-[345px] flex flex-col items-center gap-[clamp(3rem,6vw,5rem)] py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,5rem)]">
      <div className="w-full max-w-[56.8125rem] flex flex-col gap-[2.5rem]">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-[2rem]">
          <div className="lg:w-[60%] flex flex-col gap-[1rem] text-left">
            <h3 className="text-card-title">{t("title")}</h3>
            <p className="text-card-body whitespace-pre-line">{t("content")}</p>
          </div>
          <div className="hidden lg:flex lg:w-[50%] items-end justify-end gap-[1rem]">
            <MapButtons />
          </div>
        </div>

        <div className="w-full h-[17.5rem] rounded-[var(--radius)] overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=19.6923323,-98.8244167&z=15&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            className="border-0"
          />
        </div>

        <div className="flex lg:hidden gap-[1rem]">
          <MapButtons />
        </div>
      </div>

      <div className="w-full max-w-[56.8125rem] flex flex-col gap-[3.5rem]">
        <div className="flex flex-col items-center gap-[1rem] text-center">
          <h4 className="font-inter font-bold text-[0.75rem] text-secondary">
            {t("subtittleFaq")}
          </h4>
          <h2 className="font-poppins font-semibold text-[2.25rem] lg:text-[3rem] text-secondary whitespace-pre-line leading-[123%] tracking-[-0.03em]">
            {t("tittleFaq")}
          </h2>
        </div>

        <div className="flex flex-col gap-[1.5rem]">
          {faqs.map((faq, index) => (
            <details
              key={index}
              open={index === 0}
              className="group w-full border border-secondary rounded-[1.375rem] px-[1.5rem] py-[0.75rem] overflow-hidden transition-all duration-300"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-inter font-medium text-[0.875rem] lg:text-[1.125rem] text-black text-left">
                  {faq.question}
                </span>

                <span className="text-secondary text-2xl">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>

              <p className="mt-[1rem] font-inter text-[0.875rem] text-secondary whitespace-pre-line">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
