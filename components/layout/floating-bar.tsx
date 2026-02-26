"use client"

import { createContext, useContext, useState } from "react"
import { usePathname } from "@/i18n/routing"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { useTranslations } from "next-intl"
import { WhatsappLogoIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* ===================================== */
/* CONSTANTS */
/* ===================================== */

const CONTACT = {
  PHONE: "+525558025-1057",
  DISPLAY: "(+52) 55 8025-1057",
  WHATSAPP: "https://wa.me/525558025-1057"
} as const

const BUSINESS_HOURS = {
  START: 8,
  END: 20,
  TIMEZONE: "America/Mexico_City"
} as const

const getOnlineStatus = () => {
  const now = new Date().toLocaleString("en-US", {
    timeZone: BUSINESS_HOURS.TIMEZONE,
    hour: "2-digit",
    hour12: false
  })
  const hour = parseInt(now.split(":")[0])
  return hour >= BUSINESS_HOURS.START && hour < BUSINESS_HOURS.END
    ? "Online"
    : "Offline"
}

/* ===================================== */
/* PRICING CONTEXT */
/* ===================================== */

interface PricingData {
  adults: string
  kids: string
  priceAdults: string
  priceKids: string
}

interface PricingContextValue extends PricingData {
  setPricing: (p: PricingData) => void
}

const PricingContext = createContext<PricingContextValue | null>(null)

export const PricingProvider = ({ children }: { children: React.ReactNode }) => {
  const [pricing, setPricing] = useState<PricingData>({
    adults: "",
    kids: "",
    priceAdults: "",
    priceKids: "",
  })

  return (
    <PricingContext.Provider value={{ ...pricing, setPricing }}>
      {children}
    </PricingContext.Provider>
  )
}

export const usePricing = () => useContext(PricingContext)

/* ===================================== */
/* REUSABLE WRAPPER */
/* ===================================== */

const FloatingWrapper = ({
  show,
  className,
  children
}: {
  show: boolean
  className: string
  children: React.ReactNode
}) => (
  <div
    className={cn(
      "fixed z-40 transition-all duration-500",
      className,
      show
        ? "translate-y-0 opacity-100"
        : "translate-y-20 opacity-0 pointer-events-none"
    )}
  >
    {children}
  </div>
)

/* ===================================== */
/* REUSABLE CARD CONTAINER */
/* ===================================== */

const FloatingCard = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[26rem] bg-surface rounded-card p-3 flex items-center gap-3 shadow-xl">
    {children}
  </div>
)

/* ===================================== */
/* FLOATING BAR 1 */
/* ===================================== */

const FloatingBar1 = ({ show }: { show: boolean }) => {
  const t = useTranslations("nav")

  return (
    <FloatingWrapper
      show={show}
      className="bottom-6 inset-x-0 flex justify-center px-4 lg:hidden"
    >
      <FloatingCard>
        <Button variant="primary" size="floating" className="flex-1">
          {t("bookFlight")}
        </Button>

        <a
          href={CONTACT.WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="secondary" size="floating" className="w-full">
            <span className="flex items-center gap-2">
              {t("talkExpert")}
              <WhatsappLogoIcon size={20} />
            </span>
          </Button>
        </a>
      </FloatingCard>
    </FloatingWrapper>
  )
}

/* ===================================== */
/* FLOATING BAR 2 */
/* ===================================== */

const FloatingBar2 = ({ show }: { show: boolean }) => {
  const pricing = usePricing()

  const Content = (
    <>
      <div className="flex-1 flex flex-col gap-1">
        <div className="font-inter text-md">
          <span className="font-bold">{pricing?.adults}</span> {pricing?.priceAdults}
        </div>
        <div className="font-inter text-md">
          <span className="font-bold">{pricing?.kids}</span> {pricing?.priceKids}
        </div>
      </div>

      <Button variant="primary" size="md">
        See Dates
      </Button>

      <a
        href={CONTACT.WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="floating" className="rounded-full">
          <WhatsappLogoIcon size={35} weight="bold" />
        </Button>
      </a>
    </>
  )

  return (
    <>
      {/* Mobile */}
      <FloatingWrapper
        show={show}
        className="bottom-6 inset-x-0 flex justify-center px-4 lg:hidden"
      >
        <FloatingCard>{Content}</FloatingCard>
      </FloatingWrapper>

      {/* Desktop */}
      <FloatingWrapper
        show={show}
        className="bottom-40 right-20 hidden lg:flex w-[26rem]"
      >
        <FloatingCard>{Content}</FloatingCard>
      </FloatingWrapper>
    </>
  )
}

/* ===================================== */
/* FLOATING BAR 3 */
/* ===================================== */

const FloatingBar3 = ({ show }: { show: boolean }) => {
  const status = getOnlineStatus()
  const isOnline = status === "Online"

  const Content = (
    <>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <div
            className={cn(
              "w-3 h-3 rounded-full flex-shrink-0",
              isOnline ? "bg-green-500" : "bg-red-500"
            )}
          />
          <p className="font-inter font-extra-bold !text-[1rem] ml-1.5">
            {status}
          </p>
        </div>
        <p className="font-inter font-black !text-[0.7rem] letter-spacing-[-0.03em] truncate-none">
          8:00 AM - 08:00 PM CST
        </p>
      </div>

      <Button variant="primary" size="floating">
        Chat with Concierge
      </Button>

      <a
        href={CONTACT.WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="floating" className="rounded-full">
          <WhatsappLogoIcon size={35} weight="regular" />
        </Button>
      </a>
    </>
  )

  return (
    <>
      {/* Mobile */}
      <FloatingWrapper
        show={show}
        className="bottom-6 inset-x-0 flex justify-center px-4 lg:hidden"
      >
        <FloatingCard>{Content}</FloatingCard>
      </FloatingWrapper>

      {/* Desktop */}
      <FloatingWrapper
        show={true}
        className="bottom-20 right-20 hidden lg:flex w-[26rem]"
      >
        <FloatingCard>{Content}</FloatingCard>
      </FloatingWrapper>
    </>
  )
}

/* ===================================== */
/* MAIN EXPORT */
/* ===================================== */

export const FloatingBar = () => {
  const pathname = usePathname()
  const { scrollDirection, scrollY } = useScrollDirection()

  const showFloatingBar = scrollY > 50 && scrollDirection === "down"

  const isProduct = pathname.includes("/product")
  const isContact = pathname.includes("/contact")

  if (isProduct) return <FloatingBar2 show={showFloatingBar} />
  if (isContact) return <FloatingBar3 show={showFloatingBar} />

  return <FloatingBar1 show={showFloatingBar} />
}