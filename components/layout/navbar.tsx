"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { BrandLogo } from "@/components/BrandLogo"
import { Button } from "@/components/ui/button"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import {
  EqualsIcon,
  XIcon,
  HeadsetIcon,
  CaretDownIcon,
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

const LANGUAGES = [
  { code: "es", name: "Español", flag: "/flags/mx.png" },
  { code: "en", name: "English", flag: "/flags/us.png" },
] as const

type LanguageCode = (typeof LANGUAGES)[number]["code"]

function persistPreferredLocale(nextLocale: LanguageCode) {
  document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`
  window.localStorage.setItem("preferred-locale", nextLocale)
}

const LanguageSwitcher = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations("nav")

  const changeLanguage = (nextLocale: LanguageCode) => {
    if (nextLocale === locale) return
    persistPreferredLocale(nextLocale)

    const query = searchParams.toString()
    const destination = query ? `${pathname}?${query}` : pathname
    router.replace(destination + window.location.hash, { locale: nextLocale, scroll: false })
  }

  return (
    <div role="group" aria-label={t("switchLanguage")} className="inline-flex shrink-0 items-center rounded-full border border-secondary/15 bg-secondary/5 p-0.5">
      {LANGUAGES.map(({ code, name, flag }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={name}
          aria-pressed={locale === code}
          onClick={() => changeLanguage(code)}
          className="relative inline-flex h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-full px-1.5 font-inter text-[0.68rem] leading-none font-bold text-secondary transition-colors hover:bg-secondary/10 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary aria-pressed:bg-secondary aria-pressed:text-white motion-reduce:transition-none min-[390px]:flex-row min-[390px]:gap-1 min-[390px]:px-2 min-[390px]:text-xs xl:px-3"
        >
          <Image src={flag} alt="" width={18} height={12} unoptimized className="h-3 w-[18px] rounded-[2px] object-cover ring-1 ring-black/10" />
          <span className="uppercase sm:hidden lg:inline xl:hidden">{code}</span>
          <span className="hidden sm:inline lg:hidden xl:inline">{name}</span>
        </button>
      ))}
    </div>
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
    const desktop = window.matchMedia("(min-width: 64rem)")
    const closeMenus = () => {
      setIsMenuOpen(false)
      setIsSheetOpen(false)
    }
    desktop.addEventListener("change", closeMenus)
    return () => desktop.removeEventListener("change", closeMenus)
  }, [])

  return (
    <>
      <header data-hidden={isHeaderHidden} className={cn("desktop-header pointer-events-none fixed inset-x-0 top-0 z-50 hidden flex-col items-center transition-transform duration-200 motion-reduce:transition-none lg:flex [&>*]:pointer-events-auto",
        isHeaderHidden ? "-translate-y-[calc(100%+1rem)]" : scrollY > 80 && "-translate-y-12")}>
        <HeaderBanner />
        <div className="site-frame mt-4">
          <nav aria-label={t("menuTitle")} className="relative grid h-21 grid-rows-[100%] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-3 items-center rounded-2xl bg-background px-4 min-[1200px]:gap-x-6 min-[1200px]:px-5 shadow-2xl min-[1440px]:px-8">
            <Link
              href="/"
              aria-label={locale === "es" ? "Flying Pictures México — Inicio" : "Flying Pictures México — Home"}
              className="relative z-20 col-start-2 row-start-1 h-21 w-[4.2rem] self-start min-[1200px]:h-24 min-[1200px]:w-19"
            >
              <BrandLogo priority className="w-full h-full object-contain" />
            </Link>

            <div className="col-start-1 row-start-1 flex items-center gap-x-[clamp(.75rem,16vw_-_9.5rem,1.75rem)] whitespace-nowrap text-sm min-[1440px]:text-base">
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

            <div className="col-start-3 row-start-1 flex items-center justify-end gap-2 min-[1200px]:gap-3 whitespace-nowrap text-sm min-[1440px]:gap-7 min-[1440px]:text-base">
              <NavLink id="contactSupport" href="/contact" />
              <LanguageSwitcher />
              {showBookButton && <BookButton className="max-[1199px]:px-4 max-[1199px]:text-sm" />}
            </div>
          </nav>
        </div>
      </header>

      <header className={cn("lg:hidden fixed top-0 inset-x-0 z-50 transition-transform duration-200 motion-reduce:transition-none has-[:focus-visible]:translate-y-0", isHeaderHidden ? "-translate-y-32" : scrollY > 80 && !isSheetOpen && "-translate-y-12")}>
        <HeaderBanner />
        <nav className="flex h-18 items-center justify-between gap-1 bg-white px-1 shadow-md min-[360px]:px-3 sm:px-6">
          <Link
            href="/"
            aria-label={locale === "es" ? "Flying Pictures México — Inicio" : "Flying Pictures México — Home"}
            onClick={() => setIsSheetOpen(false)}
            className="z-10 h-18 w-10 shrink-0 self-start min-[360px]:h-19.5 min-[360px]:w-15.5"
          >
            <BrandLogo priority className="w-full h-full object-contain" />
          </Link>
          <div className="ml-auto flex items-center gap-1 min-[420px]:gap-2 sm:gap-3">
            <LanguageSwitcher />
            {showBookButton && <BookButton className="h-11 px-2 text-xs min-[360px]:px-2.5 min-[360px]:text-sm min-[420px]:px-4 sm:h-12 sm:px-6" />}
            <SheetPrimitive.Root open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetPrimitive.Trigger asChild>
                <button type="button" aria-label={t("openMenu")} className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-full min-[480px]:px-2.5 text-sm font-bold text-secondary hover:bg-secondary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">
                  <EqualsIcon size={22} weight="bold" aria-hidden="true" />
                  <span className="hidden min-[480px]:inline">{t("menu")}</span>
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
