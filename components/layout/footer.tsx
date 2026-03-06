import Link from "next/link"
import { CloudinaryImage } from "@/components/CloudinaryImage"
import { IMAGES } from "@/lib/images"
import { getTranslations } from "next-intl/server"

interface FooterProps {
  translations: {
    description: string
    termsConditions: string
    privacyPolicy: string
    cancellations: string
  }
}

const TITLE_CLASSES =
  "font-inter font-bold text-xl leading-tight text-background mb-8"

const LINK_CLASSES =
  "font-inter font-normal text-lg leading-[2rem] text-background/70 hover:text-background transition-colors"

export async function Footer({ translations }: FooterProps) {
  const t = await getTranslations("nav")

  const NAVIGATION_SECTIONS = [
    {
      title: t("flightExperiences"),
      links: [
        { label: t("shared"), href: "/shared" },
        { label: t("private"), href: "/private" },
        { label: t("proposals"), href: "/proposals" },
        { label: t("groups"), href: "/groups" },
      ],
      className: "col-span-1 md:col-span-2",
    },
    {
      title: "Company",
      links: [
        { label: t("safetyHeritage"), href: "/safety-heritage" },
        { label: t("planYourVisit"), href: "/plan-your-visit" },
        { label: t("contactSupport"), href: "/contact" },
      ],
      className: "col-span-1 md:col-span-2",
    },
  ]

  return (
    <footer className="bg-secondary text-background relative pt-0 pb-16 px-4 md:px-10 lg:px-20">
      
      <div className="flex justify-start">
        <Link href="/" className="inline-block">
          <div className="w-[clamp(62px,6vw,87px)]">
            <CloudinaryImage
              publicId={IMAGES.home.navbar.logo}
              alt="Logo"
              width={200}
              height={200}
              className="w-full h-auto object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 mt-12 items-start">
        
        <div className="col-span-2 md:col-span-3 flex flex-col">
          <span className={TITLE_CLASSES}>Flying Pictures México</span>
          <p className="text-background/70 text-pretty">
            {translations.description}
          </p>
        </div>

        {NAVIGATION_SECTIONS.map((section) => (
          <div key={section.title} className="contents">
            <div className="hidden md:block md:col-span-1" />
            <div className={`${section.className} flex flex-col`}>
              <span className={`${TITLE_CLASSES} block`}>
                {section.title}
              </span>

              <nav className="flex flex-col">
                {section.links.map((link) => (
                  <Link key={link.href} href={link.href} className={LINK_CLASSES}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        ))}

        <div className="hidden md:block md:col-span-1" />
        <div className="col-span-2 md:col-span-2">
          <span className={TITLE_CLASSES}>Legal</span>
          <nav className="flex flex-col mt-8">
            <Link href="/legal/terms" className={LINK_CLASSES}>
              {translations.termsConditions}
            </Link>
            <Link href="/legal/privacy" className={LINK_CLASSES}>
              {translations.privacyPolicy}
            </Link>
            <Link href="/legal/cancellation" className={LINK_CLASSES}>
              {translations.cancellations}
            </Link>
          </nav>
        </div>
      </div>

      <div className="w-full h-px bg-background/50 mt-10 mb-10" />

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 font-inter text-[1rem] text-background/70">
        <div className="flex flex-col gap-1">
          <p>© {new Date().getFullYear()} Flying Pictures México. All rights Reserved</p>
          <div className="flex flex-wrap items-center gap-x-4 opacity-80 text-[0.875rem]">
            <span>Design by Late Cosmico</span>
            <span>•</span>
            <div className="group cursor-default">
              Development by{" "}
              <span className="font-bold transition-colors duration-300 group-hover:text-background">
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