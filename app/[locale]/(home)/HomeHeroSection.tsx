import { CameronBalloonsLogo } from "@/components/CameronBalloonsLogo";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";
import { HomeHeroSlideshow } from "@/components/HomeHeroSlideshow";
import { Link } from "@/i18n/routing";

const TEXT_WRAP = "whitespace-pre-line";

export async function HomeHeroSection() {
  const t = await getTranslations("herosection");

  return (
    <section className="relative min-h-[95svh] overflow-hidden lg:h-screen">
      <HomeHeroSlideshow />
      <div className="absolute inset-0 bg-linear-to-t from-secondary/80 via-secondary/10 to-transparent" />

      <div className="relative z-10 flex min-h-[95svh] items-end justify-center px-[clamp(0.75rem,5vw,1.5rem)] pb-[clamp(2.5rem,8vh,5rem)] pt-36 text-center lg:absolute lg:inset-0 lg:min-h-0 lg:pt-40">
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
            <CameronBalloonsLogo className="mb-2 w-[78px]" />
            <span className={`powered hero text-left ${TEXT_WRAP}`}>{t("poweredBy")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
