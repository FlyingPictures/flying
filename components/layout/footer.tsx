import { Link } from "@/i18n/routing"
import { CloudinaryImage } from "@/components/CloudinaryImage"
import { IMAGES } from "@/lib/images"
import { getLocale, getTranslations } from "next-intl/server"
import { PACKAGE_SLUGS, getProductName } from "@/lib/commercial-config"

interface FooterProps {
  translations: {
    description: string
    companyTitle: string
    legalTitle: string
    rights: string
    authority: string
    termsConditions: string
    privacyPolicy: string
    cancellations: string
  }
}

const TITLE_CLASSES =
  "font-inter font-bold text-xl leading-tight text-background mb-5"

const LINK_CLASSES =
  "font-inter font-normal text-base lg:text-lg leading-7 text-background/70 hover:text-background transition-colors break-words"

export async function Footer({ translations }: FooterProps) {
  const [t, locale] = await Promise.all([
    getTranslations("nav"),
    getLocale(),
  ])

  const NAVIGATION_SECTIONS = [
    {
      title: t("flightExperiences"),
      links: PACKAGE_SLUGS.map((slug) => ({
        label: getProductName(slug, locale),
        href: `/product/${slug}`,
      })),
      navClassName: "",
    },
    {
      title: translations.companyTitle,
      links: [
        { label: t("safetyHeritage"), href: "/safety-heritage" },
        { label: t("planYourVisit"), href: "/plan-your-visit" },
        { label: t("contactSupport"), href: "/contact" },
        { label: t("corporateService"), href: "/product/corporate" },
      ],
      navClassName: "",
    },
  ]

  return (
    <footer className="bg-secondary text-background relative pt-0 pb-16 px-5 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-310">
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

        <div className="grid grid-cols-1 md:grid-cols-2 min-[1200px]:grid-cols-[1.15fr_1.5fr_1fr_0.85fr] gap-x-10 lg:gap-x-14 gap-y-12 mt-12 items-start">
        
        <div className="min-w-0 flex flex-col">
          <span className={TITLE_CLASSES}>Flying Pictures México</span>
          <p className="text-background/70 text-pretty">
            {translations.description}
          </p>
        </div>

        {NAVIGATION_SECTIONS.map((section) => (
            <div key={section.title} className="min-w-0 flex flex-col">
              <span className={`${TITLE_CLASSES} block`}>
                {section.title}
              </span>

              <nav className={`grid min-w-0 grid-cols-1 gap-y-1 ${section.navClassName}`}>
                {section.links.map((link) => (
                  <Link key={link.href} href={link.href} className={LINK_CLASSES}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
        ))}

        <div className="min-w-0">
          <span className={TITLE_CLASSES}>{translations.legalTitle}</span>
          <nav className="flex flex-col gap-y-1">
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
          <p>© {new Date().getFullYear()} Flying Pictures México. {translations.rights}</p>
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
          <p>{translations.authority}</p>
        </div>
        </div>
      </div>
    </footer>
  )
}
