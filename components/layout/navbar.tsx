'use client'

import { useState, useEffect, useCallback, useMemo } from "react"
import { Link } from "@/i18n/routing"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import {
  PhoneIcon,
  EqualsIcon,
  XIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { cn } from "@/lib/utils"

// ===== CONSTANTES OPTIMIZADAS =====
const PHONE_NUMBER = "+525558025-1057" as const
const PHONE_DISPLAY = PHONE_NUMBER.replace('+52', '(+52) ').replace('-', ' ')

const SCROLL_THRESHOLDS = {
  HIDE: 50,
  FLOATING_BAR: 100,
  DESKTOP_HIDE: 50,
} as const

const STYLES = {
  shadow: { boxShadow: "0 0.3125rem 0.9375rem rgba(0,0,0,0.2)" },
  // Texto cambiado a secondary
  navText: "nav-text-style text-[1rem] text-secondary font-bold tracking-tight hover:opacity-70 transition-opacity",
  heading: "font-poppins font-bold text-[1.5rem] text-secondary",
  bannerLink: "flex items-center gap-2 hover:underline underline-offset-4 transition-opacity hover:opacity-90",
} as const

const NAV_LINKS = [
  { id: "flightExperiences", href: "/flight-experiences", primary: true },
  { id: "safetyHeritage", href: "/safety-heritage", primary: true },
  { id: "planYourVisit", href: "/plan-your-visit", primary: true },
  { id: "contactSupport", href: "/contact", primary: false },
] as const

const MENU_CONFIG = {
  experiences: [
    { id: "shared", href: "/shared-flight" },
    { id: "private", href: "/private-flight" },
    { id: "proposals", href: "/private-flight" },
    { id: "groups", href: "/private-flight" },
  ],
  main: [
    { id: "safetyHeritage", href: "/safety-heritage" },
    { id: "planYourVisit", href: "/plan-your-visit" },
  ]
} as const

// ===== SUBCOMPONENTES =====
function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const nextLocale = useMemo(() => locale === "en" ? "es" : "en", [locale])
  const label = useMemo(() => locale === "en" ? "Language" : "Idioma", [locale])

  const toggleLanguage = useCallback(() => {
    router.replace(pathname, { locale: nextLocale })
  }, [router, pathname, nextLocale])

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="h-auto p-0 bg-transparent hover:bg-transparent transition-opacity hover:opacity-70 text-secondary font-bold"
    >
      {label}
    </Button>
  )
}

function BookButton({ className, variant = "primary" }: { className?: string; variant?: "primary" | "secondary" }) {
  const t = useTranslations("nav")
  return (
    <Button 
      variant={variant} 
      size="sm" 
      className={cn("px-8 font-bold", className)}
    >
      {t("bookFlight")}
    </Button>
  )
}

function PhoneBanner({ className }: { className?: string }) {
  const tBanner = useTranslations("banner")
  return (
    <div className={cn("w-full flex items-center justify-center bg-destructive text-background font-bold", className)}>
      <a href={`tel:${PHONE_NUMBER}`} className={STYLES.bannerLink}>
        <PhoneIcon className="size-4" weight="bold" />
        <span className="tracking-tight">{PHONE_DISPLAY}</span>
      </a>
    </div>
  )
}

function DesktopNavbar() {
  const t = useTranslations("nav")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const shouldShow = currentScrollY <= lastScrollY || currentScrollY <= SCROLL_THRESHOLDS.DESKTOP_HIDE
      setIsVisible(shouldShow)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header className={cn(
      "hidden lg:flex flex-col items-center z-50 fixed top-0 left-0 w-full transition-transform duration-500 ease-in-out",
      !isVisible && "-translate-y-[11rem]"
    )}>
      <PhoneBanner className="h-12 text-base" />

      <div className="w-[95%] [@media(min-width:1480px)]:max-w-[92rem] mt-4">
        <nav className="relative">
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-0 z-20 w-[4.75rem] h-24">
            <Logo className="w-full h-full" />
          </Link>

          <div className="bg-background h-[5.125rem] rounded-2xl shadow-2xl border border-border/50 flex items-center justify-between px-10 relative z-10">
            <div className="flex flex-1 items-center gap-10">
              {NAV_LINKS.filter(l => l.primary).map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={STYLES.navText}
                >
                  {t(link.id)}
                </Link>
              ))}
            </div>

            <div className="w-[120px] shrink-0" aria-hidden="true" />

            <div className="flex flex-1 items-center justify-end gap-10">
              {NAV_LINKS.filter(l => !l.primary).map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={STYLES.navText}
                >
                  {t(link.id)}
                </Link>
              ))}
              <LanguageSwitcher />
              <BookButton />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

function MobileNavbar() {
  const [open, setOpen] = useState(false)
  const { scrollDirection, scrollY } = useScrollDirection()
  const t = useTranslations("nav")

  const isScrollingDown = scrollDirection === "down"
  const showFloatingBar = scrollY > SCROLL_THRESHOLDS.FLOATING_BAR && isScrollingDown && !open
  const hideHeader = (scrollY > SCROLL_THRESHOLDS.HIDE && isScrollingDown) || open

  return (
    <>
      <header className={cn(
        "lg:hidden fixed top-0 inset-x-0 z-50 transition-transform duration-300",
        hideHeader && "-translate-y-full"
      )}>
        <PhoneBanner className="px-2 py-2 text-[clamp(0.6rem,2.8vw,0.875rem)]" />

        <nav className="relative h-[4.5rem] bg-surface px-6 flex items-center" style={STYLES.shadow}>
          <Link href="/" className="absolute top-0 left-6" onClick={() => setOpen(false)}>
            <Logo className="w-[3.875rem] h-[4.875rem]" />
          </Link>

          <div className="flex items-center gap-3 ml-auto">
            <BookButton />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="p-1">
                <EqualsIcon size={32} weight="bold" className="text-secondary" />
              </SheetTrigger>
              <SheetContent className="flex flex-col p-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="h-[6rem] flex items-center justify-between px-6 border-b border-secondary/10">
                  <BookButton />
                  <SheetClose className="bg-secondary text-white rounded-full size-10 flex items-center justify-center">
                    <XIcon size={24} weight="bold" />
                  </SheetClose>
                </div>
                <div className="flex flex-col flex-1 px-10 py-10 gap-8 overflow-y-auto">
                  <h2 className={STYLES.heading}>{t("flightExperiences")}</h2>
                  {MENU_CONFIG.experiences.map(({ id, href }) => (
                    <Link key={id} href={href} className="text-secondary text-lg font-medium opacity-80" onClick={() => setOpen(false)}>
                      {t(id)}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-6 mt-4">
                    {MENU_CONFIG.main.map(({ id, href }) => (
                      <Link key={id} href={href} className={STYLES.heading} onClick={() => setOpen(false)}>
                        {t(id)}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto border-t border-secondary/10 pt-8 pb-12 flex flex-col gap-6">
                    <Link href="/support" className="text-secondary font-bold" onClick={() => setOpen(false)}>
                      {t("contactSupport")}
                    </Link>
                    <LanguageSwitcher />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <div className="lg:hidden h-[7.5rem]" aria-hidden="true" />
      
      <div className={cn(
          "lg:hidden fixed bottom-6 inset-x-0 z-40 flex justify-center px-6 transition-all duration-500",
          showFloatingBar ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        )}>
        <div className="w-full max-w-[26rem] bg-surface rounded-card p-3 flex items-center gap-3" style={STYLES.shadow}>
          <Button variant="primary" size="floating" className="flex-1 font-bold">
            {t("bookFlight")}
          </Button>
          <Button variant="secondary" size="floating" className="flex-1 font-bold">
            {t("talkExpert")}
            <WhatsappLogoIcon size={20} weight="bold" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  )
}