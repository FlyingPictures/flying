'use client'

import { useState, useMemo, useEffect, useRef } from "react"
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
import { useTranslations, useLocale } from "next-intl"
import { cn } from "@/lib/utils"

const CONTACT = {
  PHONE: "+525558025-1057",
  DISPLAY: "(+52) 55 8025-1057",
} as const

const EXPERIENCES = [
  { id: "shared", href: "/shared-flight" },
  { id: "private", href: "/private-flight" },
  { id: "proposals", href: "/private-flight" },
  { id: "groups", href: "/private-flight" },
] as const

const NavLink = ({
  id,
  href,
  className,
  onClick,
}: {
  id: string
  href: string
  className?: string
  onClick?: () => void
}) => {
  const t = useTranslations("nav")
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "font-inter font-bold text-secondary tracking-tight transition-opacity hover:opacity-70 outline-none",
        className
      )}
    >
      {t(id)}
    </Link>
  )
}

const ExperienceLink = ({
  id,
  href,
  onClick,
  className,
}: {
  id: string
  href: string
  onClick?: () => void
  className?: string
}) => {
  const t = useTranslations("nav")
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "font-poppins font-medium text-secondary hover:opacity-70 transition-opacity outline-none",
        className
      )}
    >
      {t(id)}
    </Link>
  )
}

const BookButton = ({ className }: { className?: string }) => {
  const t = useTranslations("nav")
  return (
    <Button variant="primary" size="sm" className={cn("px-8 font-bold", className)}>
      {t("bookFlight")}
    </Button>
  )
}

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const { nextLocale, label } = useMemo(
    () => ({
      nextLocale: locale === "en" ? "es" : "en",
      label: locale === "en" ? "Language" : "Idioma",
    }),
    [locale]
  )

  return (
    <button
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className={cn(
        "font-inter font-bold text-secondary flex items-center gap-2 hover:opacity-70 transition-opacity outline-none",
        className
      )}
    >
      <GlobeSimpleIcon size={20} weight="bold" /> {label}
    </button>
  )
}

export default function Navbar() {
  const t = useTranslations("nav")
  const bannerT = useTranslations("banner")

  const { scrollDirection, scrollY } = useScrollDirection()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isHeaderVisible = scrollY < 50 || scrollDirection === "up"
  const isHeaderHidden =
    scrollY > 50 && scrollDirection === "down" && !isSheetOpen

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setIsMenuOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false)
    }, 150)
  }

  useEffect(() => {
    if (scrollDirection === "down" && isMenuOpen) {
      setIsMenuOpen(false)
    }
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [scrollDirection, isMenuOpen])

  return (
    <>
      {/* DESKTOP */}
      <header
        className={cn(
          "hidden lg:flex flex-col items-center z-50 fixed top-0 w-full transition-transform duration-500",
          !isHeaderVisible && "-translate-y-[11rem]"
        )}
      >
        <div className="w-full bg-destructive text-background font-bold h-12 flex items-center justify-center px-4">
          <a href={`tel:${CONTACT.PHONE}`} className="uppercase whitespace-nowrap">
            {bannerT("company")} {CONTACT.DISPLAY}
          </a>
        </div>

        {/* ... resto del código desktop SIN CAMBIOS ... */}
      </header>

      {/* MOBILE */}
      {/* ... mobile header SIN CAMBIOS ... */}
    </>
  )
}
