"use client"

import { useState, useEffect } from "react"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { BrandLogo } from "@/components/BrandLogo"
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

const LanguageSwitcher = ({
  className = "",
  onSelect,
  mobileCompact = false,
}: {
  className?: string
  onSelect?: () => void
  mobileCompact?: boolean
}) => {
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

  if (mobileCompact) {
    return (
      <div
        role="group"
        aria-label={t("switchLanguage")}
        className={cn("flex h-12 items-center rounded-full border border-secondary/10 bg-secondary/6 p-0.5 pl-2.5", className)}
      >
        <GlobeSimpleIcon className="mr-1 shrink-0 text-secondary" size={18} weight="bold" aria-hidden="true" />
        {(Object.entries(LANGUAGE_NAMES) as Array<[keyof typeof LANGUAGE_NAMES, string]>).map(([code]) => (
          <button
            key={code}
            type="button"
            aria-pressed={locale === code}
            aria-label={LANGUAGE_NAMES[code]}
            onClick={() => changeLanguage(code)}
            className="grid h-11 min-w-11 place-items-center rounded-full px-2 font-inter text-xs font-bold uppercase text-secondary outline-none transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-primary data-[active=true]:bg-secondary data-[active=true]:text-background"
            data-active={locale === code}
          >
            {code}
          </button>
        ))}
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
    <div className="flex h-12 w-full flex-col items-center justify-center gap-x-2 bg-destructive px-2 text-[0.7rem] font-bold text-background sm:flex-row lg:text-sm">
      <span>{bannerT("company")}</span>
      <span className="flex items-center gap-2 whitespace-nowrap">
        <a href={`tel:${SITE_CONTACT.phone}`}>{SITE_CONTACT.display}</a>
        <span aria-hidden="true">/</span>
        <a href={`tel:${SITE_CONTACT.whatsappPhone}`}>{SITE_CONTACT.whatsappDisplay}</a>
      </span>
    </div>
  )
}

export default function Navbar() {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const showBookButton = pathname !== "/flight-experiences" && !pathname.startsWith("/product/")
  const { scrollDirection, scrollY } = useScrollDirection()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const isHeaderHidden = scrollY > 160 && scrollDirection === "down" && !isSheetOpen && !isMenuOpen
  const locale = useLocale()

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)")
    const closeMenus = () => {
      setIsMenuOpen(false)
      setIsSheetOpen(false)
    }
    desktop.addEventListener("change", closeMenus)
    return () => desktop.removeEventListener("change", closeMenus)
  }, [])

  return (
    <>
      <header data-hidden={isHeaderHidden} className={cn("desktop-header pointer-events-none fixed inset-x-0 top-0 z-50 hidden flex-col items-center transition-transform duration-200 motion-reduce:transition-none min-[1200px]:flex [&>*]:pointer-events-auto",
        isHeaderHidden ? "-translate-y-[calc(100%+1rem)]" : scrollY > 80 && "-translate-y-12")}>
        <HeaderBanner />
        <div className="site-frame mt-4">
          <nav aria-label={t("menuTitle")} className="relative grid h-21 grid-rows-[100%] grid-cols-[minmax(0,1fr)_4.75rem_minmax(0,1fr)] gap-x-6 items-center rounded-2xl bg-background px-5 shadow-2xl min-[1440px]:px-8">
            <Link
              href="/"
              aria-label={locale === "es" ? "Flying Pictures México — Inicio" : "Flying Pictures México — Home"}
              className="relative z-20 col-start-2 row-start-1 h-24 w-19 self-start"
            >
              <BrandLogo priority className="w-full h-full object-contain" />
            </Link>

            <div className="col-start-1 row-start-1 flex items-center gap-[clamp(.75rem,1.5vw,1.75rem)] whitespace-nowrap text-[0.875rem] min-[1440px]:gap-7 min-[1440px]:text-base">
              <div className="flex items-center">
                <NavLink id="flightExperiences" href="/flight-experiences" />
                <DropdownMenu.Root open={isMenuOpen} onOpenChange={setIsMenuOpen} modal={false}>
                  <DropdownMenu.Trigger asChild>
                    <button type="button" aria-label={t("chooseFlight")} className="grid h-11 w-8 place-items-center rounded-lg text-secondary hover:bg-secondary/5 focus-visible:ring-2 focus-visible:ring-primary">
                      <CaretDownIcon size={16} weight="bold" className={cn("transition-transform", isMenuOpen && "rotate-180")} />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content align="start" alignOffset={-72} side="bottom" sideOffset={8} collisionPadding={12}
                      className="z-60 max-h-(--radix-dropdown-menu-content-available-height) min-w-60 overflow-y-auto overscroll-contain rounded-xl border border-secondary/10 bg-white p-2 shadow-xl">
                      {EXPERIENCES.map((exp) => (
                        <DropdownMenu.Item key={exp.slug} asChild>
                          <Link href={exp.href} aria-current={pathname === exp.href ? "page" : undefined}
                            className="block rounded-md px-4 py-2 font-medium outline-none data-[highlighted]:bg-secondary/8">
                            {getProductName(exp.slug, locale)}
                          </Link>
                        </DropdownMenu.Item>
                      ))}
                      <DropdownMenu.Separator className="my-1 h-px bg-secondary/10" />
                      <DropdownMenu.Item asChild>
                        <Link href="/product/corporate" className="block rounded-md px-4 py-2 font-medium outline-none data-[highlighted]:bg-secondary/8">{t("corporateService")}</Link>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
              <NavLink id="safetyHeritage" href="/safety-heritage" />
              <NavLink id="planYourVisit" href="/plan-your-visit" />
            </div>

            <div className="col-start-3 row-start-1 flex items-center justify-end gap-3 whitespace-nowrap text-sm min-[1440px]:gap-7 min-[1440px]:text-base">
              <NavLink id="contactSupport" href="/contact" />
              <LanguageSwitcher />
              {showBookButton && <BookButton />}
            </div>
          </nav>
        </div>
      </header>

      <header className={cn("min-[1200px]:hidden fixed top-0 inset-x-0 z-50 transition-transform duration-200 motion-reduce:transition-none has-[:focus-visible]:translate-y-0", isHeaderHidden ? "-translate-y-32" : scrollY > 80 && !isSheetOpen && "-translate-y-12")}>
        <HeaderBanner />
        <nav className="relative h-18 bg-white px-6 flex items-center justify-between shadow-md">
          <Link
            href="/"
            aria-label={locale === "es" ? "Flying Pictures México — Inicio" : "Flying Pictures México — Home"}
            onClick={() => setIsSheetOpen(false)}
            className="absolute top-0 left-6 z-10 w-15.5 h-19.5"
          >
            <BrandLogo priority className="w-full h-full object-contain" />
          </Link>
          <div className="flex items-center gap-3 ml-auto">
            {showBookButton && <BookButton />}
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
                      aria-label={locale === "es" ? "Flying Pictures México — Inicio" : "Flying Pictures México — Home"}
                      onClick={() => setIsSheetOpen(false)}
                      className="h-16 w-14 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <BrandLogo className="h-full w-full object-contain" />
                    </Link>
                    <div className="flex items-center gap-2">
                      <LanguageSwitcher mobileCompact onSelect={() => setIsSheetOpen(false)} />
                      <SheetPrimitive.Close aria-label={t("closeMenu")} className="flex size-12 items-center justify-center rounded-full border border-secondary/15 text-secondary outline-none transition-colors hover:bg-secondary hover:text-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                        <XIcon size={24} weight="bold" aria-hidden="true" />
                      </SheetPrimitive.Close>
                    </div>
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
                    <section aria-labelledby="mobile-flight-menu-title">
                      <p id="mobile-flight-menu-title" className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-secondary/55">
                        {t("chooseFlight")}
                      </p>
                      <div className="overflow-hidden rounded-2xl border border-secondary/10 bg-background shadow-[0_12px_40px_rgba(3,48,59,0.06)]">
                        {EXPERIENCES.map((exp, index) => (
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
                    </div>
                  </div>

                  {showBookButton && (
                    <div className="shrink-0 border-t border-secondary/10 bg-background px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-12px_35px_rgba(3,48,59,0.08)]">
                      <BookButton className="w-full" onClick={() => setIsSheetOpen(false)} />
                    </div>
                  )}
                </SheetPrimitive.Content>
              </SheetPrimitive.Portal>
            </SheetPrimitive.Root>
          </div>
        </nav>
      </header>
    </>
  )
}
