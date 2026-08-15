import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { Link } from "@/i18n/routing";

const TEXT_WRAP = "whitespace-pre-line";

export async function HomeHeroSection() {
  const t = await getTranslations("herosection");

  return (
    <section className="relative min-h-150 h-[95vh] lg:h-screen overflow-hidden">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet={cloudinaryUrl(IMAGES.home.hero.background)} 
        />
        <source
          media="(max-width: 1024px)"
          srcSet={cloudinaryUrl(IMAGES.home.hero.background)}
        />
        <source
          media="(min-width: 1025px)"
          srcSet={cloudinaryUrl(IMAGES.home.hero.background)}
        />
        <img
          src={cloudinaryUrl(IMAGES.home.hero.background)}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-top"
          fetchPriority="high"
        />
      </picture>
      <div className="absolute inset-0 bg-black/10" />

      <div className="absolute inset-0 flex items-end justify-center px-[clamp(0.75rem,5vw,1.5rem)] pb-[clamp(2.5rem,8vh,5rem)] pt-30 text-center lg:pt-40">
        <div className="w-full max-w-5xl flex flex-col items-center gap-[clamp(0.5rem,1vw,1.5rem)]">

          <div className="relative mb-2" style={{ width: '162px', height: '47px' }}>
            <CloudinaryImage
              publicId={IMAGES.home.hero.stars}
              alt="5 Stars"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className={`title hero ${TEXT_WRAP}`}>{t("h1")}</h1>
          <span className={`decorative hero ${TEXT_WRAP}`}>{t("h3")}</span>
          <p className={`paragraph hero ${TEXT_WRAP}`}>{t("paragraph")}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/flight-experiences">{t("ctaPrimary")}</Link>
            </Button>
            <span className="hidden sm:inline-flex items-center px-4 text-sm font-bold text-background">
              {t("ctaSecondary")}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="relative mb-2" style={{ width: '78px', height: '33px' }}>
              <CloudinaryImage
                publicId={IMAGES.home.hero.cameronLogo}
                alt="Cameron Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className={`powered hero text-left ${TEXT_WRAP}`}>{t("poweredBy")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
