"use client"

import { useTranslations } from "next-intl"
import { CloudinaryImage } from "@/components/CloudinaryImage"
import { IMAGES } from "@/lib/images"
import { EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ContactInfo() {
  const t = useTranslations("contact.info")

  const [company, setCompany] = useState("")
  const [groupSize, setGroupSize] = useState("")
  const [date, setDate] = useState("")
  const [invoice, setInvoice] = useState(false)

  const phoneNumber = t("phoneNumber").replace(/\D/g, "")

  const handleSubmit = () => {
    if (!company || !groupSize || !date || !invoice) return

    const message = `
Corporate Inquiry

Company Name: ${company}
Group Size: ${groupSize}
Date of Event: ${date}
Requires Invoice: ${invoice ? "Yes" : "No"}
`
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank")
  }

  const isDisabled = !company || !groupSize || !date || !invoice

  return (
    <section className="relative w-full lg:h-[1058px] py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_5%,#7B95AB_35%)]" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-4 items-start">
          <div className="flex flex-col items-center text-center gap-8 w-full">
            <h4 className="text-secondary">{t("forTravelers")}</h4>
            <h2 className="text-secondary tracking-[-0.03em]">{t("sectionTitle")}</h2>
            <div className="w-[clamp(345px,48vw,591px)] h-[clamp(327px,48vw,548px)] bg-background rounded-[var(--radius)] overflow-hidden shadow-lg flex flex-col">
              <div className="relative w-full h-[clamp(160px,26vw,325px)]">
                <CloudinaryImage publicId={IMAGES.contact.hero.booking} alt="Booking" fill className="object-cover" />
              </div>
              <div className="h-[clamp(167px,48vw,223px)] px-6 lg:px-8 py-5 flex flex-col justify-between text-left">
                <span className="text-secondary text-[clamp(12px,1.2vw,16px)]">{t("availabilityText")}</span>
                <div className="flex items-center gap-3">
                  <EnvelopeSimpleIcon className="w-6 h-6 text-secondary" weight="bold" />
                  <span className="text-secondary text-[clamp(12px,3vw,16px)]"><span className="font-bold">{t("emailLabel")}</span> {t("email")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-6 h-6 text-secondary" weight="bold" />
                  <span className="text-secondary text-[clamp(12px,1.2vw,16px)]"><span className="font-bold">{t("phone")}</span> {t("phoneNumber")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-8 w-full">
            <h4 className="text-background lg:text-secondary w-full text-center">{t("corporateLabel")}</h4>
            <h2 className="text-background lg:text-secondary whitespace-pre-line">{t("corporateTitle")}</h2>
            <div className="flex flex-col gap-6 w-[clamp(345px,48vw,481px)] mx-auto px-6 sm:px-8 lg:px-0">
              <span className="text-background w-full mb-8">{t("corporateDescription")}</span>
              <input placeholder={t("companyName")} value={company} onChange={(e) => setCompany(e.target.value)} className="w-full h-[48px] bg-transparent border-2 border-background rounded-[12px] px-5 text-background placeholder:text-background placeholder:opacity-100 font-bold outline-none focus:ring-2 focus:ring-background/40 transition" />
              <input placeholder={t("groupSize")} value={groupSize} onChange={(e) => setGroupSize(e.target.value)} className="w-full h-[48px] bg-transparent border-2 border-background rounded-[12px] px-5 text-background placeholder:text-background placeholder:opacity-100 font-bold outline-none focus:ring-2 focus:ring-background/40 transition" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full h-[48px] bg-transparent border-2 border-background rounded-[12px] px-5 text-background font-bold outline-none focus:ring-2 focus:ring-background/40 transition" />
              <label className="flex items-center gap-3 text-background text-[13px] font-medium justify-start">
                <input type="checkbox" checked={invoice} onChange={() => setInvoice(!invoice)} className="w-5 h-5 appearance-none border-2 border-background rounded-[4px] bg-transparent checked:border-background checked:bg-transparent relative cursor-pointer after:content-[''] after:absolute after:left-[6px] after:top-[2px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-primary after:rotate-45 after:opacity-0 checked:after:opacity-100" />
                {t("requireInvoice")}
              </label>
              <Button variant="primary" size="lg" className="w-full disabled:opacity-100 disabled:pointer-events-none" disabled={isDisabled} onClick={handleSubmit}>{t("cta")}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
