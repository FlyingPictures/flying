import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";
import { cloudinaryUrl } from "@/lib/cloudinary";

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

      <div className="absolute inset-0 flex items-end justify-center px-[clamp(0.75rem,5vw,1.5rem)] text-center pt-30 lg:pt-40">
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
            <Button variant="outline" size="sm">{t("ctaPrimary")}</Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-background">
              {t("ctaSecondary")}
            </Button>
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
            <span className={`powered hero ${TEXT_WRAP}`}>{t("poweredBy")}</span>
          </div>

          <div className="w-full mt-3 flex items-center justify-center overflow-x-auto gap-x-[clamp(0.5rem,3vw,0.75rem)] snap-x snap-mandatory mb-10 lg:overflow-visible lg:flex-wrap">
            {IMAGES.home.brandLogos.map((logo) => (
              <div key={logo.publicId} className="shrink-0 snap-center lg:shrink">
                <CloudinaryImage
                  publicId={logo.publicId}
                  alt={logo.alt}
                  width={150}
                  height={150}
                  className="w-[clamp(5rem,16vw,9.375rem)] sm:w-[clamp(6.5rem,10vw,9.375rem)] lg:w-[clamp(6rem,8vw,9.375rem)] h-auto object-contain opacity-80 transition-opacity hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}