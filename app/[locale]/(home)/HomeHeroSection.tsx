import Image from "next/image";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";
import { cloudinaryUrl } from "@/lib/cloudinary";

const TEXT_WRAP = "whitespace-pre-line";
const NAV_OFFSET = "calc(var(--navbar-height, 4.5rem) + 2rem)";
const HERO_W = 828;
const HERO_H = 466;

export async function HomeHeroSection() {
  const t = await getTranslations("herosection");

  const heroMobileSrc = cloudinaryUrl(IMAGES.home.hero.background, HERO_W, {
    height: HERO_H,
    crop: "fill",
    gravity: "auto",
  });
  const heroDesktopSrc = cloudinaryUrl(IMAGES.home.hero.background, 1920);

  return (
    <section className="relative overflow-hidden pt-18 lg:pt-0">
      {/* Mobile: dimensiones explícitas → browser reserva espacio antes de descargar → sin stretch */}
      <div className="relative w-full lg:hidden" style={{ aspectRatio: `${HERO_W}/${HERO_H}` }}>
        <Image
          src={heroMobileSrc}
          alt="Hero Background"
          width={HERO_W}
          height={HERO_H}
          priority
          fetchPriority="high"
          className="w-full h-full object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Desktop: fill normal con altura definida */}
      <div className="hidden lg:block relative h-screen">
        <Image
          src={heroDesktopSrc}
          alt="Hero Background"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-top"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Contenido: fluye en mobile, se superpone en desktop */}
      <div className="lg:absolute lg:inset-0 flex items-end justify-center px-[clamp(0.75rem,5vw,1.5rem)] text-center">
        <div
          className="w-full max-w-5xl flex flex-col items-center gap-[clamp(0.5rem,1vw,1.5rem)]"
          style={{ paddingTop: NAV_OFFSET, maxHeight: `calc(100vh - ${NAV_OFFSET})` }}
        >
          <CloudinaryImage
            publicId={IMAGES.home.hero.stars}
            alt="5 Stars"
            width={640}
            height={160}
            className="w-40 h-auto object-contain mb-2"
            priority
          />
          <h1 className={`title hero ${TEXT_WRAP}`}>{t("h1")}</h1>
          <h3 className={`decorative hero ${TEXT_WRAP}`}>{t("h3")}</h3>
          <p className={`paragraph hero ${TEXT_WRAP}`}>{t("paragraph")}</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button variant="outline" size="sm">{t("ctaPrimary")}</Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-background">
              {t("ctaSecondary")}
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <CloudinaryImage
              publicId={IMAGES.home.hero.cameronLogo}
              alt="Cameron Logo"
              width={300}
              height={150}
              className="w-20 h-auto object-contain"
            />
            <span className={`powered hero ${TEXT_WRAP}`}>{t("poweredBy")}</span>
          </div>
          <div className="w-full mt-3 flex items-center justify-center overflow-x-auto gap-x-[clamp(0.5rem,3vw,0.75rem)] snap-x snap-mandatory mb-10 lg:overflow-visible lg:flex-wrap lg:overflow-x-visible">
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