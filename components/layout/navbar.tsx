"use client"

import { useState, useEffect, useRef } from "react"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import {
  EqualsIcon,
  XIcon,
  HeadsetIcon,
  GlobeSimpleIcon,
} from "@phosphor-icons/react"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { useLocale, useTranslations } from 'next-intl'
import { cn } from "@/lib/utils"

const CONTACT = { PHONE: "+525558025-1057", DISPLAY: "(+52) 55 8025-1057" } as const

const EXPERIENCES = [
  { id: "classic",     href: "/product/classic" },
  { id: "journey",     href: "/product/journey" },
  { id: "vip",         href: "/product/vip" },
  { id: "proposal",    href: "/product/proposal" },
  { id: "anniversary", href: "/product/anniversary" },
  { id: "birthday",    href: "/product/birthday" },
  { id: "corporate",   href: "/product/corporate" },
  { id: "open",        href: "/product/open" },
  { id: "transport",   href: "/product/transport" },
] as const

const NavLink = ({ id, href, className = "", onClick }: { id: string; href: string; className?: string; onClick?: () => void }) => {
  const t = useTranslations("nav")
  return <Link href={href} onClick={onClick} className={cn("font-inter font-bold text-secondary tracking-tight transition-opacity hover:opacity-70 outline-none", className)}>{t(id)}</Link>
}

const BookButton = ({ size = "md", variant = "primary", className = "" }: { size?: "md" | "floating"; variant?: "primary" | "secondary"; className?: string }) => {
  const t = useTranslations("nav")
  return <Button variant={variant} size={size} className={cn("px-8 font-bold", className)}>{t("bookFlight")}</Button>
}

const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations("nav")
  return (
    <button onClick={() => router.replace(pathname, { locale: locale === "en" ? "es" : "en" })} className={cn("font-inter font-bold text-secondary flex items-center gap-2 hover:opacity-70 transition-opacity outline-none", className)}>
      <GlobeSimpleIcon size={20} weight="bold" />
      {t("language")}
    </button>
  )
}

const HeaderBanner = () => {
  const bannerT = useTranslations("banner")
  return (
    <div className="w-full bg-destructive text-background font-bold h-12 flex items-center justify-center px-4 overflow-hidden">
      <a href={`tel:${CONTACT.PHONE}`} className="uppercase whitespace-nowrap text-[0.7rem] lg:text-[clamp(0.65rem,2.5vw,0.875rem)]">
        {bannerT("company")} {CONTACT.DISPLAY}
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

  useEffect(() => {
    if (isScrollingDown && isMenuOpen) {
      const id = setTimeout(() => setIsMenuOpen(false), 0)
      return () => {
        clearTimeout(id)
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
      }
    }
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [isScrollingDown, isMenuOpen])

  return (
    <>
      <header className={cn("hidden lg:flex flex-col items-center z-50 fixed top-0 w-full transition-transform duration-500", !isHeaderVisible && "-translate-y-44")}>
        <HeaderBanner />
        <div className="w-[95%] max-w-[92rem] mt-4">
          <nav className="relative bg-background h-[5.125rem] rounded-2xl shadow-2xl flex items-center justify-between px-8">
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-0 z-20 w-[4.75rem] h-24"><Logo className="w-full h-full" /></Link>
            
            <div className="flex flex-1 items-center gap-8">
              <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="h-full flex items-center">
                <DropdownMenu.Root open={isMenuOpen} onOpenChange={setIsMenuOpen} modal={false}>
                  <DropdownMenu.Trigger asChild>
                    <Link href="/flight-experiences" className="font-inter font-bold text-secondary tracking-tight outline-none hover:opacity-70 py-4">{t("flightExperiences")}</Link>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content align="center" alignOffset={-120} sideOffset={18} onCloseAutoFocus={(e) => e.preventDefault()} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="bg-white rounded-lg shadow-xl p-2 z-[60] min-w-[200px]">
                      {EXPERIENCES.map((exp) => (
                        <DropdownMenu.Item key={exp.id} asChild onSelect={() => setIsMenuOpen(false)}>
                          <div><NavLink id={exp.id} href={exp.href} className="block px-4 py-2 text-[0.95rem] hover:bg-secondary/5 rounded-md font-poppins font-medium" /></div>
                        </DropdownMenu.Item>
                      ))}
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

      <header className={cn("lg:hidden fixed top-0 inset-x-0 z-50 transition-transform duration-500", isHeaderHidden && "-translate-y-[8rem]")}>
        <HeaderBanner />
        <nav className="relative h-[4.5rem] bg-surface px-6 flex items-center justify-between shadow-md">
          <Link href="/" onClick={() => setIsSheetOpen(false)} className="absolute top-0 left-6 z-10"><Logo className="w-[3.875rem] h-[4.875rem]" /></Link>
          <div className="flex items-center gap-3 ml-auto">
            <BookButton />
            <SheetPrimitive.Root open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetPrimitive.Trigger asChild><button className="p-1 outline-none"><EqualsIcon size={32} weight="bold" /></button></SheetPrimitive.Trigger>
              <SheetPrimitive.Portal>
                <SheetPrimitive.Content className="fixed inset-y-0 right-0 z-[60] w-full bg-surface flex flex-col shadow-xl">
                  <SheetPrimitive.Title className="sr-only">{t("flightExperiences")}</SheetPrimitive.Title>
                  <div className="relative h-[10rem] flex items-center justify-between px-6 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-[90%] before:border-b before:content-['']">
                    <BookButton />
                    <SheetPrimitive.Close className="rounded-full size-10 flex items-center justify-center"><XIcon size={24} weight="bold" /></SheetPrimitive.Close>
                  </div>
                  <div className="flex flex-col flex-1 px-10 py-10 gap-5 overflow-y-auto">
                    <NavLink id="flightExperiences" href="/flight-experiences" className="text-[1.5rem]" onClick={() => setIsSheetOpen(false)} />
                    <div className="flex flex-col gap-4">
                      {EXPERIENCES.map((exp) => (
                        <NavLink key={exp.id} id={exp.id} href={exp.href} className="text-[1.15rem]" onClick={() => setIsSheetOpen(false)} />
                      ))}
                    </div>
                    <div className="flex flex-col gap-6 mt-8">
                      <NavLink id="safetyHeritage" href="/safety-heritage" className="text-[1.5rem]" onClick={() => setIsSheetOpen(false)} />
                      <NavLink id="planYourVisit" href="/plan-your-visit" className="text-[1.5rem]" onClick={() => setIsSheetOpen(false)} />
                    </div>
                    <div className="mt-auto pb-8 flex flex-col gap-6">
                      <Link href="/contact" className="font-inter font-bold flex items-center gap-2" onClick={() => setIsSheetOpen(false)}><HeadsetIcon size={24} weight="bold" />{t("contactSupport")}</Link>
                      <LanguageSwitcher />
                    </div>
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