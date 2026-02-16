import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";

const TEXT_WRAP = "whitespace-pre-line";
const NAV_OFFSET = "calc(var(--navbar-height, 4.5rem) + 2rem)";

export async function HomeHeroSection() {
  const t = await getTranslations("herosection");

  return (
    <section className="relative h-[95vh] lg:h-screen overflow-hidden pt-[4.5rem] lg:pt-0">
      <div className="absolute inset-0 -z-10 flex justify-center">
        <CloudinaryImage publicId={IMAGES.home.hero.background} alt="Hero Background" fill priority sizes="100vw" className="h-full w-auto object-contain object-top" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute inset-0 flex items-end justify-center px-[clamp(0.75rem,5vw,1.5rem)] text-center">
        <div
  className="w-full max-w-[1024px] flex flex-col items-center gap-[clamp(0.5rem,1vw,1.5rem)]" style={{ paddingTop: NAV_OFFSET, maxHeight: `calc(100vh - ${NAV_OFFSET})` }}>
          <CloudinaryImage publicId={IMAGES.home.hero.stars} alt="5 Stars" width={640} height={160} className="w-40 h-auto object-contain mb-2" />

          <h1 className={`title hero ${TEXT_WRAP}`}>{t("h1")}</h1>

          <h3 className={`decorative hero ${TEXT_WRAP}`}>{t("h3")}</h3>

          <p className={`paragraph hero ${TEXT_WRAP}`}>{t("paragraph")}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button variant="outline" size="sm">{t("ctaPrimary")}</Button>

            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-[color:var(--surface)]">
              {t("ctaSecondary")}
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <CloudinaryImage publicId={IMAGES.home.hero.cameronLogo} alt="Cameron Logo" width={300} height={150} className="w-20 h-auto object-contain" />
            <h5 className={`powered hero ${TEXT_WRAP}`}>{t("poweredBy")}</h5>
          </div>

          <div className="w-full mt-3 flex items-center justify-center overflow-x-auto gap-x-[clamp(0.5rem,3vw,0.75rem)] snap-x snap-mandatory mb-10 lg:overflow-visible lg:flex-wrap lg:overflow-x-visible">
            {IMAGES.home.brandLogos.map((logo) => (
              <div key={logo.publicId} className="flex-shrink-0 snap-center lg:flex-shrink">
                <CloudinaryImage publicId={logo.publicId} alt={logo.alt} width={600} height={600} className="w-[clamp(5rem,16vw,9.375rem)] sm:w-[clamp(6.5rem,10vw,9.375rem)] lg:w-[clamp(6rem,8vw,9.375rem)] h-auto object-contain opacity-80 transition-opacity hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
