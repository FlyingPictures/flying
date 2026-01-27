"use client"

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

const DIMENSIONS = {
  DESKTOP: {
    BANNER_HEIGHT: '3rem',
    NAV_HEIGHT: '5.125rem',
    LOGO_WIDTH: '4.75rem',
    LOGO_HEIGHT: '6rem',
    TOTAL_OFFSET: '11rem',
  },
  MOBILE: {
    BANNER_HEIGHT: '2.5rem',
    NAV_HEIGHT: '4.5rem',
    LOGO_WIDTH: '3.875rem',
    LOGO_HEIGHT: '4.875rem',
    TOTAL_HEIGHT: '7.5rem',
  }
} as const

const STYLES = {
  shadow: { boxShadow: "0 0.3125rem 0.9375rem rgba(0,0,0,0.2)" },
  navText: "nav-text-style text-[1rem]",
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

// ===== UTILIDADES OPTIMIZADAS =====
const formatPhoneForDisplay = (phone: string) => 
  phone.replace('+52', '(+52) ').replace('-', ' ')

// ===== SUBCOMPONENTES OPTIMIZADOS =====
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
      className="h-auto p-0 bg-transparent hover:bg-transparent transition-opacity hover:opacity-70"
      aria-label={`Switch to ${nextLocale === 'en' ? 'English' : 'Spanish'}`}
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
      className={cn("px-6 font-bold", className)}
      aria-label={t("bookFlight")}
    >
      {t("bookFlight")}
    </Button>
  )
}

function PhoneBanner({ className }: { className?: string }) {
  const tBanner = useTranslations("banner")
  
  return (
    <div className={cn(
      "w-full flex items-center justify-center bg-destructive text-background font-bold",
      className
    )}>
      <a
        href={`tel:${PHONE_NUMBER}`}
        className={cn(STYLES.bannerLink, "whitespace-nowrap")}
        aria-label={`Call ${PHONE_DISPLAY}`}
      >
        <span>{tBanner('company')}</span>
        <PhoneIcon className="size-4" weight="bold" aria-hidden="true" />
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
      
      if (isVisible !== shouldShow) {
        setIsVisible(shouldShow)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isVisible])

  const primaryLinks = useMemo(() => 
    NAV_LINKS.filter(l => l.primary).map((link) => (
      <Link
        key={link.id}
        href={link.href}
        className="nav-text-style text-base font-bold tracking-tight whitespace-nowrap"
      >
        {t(link.id)}
      </Link>
    )), [t])

  const secondaryLinks = useMemo(() => 
    NAV_LINKS.filter(l => !l.primary).map((link) => (
      <Link
        key={link.id}
        href={link.href}
        className="nav-text-style text-base font-bold tracking-tight whitespace-nowrap"
      >
        {t(link.id)}
      </Link>
    )), [t])

  return (
    <header className={cn(
      "hidden lg:flex flex-col items-center z-50 fixed top-0 left-0 w-full transition-transform duration-500 ease-in-out",
      !isVisible && "-translate-y-[11rem]"
    )}>
      <PhoneBanner className="h-12 text-base" />

      <div className="w-[97%] [@media(min-width:1480px)]:max-w-[90rem] mt-4">
        <nav className="relative" role="navigation" aria-label="Main navigation">
          <Link
            href="/"
            className={cn(
              "absolute left-1/2 -translate-x-1/2 top-0 z-20",
              `w-[${DIMENSIONS.DESKTOP.LOGO_WIDTH}] h-24`
            )}
            aria-label="Go to homepage"
          >
            <Logo className="w-full h-full" />
          </Link>

          <div className="bg-background h-[5.125rem] rounded-2xl shadow-2xl border border-border/50 flex items-center justify-between px-5 relative z-10">
            <div className="flex flex-1 items-center gap-8">
              {primaryLinks}
            </div>

            <div className={`w-[${DIMENSIONS.DESKTOP.LOGO_WIDTH}] shrink-0`} aria-hidden="true" />

            <div className="flex flex-1 items-center justify-end gap-8">
              {secondaryLinks}
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

  const isScrollingDown = useMemo(() => scrollDirection === "down", [scrollDirection])
  const showFloatingBar = useMemo(() => 
    scrollY > SCROLL_THRESHOLDS.FLOATING_BAR && isScrollingDown && !open,
    [scrollY, isScrollingDown, open]
  )
  const hideHeader = useMemo(() => 
    (scrollY > SCROLL_THRESHOLDS.HIDE && isScrollingDown) || open,
    [scrollY, isScrollingDown, open]
  )

  const handleClose = useCallback(() => setOpen(false), [])

  const experienceLinks = useMemo(() => 
    MENU_CONFIG.experiences.map(({ id, href }) => (
      <Link 
        key={id} 
        href={href} 
        className={cn(STYLES.navText, "opacity-80")} 
        onClick={handleClose}
      >
        {t(id)}
      </Link>
    )), [t, handleClose])

  const mainLinks = useMemo(() => 
    MENU_CONFIG.main.map(({ id, href }) => (
      <Link 
        key={id} 
        href={href} 
        className={STYLES.heading} 
        onClick={handleClose}
      >
        {t(id)}
      </Link>
    )), [t, handleClose])

  return (
    <>
      <header
        className={cn(
          "lg:hidden fixed top-0 inset-x-0 z-50 transition-transform duration-300",
          hideHeader && "-translate-y-full"
        )}
        role="banner"
      >
        <PhoneBanner className="px-2 py-2 text-[clamp(0.6rem,2.8vw,0.875rem)]" />

        <nav 
          className="relative h-[4.5rem] bg-surface px-[1.375rem] flex items-center" 
          style={STYLES.shadow}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <Link
            href="/"
            className="absolute top-0 left-[1.375rem]"
            onClick={handleClose}
            aria-label="Go to homepage"
          >
            <Logo className={`w-[${DIMENSIONS.MOBILE.LOGO_WIDTH}] h-[${DIMENSIONS.MOBILE.LOGO_HEIGHT}]`} />
          </Link>

          <div className="flex items-center gap-3 ml-auto">
            <BookButton />

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger 
                className="p-1 active:scale-90 transition-transform"
                aria-label="Open menu"
              >
                <EqualsIcon size={32} weight="bold" className="text-secondary" aria-hidden="true" />
              </SheetTrigger>

              <SheetContent className="[&>button]:hidden flex flex-col p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <div className="h-[6rem] flex items-center justify-between px-[1.375rem] border-b border-secondary/10">
                  <BookButton />
                  <SheetClose 
                    className="bg-secondary text-white rounded-full size-10 flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                    aria-label="Close menu"
                  >
                    <XIcon size={24} weight="bold" aria-hidden="true" />
                  </SheetClose>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto px-10 py-10 gap-10">
                  <nav aria-label="Flight experiences">
                    <h2 className={STYLES.heading}>{t("flightExperiences")}</h2>
                    <div className="flex flex-col gap-4 mt-4">
                      {experienceLinks}
                    </div>
                  </nav>

                  <nav aria-label="Main sections">
                    <div className="flex flex-col gap-6">
                      {mainLinks}
                    </div>
                  </nav>

                  <div className="mt-auto border-t border-secondary/10 pt-8 pb-16 flex flex-col items-start gap-6">
                    <Link 
                      href="/support" 
                      className={STYLES.navText} 
                      onClick={handleClose}
                    >
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

      <div className={`lg:hidden h-[${DIMENSIONS.MOBILE.TOTAL_HEIGHT}]`} aria-hidden="true" />

      <div 
        className={cn(
          "lg:hidden fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 transition-all duration-500",
          showFloatingBar ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        )}
        aria-hidden={!showFloatingBar}
      >
        <div className="w-full max-w-[26rem] bg-surface rounded-card p-3 flex items-center gap-3" style={STYLES.shadow}>
          <Button variant="primary" size="floating" className="flex-1">
            <span className="truncate font-bold">{t("bookFlight")}</span>
          </Button>
          <Button variant="secondary" size="floating" className="flex-1">
            <span className="truncate font-bold">{t("talkExpert")}</span>
            <WhatsappLogoIcon size={20} weight="bold" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </>
  )
}

// ===== COMPONENTE PRINCIPAL =====
export default function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  )
}