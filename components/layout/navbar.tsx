"use client"

import { useState, useEffect, useRef } from "react"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { CloudinaryImage } from "@/components/CloudinaryImage"
import { IMAGES } from "@/lib/images"
import { Button } from "@/components/ui/button"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import {
  EqualsIcon,
  XIcon,
  HeadsetIcon,
  GlobeSimpleIcon,
  CaretDownIcon,
  CheckIcon,
} from "@phosphor-icons/react"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { SITE_CONTACT } from "@/lib/site-config"
import {
  PACKAGE_SLUGS,
  getProductName,
  type ProductSlug,
} from "@/lib/commercial-config"

const EXPERIENCES = PACKAGE_SLUGS.map((slug) => ({
  slug,
  href: `/product/${slug}`,
}))

const MOBILE_FEATURED_EXPERIENCES = EXPERIENCES.filter(({ slug }) =>
  (["classic", "transport", "journey", "vip"] as ProductSlug[]).includes(slug),
)

const NavLink = ({ id, href, className = "", onClick }: { id: string; href: string; className?: string; onClick?: () => void }) => {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)
  return <Link href={href} aria-current={isActive ? "page" : undefined} onClick={onClick} className={cn("font-inter font-bold text-secondary tracking-tight transition-opacity hover:opacity-70 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", className)}>{t(id)}</Link>
}

const ProductNavLink = ({ slug, href, className = "", onClick }: { slug: ProductSlug; href: string; className?: string; onClick?: () => void }) => {
  const locale = useLocale()
  const pathname = usePathname()
  const isActive = pathname === href
  return <Link href={href} aria-current={isActive ? "page" : undefined} onClick={onClick} className={cn("font-inter font-bold text-secondary tracking-tight transition-opacity hover:opacity-70 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", className)}>{getProductName(slug, locale)}</Link>
}

const BookButton = ({ size = "md", variant = "primary", className = "", onClick }: { size?: "md" | "floating"; variant?: "primary" | "secondary"; className?: string; onClick?: () => void }) => {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const href = pathname === "/flight-experiences" ? "#catalog-complete" : "/flight-experiences"

  return (
    <Button asChild variant={variant} size={size} className={cn("px-8 font-bold", className)}>
      <Link href={href} onClick={onClick}>{t("bookFlight")}</Link>
    </Button>
  )
}

const LANGUAGE_NAMES = {
  es: "Español",
  en: "English",
} as const

function persistPreferredLocale(nextLocale: keyof typeof LANGUAGE_NAMES) {
  document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`
  window.localStorage.setItem("preferred-locale", nextLocale)
}

const LanguageSwitcher = ({ className = "", onSelect, mobileInline = false }: { className?: string; onSelect?: () => void; mobileInline?: boolean }) => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations("nav")

  const changeLanguage = (nextLocale: string) => {
    if (nextLocale !== "en" && nextLocale !== "es") return

    persistPreferredLocale(nextLocale)

    const query = searchParams.toString()
    const destination = query ? `${pathname}?${query}` : pathname
    router.replace(destination, { locale: nextLocale })
    onSelect?.()
  }

  if (mobileInline) {
    return (
      <div className={cn("flex min-h-12 items-center justify-between gap-4", className)}>
        <span className="flex items-center gap-3 font-inter font-bold text-secondary">
          <GlobeSimpleIcon size={22} weight="bold" aria-hidden="true" />
          {t("language")}
        </span>
        <div role="group" aria-label={t("switchLanguage")} className="flex rounded-full bg-secondary/6 p-1">
          {(Object.entries(LANGUAGE_NAMES) as Array<[keyof typeof LANGUAGE_NAMES, string]>).map(([code]) => (
            <button
              key={code}
              type="button"
              aria-pressed={locale === code}
              onClick={() => changeLanguage(code)}
              className="min-h-11 min-w-12 rounded-full px-3 font-inter text-sm font-bold uppercase text-secondary outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-primary data-[active=true]:bg-secondary data-[active=true]:text-background"
              data-active={locale === code}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={t("switchLanguage")}
          className={cn(
            "group flex items-center gap-2 rounded-full px-2 py-2 font-inter font-bold text-secondary outline-none transition-colors hover:bg-secondary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            className,
          )}
        >
          <GlobeSimpleIcon size={20} weight="bold" aria-hidden="true" />
          <span>{LANGUAGE_NAMES[locale as keyof typeof LANGUAGE_NAMES] ?? t("language")}</span>
          <CaretDownIcon className="transition-transform duration-200 group-data-[state=open]:rotate-180" size={14} weight="bold" aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={10}
          collisionPadding={16}
          className="z-70 min-w-52 rounded-2xl border border-secondary/10 bg-background p-2 shadow-[0_18px_60px_rgba(3,48,59,0.20)] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <DropdownMenu.Label className="px-3 pb-2 pt-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-secondary/50">
            {t("chooseLanguage")}
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={locale} onValueChange={changeLanguage}>
            {(Object.entries(LANGUAGE_NAMES) as Array<[keyof typeof LANGUAGE_NAMES, string]>).map(([code, name]) => (
              <DropdownMenu.RadioItem
                key={code}
                value={code}
                className="flex cursor-pointer select-none items-center justify-between gap-6 rounded-xl px-3 py-3 font-inter font-semibold text-secondary outline-none transition-colors data-[highlighted]:bg-secondary data-[highlighted]:text-background"
              >
                <span className="flex items-baseline gap-2">
                  <span>{name}</span>
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.12em] opacity-50">{code}</span>
                </span>
                <DropdownMenu.ItemIndicator>
                  <span className="grid size-5 place-items-center rounded-full bg-primary text-secondary">
                    <CheckIcon size={12} weight="bold" aria-hidden="true" />
                  </span>
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const HeaderBanner = () => {
  const bannerT = useTranslations("banner")
  return (
    <div className="w-full bg-destructive text-background font-bold h-12 flex items-center justify-center px-4 overflow-hidden">
      <a href={`tel:${SITE_CONTACT.phone}`} className="uppercase whitespace-nowrap text-[0.7rem] lg:text-[clamp(0.65rem,2.5vw,0.875rem)]">
        {bannerT("company")} {SITE_CONTACT.display}
      </a>
    </div>
  )
}

export default function Navbar() {
  const t = useTranslations("nav")
  const { scrollDirection, scrollY } = useScrollDirection()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isScrollingDown = scrollDirection === "down"
  const isHeaderVisible = scrollY < 50 || !isScrollingDown
  const isHeaderHidden = scrollY > 50 && isScrollingDown && !isSheetOpen

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setIsMenuOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setIsMenuOpen(false), 500)
  }

  // SOLUCIÓN AL ERROR DE CASCADING RENDERS:
  useEffect(() => {
    if (isScrollingDown && isMenuOpen) {
      // Usamos requestAnimationFrame para que el cambio de estado ocurra
      // justo antes del próximo repintado, evitando la "cascada" síncrona.
      const frame = requestAnimationFrame(() => {
        setIsMenuOpen(false);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isScrollingDown, isMenuOpen])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  return (
    <>
      <header className={cn("hidden min-[1200px]:flex flex-col items-center z-50 fixed top-0 w-full transition-transform duration-500", !isHeaderVisible && "-translate-y-44")}>
        <HeaderBanner />
        <div className="w-[95%] max-w-368 mt-4">
          <nav className="relative bg-background h-21 rounded-2xl shadow-2xl flex items-center justify-between px-8">
            <Link
              href="/"
              aria-label="Flying Pictures México — Inicio"
              className="absolute left-1/2 -translate-x-1/2 top-0 z-20 w-19 h-24"
            >
              <CloudinaryImage
                publicId={IMAGES.home.navbar.logo}
                alt="Flying Pictures México Logo" 
                width={200}
                height={200}
                priority
                className="w-full h-full object-contain"
              />
            </Link>

            <div className="flex flex-1 items-center gap-8">
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="h-full flex items-center">
                <DropdownMenu.Root open={isMenuOpen} onOpenChange={setIsMenuOpen} modal={false}>
                  <DropdownMenu.Trigger asChild>
                    <Link href="/flight-experiences" className="font-inter font-bold text-secondary tracking-tight outline-none hover:opacity-70 py-4">{t("flightExperiences")}</Link>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content align="center" alignOffset={-120} sideOffset={18} onCloseAutoFocus={(e) => e.preventDefault()} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="bg-white rounded-lg shadow-xl p-2 z-60 min-w-50">
                      {EXPERIENCES.map((exp) => (
                        <DropdownMenu.Item key={exp.slug} asChild onSelect={() => setIsMenuOpen(false)}>
                          <div><ProductNavLink slug={exp.slug} href={exp.href} className="block px-4 py-2 text-[0.95rem] hover:bg-secondary/5 rounded-md font-poppins font-medium" /></div>
                        </DropdownMenu.Item>
                      ))}
                      <DropdownMenu.Separator className="my-1 h-px bg-secondary/10" />
                      <DropdownMenu.Item asChild onSelect={() => setIsMenuOpen(false)}>
                        <div><NavLink id="corporateService" href="/product/corporate" className="block px-4 py-2 text-[0.95rem] hover:bg-secondary/5 rounded-md font-poppins font-medium" /></div>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
              <NavLink id="safetyHeritage" href="/safety-heritage" />
              <NavLink id="planYourVisit" href="/plan-your-visit" />
            </div>

            <div className="flex flex-1 items-center justify-end gap-8">
              <NavLink id="contactSupport" href="/contact" />
              <LanguageSwitcher />
              <BookButton />
            </div>
          </nav>
        </div>
      </header>

      <header className={cn("min-[1200px]:hidden fixed top-0 inset-x-0 z-50 transition-transform duration-500", isHeaderHidden && "-translate-y-32")}>
        <HeaderBanner />
        <nav className="relative h-18 bg-white px-6 flex items-center justify-between shadow-md">
          <Link
            href="/"
            aria-label="Flying Pictures México — Inicio"
            onClick={() => setIsSheetOpen(false)}
            className="absolute top-0 left-6 z-10 w-15.5 h-19.5"
          >
            <CloudinaryImage
              publicId={IMAGES.home.navbar.logo}
              alt="Flying Pictures México Logo"
              width={200}
              height={200}
              priority
              className="w-full h-full object-contain"
            />
          </Link>
          <div className="flex items-center gap-3 ml-auto">
            <BookButton />
            <SheetPrimitive.Root open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetPrimitive.Trigger asChild>
                <button className="p-1 outline-none" aria-label={t("openMenu")}>
                  <EqualsIcon size={32} weight="bold" aria-hidden="true" />
                </button>
              </SheetPrimitive.Trigger>
              <SheetPrimitive.Portal>
                <SheetPrimitive.Content aria-describedby={undefined} className="fixed inset-y-0 right-0 z-60 flex w-full flex-col bg-surface shadow-xl">
                  <SheetPrimitive.Title className="sr-only">{t("menuTitle")}</SheetPrimitive.Title>

                  <div className="flex h-24 shrink-0 items-center justify-between border-b border-secondary/10 px-5">
                    <Link
                      href="/"
                      aria-label="Flying Pictures México — Inicio"
                      onClick={() => setIsSheetOpen(false)}
                      className="h-16 w-14 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <CloudinaryImage
                        publicId={IMAGES.home.navbar.logo}
                        alt="Flying Pictures México Logo"
                        width={112}
                        height={128}
                        className="h-full w-full object-contain"
                      />
                    </Link>
                    <SheetPrimitive.Close aria-label={t("closeMenu")} className="flex size-12 items-center justify-center rounded-full border border-secondary/15 text-secondary outline-none transition-colors hover:bg-secondary hover:text-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                      <XIcon size={24} weight="bold" aria-hidden="true" />
                    </SheetPrimitive.Close>
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
                    <section aria-labelledby="mobile-flight-menu-title">
                      <p id="mobile-flight-menu-title" className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-secondary/55">
                        {t("chooseFlight")}
                      </p>
                      <div className="overflow-hidden rounded-2xl border border-secondary/10 bg-background shadow-[0_12px_40px_rgba(3,48,59,0.06)]">
                        {MOBILE_FEATURED_EXPERIENCES.map((exp, index) => (
                          <ProductNavLink
                            key={exp.slug}
                            slug={exp.slug}
                            href={exp.href}
                            className={cn(
                              "flex min-h-12 items-center px-4 py-3 text-[1rem] leading-snug hover:bg-secondary/5 hover:opacity-100 aria-[current=page]:bg-secondary aria-[current=page]:text-background",
                              index > 0 && "border-t border-secondary/8",
                            )}
                            onClick={() => setIsSheetOpen(false)}
                          />
                        ))}
                      </div>
                      <Link
                        href="/flight-experiences"
                        onClick={() => setIsSheetOpen(false)}
                        className="mt-3 flex min-h-12 items-center justify-between rounded-full bg-primary px-5 font-inter font-bold text-secondary outline-none transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <span>{t("viewAllExperiences")}</span>
                        <CaretDownIcon size={18} weight="bold" className="-rotate-90" aria-hidden="true" />
                      </Link>
                    </section>

                    <nav aria-label={t("exploreFlying")} className="mt-7 border-t border-secondary/10 pt-4">
                      <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-secondary/55">
                        {t("exploreFlying")}
                      </p>
                      <div className="flex flex-col">
                        <NavLink id="safetyHeritage" href="/safety-heritage" className="flex min-h-12 items-center rounded-xl px-3 text-[1.05rem] hover:bg-secondary/5 hover:opacity-100 aria-[current=page]:bg-secondary aria-[current=page]:text-background" onClick={() => setIsSheetOpen(false)} />
                        <NavLink id="planYourVisit" href="/plan-your-visit" className="flex min-h-12 items-center rounded-xl px-3 text-[1.05rem] hover:bg-secondary/5 hover:opacity-100 aria-[current=page]:bg-secondary aria-[current=page]:text-background" onClick={() => setIsSheetOpen(false)} />
                        <NavLink id="corporateService" href="/product/corporate" className="flex min-h-12 items-center rounded-xl px-3 text-[1.05rem] hover:bg-secondary/5 hover:opacity-100 aria-[current=page]:bg-secondary aria-[current=page]:text-background" onClick={() => setIsSheetOpen(false)} />
                      </div>
                    </nav>

                    <div className="mt-5 border-t border-secondary/10 pt-4">
                      <Link href="/contact" className="flex min-h-12 items-center gap-3 rounded-xl px-3 font-inter font-bold text-secondary outline-none transition-colors hover:bg-secondary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" onClick={() => setIsSheetOpen(false)}>
                        <HeadsetIcon size={22} weight="bold" aria-hidden="true" />
                        {t("contactSupport")}
                      </Link>
                      <LanguageSwitcher mobileInline />
                    </div>
                  </div>

                  <div className="shrink-0 border-t border-secondary/10 bg-background px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-12px_35px_rgba(3,48,59,0.08)]">
                    <BookButton className="w-full" onClick={() => setIsSheetOpen(false)} />
                  </div>
                </SheetPrimitive.Content>
              </SheetPrimitive.Portal>
            </SheetPrimitive.Root>
          </div>
        </nav>
      </header>
    </>
  )
}
