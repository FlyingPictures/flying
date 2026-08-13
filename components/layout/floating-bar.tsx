"use client"

import { createContext, useContext, useState } from "react"
import { Link, usePathname } from "@/i18n/routing"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { useTranslations } from "next-intl"
import { WhatsappLogoIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SITE_CONTACT } from "@/lib/site-config"
import {
  BOOKING_URLS,
  isBusinessOpen,
  isProductSlug,
} from "@/lib/commercial-config"

/* ===================================== */
/* CONSTANTS */
/* ===================================== */

/* ===================================== */
/* PRICING CONTEXT */
/* ===================================== */

interface PricingData {
  adults: string
  kids: string
  priceAdults: string
  priceKids: string
  dates?: string
}

interface PricingContextValue extends PricingData {
  setPricing: (p: PricingData) => void
}

const PricingContext = createContext<PricingContextValue | null>(null)

export const PricingProvider = ({ children }: { children: React.ReactNode }) => {
  const [pricing, setPricing] = useState<PricingData>({
    dates: "",
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

const FloatingCard = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={cn("w-full max-w-104 bg-background rounded-(--radius) p-3 flex items-center gap-3 shadow-xl", className)}>
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
        <Button asChild variant="primary" size="floating" className="flex-1">
          <Link href="/flight-experiences">{t("bookFlight")}</Link>
        </Button>

        <Button asChild variant="secondary" size="floating" className="flex-1">
          <a href={SITE_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
            <span className="flex items-center gap-2">
              {t("talkExpert")}
              <WhatsappLogoIcon size={20} />
            </span>
          </a>
        </Button>
      </FloatingCard>
    </FloatingWrapper>
  )
}

/* ===================================== */
/* FLOATING BAR 2 */
/* ===================================== */

const FloatingBar2 = ({ show }: { show: boolean }) => {
  const pricing = usePricing()
  const pathname = usePathname()

  const slug = pathname.split("/").pop() ?? ""
  const isCorporate = slug === "corporate"
  const bookingUrl = isProductSlug(slug) ? BOOKING_URLS[slug] : undefined
  const reservationUrl = bookingUrl ?? SITE_CONTACT.whatsapp
  const hasPublishedPrice = Boolean(pricing?.priceAdults)

  const Content = (
    <>
      {hasPublishedPrice && (
        <div className="grid min-w-0 flex-1 grid-cols-[max-content_max-content] items-baseline gap-x-2 gap-y-0.5 text-[11px] leading-tight min-[360px]:text-xs md:flex-none md:text-base">
          <div className="contents whitespace-nowrap">
            <span className="font-bold">{pricing?.adults}</span>
            <span>{pricing?.priceAdults}</span>
          </div>
          {pricing?.priceKids && (
            <div className="contents whitespace-nowrap">
              <span className="font-bold">{pricing.kids}</span>
              <span>{pricing.priceKids}</span>
            </div>
          )}
        </div>
      )}

      <Button variant="primary" size="xs" className="shrink-0 px-3 text-xs min-[360px]:px-4 md:px-6 md:text-sm" asChild>
        <a href={reservationUrl} target="_blank" rel="noopener noreferrer">
          {pricing?.dates}
        </a>
      </Button>

      <Button asChild variant="ghost" size="icon" className="shrink-0 rounded-full">
        <a href={SITE_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <WhatsappLogoIcon size={28} weight="bold" />
        </a>
      </Button>
    </>
  )

    return (
    <>
      <FloatingWrapper
        show={show}
        className="bottom-6 inset-x-0 flex justify-center px-2 md:hidden"
      >
        <FloatingCard
          className={cn(
            "max-w-[calc(100vw-1rem)] gap-2",
            isCorporate && "max-w-80",
          )}
        >
          {Content}
        </FloatingCard>
      </FloatingWrapper>

      <FloatingWrapper
        show={show}
        className={cn(
          "bottom-40 right-20 hidden md:flex",
          isCorporate ? "w-80" : "w-120",
        )}
      >
        <FloatingCard className="max-w-none gap-4">{Content}</FloatingCard>
      </FloatingWrapper>
    </>
  )
}

/* ===================================== */
/* FLOATING BAR 3 */
/* ===================================== */

const FloatingBar3 = ({ show }: { show: boolean }) => {
  const t = useTranslations("concierge")
  const isOnline = isBusinessOpen()

  const Content = (
    <>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 pr-2">
        <div className="flex items-center gap-1">
          <div
            className={cn(
              "w-3 h-3 rounded-full shrink-0",
              isOnline ? "bg-green-500" : "bg-red-500"
            )}
          />
          <span className="text-sm font-bold md:text-base">
            {t(isOnline ? "online" : "offline")}
          </span>
        </div>
        <span className="whitespace-nowrap text-xs leading-4 md:text-sm">{t("hours")}</span>
        <span className="text-xs leading-4 md:text-sm">{t("location")}</span>
      </div>

      <Button
        asChild
        variant="primary"
        size="floating"
        className="min-w-40 px-4 md:flex-none md:min-w-52 md:px-6 md:text-sm"
      >
        <a href={SITE_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
          {t("cta")}
          <WhatsappLogoIcon size={22} weight="bold" />
        </a>
      </Button>
    </>
  )

   return (
    <>
      <FloatingWrapper
        show={show}
        className="bottom-6 inset-x-0 flex justify-center px-2 md:hidden"
      >
        <FloatingCard>{Content}</FloatingCard>
      </FloatingWrapper>

      <FloatingWrapper
        show={show}
        className="bottom-40 right-20 hidden w-128 md:flex"
      >
        <FloatingCard className="max-w-none gap-4 px-4 py-3.5">{Content}</FloatingCard>
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
  const isFlightExperiences = pathname.includes("/flight-experiences")

  if (isProduct) return <FloatingBar2 show={showFloatingBar} />
  if (isContact) return <FloatingBar3 show={showFloatingBar} />
  if (isFlightExperiences) return null

  return <FloatingBar1 show={showFloatingBar} />
}
