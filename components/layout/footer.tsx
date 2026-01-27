"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface FooterProps {
  translations: {
    description: string
    termsConditions: string
    privacyPolicy: string
    cancellations: string
  }
}

const TITLE_CLASSES = "font-inter font-bold text-[1.5rem] leading-tight text-background mb-8"
const LINK_CLASSES = "font-inter font-normal text-[1rem] leading-[2rem] text-background/70 hover:text-background transition-colors"

export function Footer({ translations }: FooterProps) {
  const t = useTranslations("nav")

  const NAVIGATION_SECTIONS = [
    {
      title: t("flightExperiences"),
      links: [
        { id: "shared", href: "/shared" },
        { id: "private", href: "/private" },
        { id: "proposals", href: "/proposals" },
        { id: "groups", href: "/groups" },
      ],
      className: "col-span-1 md:col-span-2",
    },
    {
      title: "Company",
      links: [
        { id: "safetyHeritage", href: "/safety-heritage" },
        { id: "planYourVisit", href: "/plan-your-visit" },
        { id: "contactSupport", href: "/contact" },
      ],
      className: "col-span-1 md:col-span-2",
    },
  ]

  return (
    <footer className="bg-secondary text-background relative pt-0 pb-16 px-4 md:px-10 lg:px-20 transition-all duration-300">
      <div className="flex justify-start">
        <Link href="/" className="inline-block ">
          <Logo className="w-[6.188rem] h-[7.813rem] origin-top" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 mt-12 items-start">
        
        <div className="col-span-2 md:col-span-3 flex flex-col">
          <h3 className={TITLE_CLASSES}>Flying Pictures México</h3>
          <p className="font-inter font-normal text-[1rem] leading-[1.6] text-background/70 text-pretty">
            {translations.description}
          </p>
          
          <div className="flex gap-4 mt-10">
            {[1, 2].map((i) => (
              <div 
                key={i} 
                className="size-12 bg-background/20 rounded-md hover:bg-background/40 transition-colors cursor-pointer" 
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {NAVIGATION_SECTIONS.map((section, index) => (
          <div key={section.title} className="contents">
            <div className="hidden md:block md:col-span-1" />
            <div className={section.className}>
              <h4 className={TITLE_CLASSES}>{section.title}</h4>
              <nav className="flex flex-col">
                {section.links.map((link) => (
                  <Link key={link.id} href={link.href} className={LINK_CLASSES}>
                    {t(link.id)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        ))}

        <div className="hidden md:block md:col-span-1" />
        <div className="col-span-2 md:col-span-2">
          <h4 className={TITLE_CLASSES}>Legal</h4>
          <nav className="flex flex-col">
            <Link href="/legal/terms" className={LINK_CLASSES}>{translations.termsConditions}</Link>
            <Link href="/legal/privacy" className={LINK_CLASSES}>{translations.privacyPolicy}</Link>
            <Link href="/legal/cancellation" className={LINK_CLASSES}>{translations.cancellations}</Link>
          </nav>
        </div>
      </div>

      <div className="w-full h-px bg-background/50 mt-10 mb-10" />

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 font-inter font-normal text-[1rem] text-background/70">
        <div className="flex flex-col gap-1">
          <p>© {new Date().getFullYear()} Flying Pictures México. All rights Reserved</p>
          <div className="flex flex-wrap items-center gap-x-4 opacity-80 text-[0.875rem]">
            <span>Design by Late Cosmico</span>
            <span>•</span>
            <div className="group cursor-default">
              Development by{" "}
              <span className="text-[#ED1C24] font-bold transition-colors duration-300 group-hover:text-background">
                Team 3
              </span>
            </div>
          </div>
        </div>

        <div className="text-left md:text-right flex flex-col items-start md:items-end text-[0.875rem]">
          <p>MX Civil Aviation Authority Reg: 88291</p>
          <p>Keywords</p>
        </div>
      </div>
    </footer>
  )
}