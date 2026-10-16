"use client"

import { Link, usePathname } from "@/i18n/routing"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { useLocale, useTranslations } from "next-intl"
import { WhatsappLogoIcon } from "@phosphor-icons/react"
import { ReservationLink } from "@/components/booking/reservation-link";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SITE_CONTACT } from "@/lib/site-config"
import {
  getInquiryUrl,
  PRODUCT_PRICING,
  getPriceDisplay,
  isBusinessOpen,
  isProductSlug,
} from "@/lib/commercial-config"

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
      <FloatingCard className="max-w-[calc(100vw-1rem)] flex-col items-stretch justify-center gap-2 p-2.5 min-[360px]:flex-row min-[360px]:items-center sm:max-w-122 sm:gap-3 sm:p-3">
        <Button asChild variant="primary" size="floating" className="w-full flex-none px-5 text-xs min-[360px]:w-auto min-[360px]:min-w-0 min-[360px]:flex-[0.82] min-[360px]:px-3 min-[360px]:text-[clamp(0.66rem,2.8vw,0.76rem)] min-[390px]:text-[0.72rem] sm:flex-none sm:px-7 sm:text-[0.8rem]">
          <Link href="/flight-experiences">{t("bookFlight")}</Link>
        </Button>

        <Button asChild variant="secondary" size="floating" className="w-full flex-none gap-1.5 px-5 text-xs tracking-[-0.015em] min-[360px]:w-auto min-[360px]:min-w-0 min-[360px]:flex-[1.18] min-[360px]:px-3 min-[360px]:text-[clamp(0.66rem,2.8vw,0.76rem)] min-[390px]:text-[0.72rem] sm:flex-none sm:px-7 sm:text-[0.8rem]">
          <a href={SITE_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
            {t("talkExpert")}
            <WhatsappLogoIcon size={18} weight="bold" />
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
  const locale = useLocale()
  const pathname = usePathname()

  const slug = pathname.split("/").pop() ?? ""
  const isCorporate = slug === "corporate"
  const productSlug = isProductSlug(slug) ? slug : null
  const inquiryUrl = productSlug ? getInquiryUrl(productSlug, locale) : SITE_CONTACT.whatsapp
  const pricing = productSlug ? PRODUCT_PRICING[productSlug] : null
  const priceDisplay = getPriceDisplay(pricing, locale)

  const Content = (
    <>
      {pricing && (
        <div className="min-w-0 flex-1 text-[11px] leading-tight min-[360px]:text-xs md:text-sm">
          {priceDisplay.rows.length ? priceDisplay.rows.map((row) => (
            <div key={row.label} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="font-bold">{row.label}</span>
              <span className="whitespace-nowrap">{row.formattedAmount}</span>
            </div>
          )) : <span className="font-bold">{priceDisplay.headline}</span>}
        </div>
      )}

      <Button variant="primary" size="xs" className="shrink-0 px-3 text-xs min-[360px]:px-4 md:px-6 md:text-sm" asChild>
        <ReservationLink slug={productSlug ?? "corporate"} locale={locale} />
      </Button>

      <Button asChild variant="ghost" size="icon" className="shrink-0 rounded-full">
        <a href={inquiryUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <WhatsappLogoIcon size={28} weight="bold" />
        </a>
      </Button>

      {pricing && priceDisplay.note && (
        <p className="basis-full text-[11px] leading-4 text-muted-foreground md:text-xs">
          {priceDisplay.note}
        </p>
      )}
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
            "max-w-[calc(100vw-1rem)] flex-wrap gap-2",
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
        <FloatingCard className="max-w-none flex-wrap gap-4">{Content}</FloatingCard>
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
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 min-[360px]:flex-[0.7] min-[360px]:pr-1 min-[390px]:flex-[0.85] md:flex-1 md:pr-2">
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
        className="w-full flex-none gap-1.5 px-5 text-xs tracking-[-0.015em] min-[360px]:w-auto min-[360px]:min-w-0 min-[360px]:flex-[1.3] min-[360px]:px-3 min-[360px]:text-[clamp(0.66rem,2.8vw,0.76rem)] min-[390px]:flex-[1.15] min-[390px]:text-[0.72rem] md:flex-none md:min-w-52 md:px-6 md:text-sm"
      >
        <a href={SITE_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
          {t("cta")}
          <WhatsappLogoIcon size={20} weight="bold" />
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
        <FloatingCard className="max-w-[calc(100vw-1rem)] flex-col items-stretch gap-2.5 min-[360px]:flex-row min-[360px]:items-center min-[360px]:gap-2">
          {Content}
        </FloatingCard>
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
