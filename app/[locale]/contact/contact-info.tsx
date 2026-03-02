"use client"

import { useTranslations } from "next-intl"
import { CloudinaryImage } from "@/components/CloudinaryImage"
import { IMAGES } from "@/lib/images"
import { EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const inputClass =
  "w-full h-[48px] bg-transparent border-2 border-background rounded-[12px] px-5 text-background placeholder:text-background placeholder:opacity-100 font-bold outline-none focus:ring-2 focus:ring-background/40 transition"

export function ContactInfo() {
  const t = useTranslations("contact.info")

  const [company, setCompany] = useState("")
  const [groupSize, setGroupSize] = useState("")
  const [date, setDate] = useState("")
  const [invoice, setInvoice] = useState(false)

  const phoneNumber = t("phoneNumber").replace(/\D/g, "")

  const handleSubmit = () => {
    if (!company || !groupSize || !date) return

    const message = `
      Corporate Inquiry

      Company Name: ${company}
      Group Size: ${groupSize}
      Date of Event: ${date}
      ${invoice ? "Requires Invoice: Yes" : ""}
      `
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank")
  }

  const isDisabled = !company || !groupSize || !date

  return (
    <section className="relative w-full lg:h-265 py-12 overflow-hidden">
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator { display: none; }
        input[type="date"]::-webkit-inner-spin-button { display: none; }
      `}</style>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_5%,#7B95AB_35%)]" />

      <div className="relative max-w-300 mx-auto px-4">

        <div className="lg:hidden flex flex-col items-center text-center mb-12">
          <h4>{t("subtitle")}</h4>
          <h2>{t("title")}</h2>
          <span className="font-bold mt-8 max-w-2xl">{t("paragraph")}</span>
          <span className="font-xs mt-8">{t("guarantee")}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-start">

          <div className="flex flex-col items-center text-center gap-8 w-full">
            <div className="flex flex-col items-center text-center">
              <h2>{t("sectionTitle")}</h2>
              <h4 className="lg:order-first">{t("forTravelers")}</h4>
            </div>
            <div className="w-[clamp(345px,48vw,591px)] h-[clamp(327px,48vw,548px)] bg-background rounded-(--radius) overflow-hidden shadow-lg flex flex-col">
              <div className="relative w-full h-[clamp(160px,26vw,325px)]">
                <CloudinaryImage publicId={IMAGES.contact.hero.booking} alt="Booking" fill className="object-cover" />
              </div>
              <div className="text-md lg:text-xl h-[clamp(167px,48vw,223px)] px-5 lg:px-8 py-5 flex flex-col justify-between text-left">
                <span className="font-bold">{t("availabilityText")}</span>
                <div className="flex items-center gap-3">
                  <EnvelopeSimpleIcon className="w-6 h-6 text-secondary" weight="bold" />
                  <span>
                    <span className="font-bold">{t("emailLabel")}</span> {t("email")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-6 h-6 text-secondary" weight="bold" />
                  <span>
                    <span className="font-bold">{t("phone")}</span> {t("phoneNumber")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-8 w-full mt-16">
            <div className="flex flex-col items-center text-center text-background lg:text-secondary">
              <h4>{t("corporateLabel")}</h4>
              <h2 className="lg:whitespace-pre-line">{t("corporateTitle")}</h2>
              
            </div>
            <div className="flex flex-col gap-6 w-full max-w-120 mx-auto">
              <span className="text-background w-full mb-8">{t("corporateDescription")}</span>
              <input
                placeholder={t("companyName")}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputClass}
              />
              <input
                placeholder={t("groupSize")}
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                className={inputClass}
              />
              <input
                type={date ? "date" : "text"}
                placeholder={t("eventDate")}
                value={date}
                onFocus={(e) => {
                  e.target.type = "date"
                  e.target.showPicker()
                }}
                onBlur={(e) => { if (!date) e.target.type = "text" }}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
              <label className="flex items-center gap-3 text-background text-[13px] font-medium">
                <input
                  type="checkbox"
                  checked={invoice}
                  onChange={() => setInvoice(!invoice)}
                  className="w-5 h-5 appearance-none border-2 border-background rounded-[4px] bg-transparent checked:border-background checked:bg-transparent relative cursor-pointer after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-primary after:rotate-45 after:opacity-0 checked:after:opacity-100"
                />
                {t("requireInvoice")}
              </label>
              <Button
                variant="primary"
                size="lg"
                className="w-full disabled:opacity-100 disabled:pointer-events-none"
                disabled={isDisabled}
                onClick={handleSubmit}
              >
                {t("cta")}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}