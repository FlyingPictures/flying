import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { IMAGES } from "@/lib/images";
// import { WhatsappLogoIcon } from "@phosphor-icons/react"

const TEXT_WRAP = "whitespace-pre-line";
const NAV_OFFSET = "calc(var(--navbar-height, 4.5rem) + 2rem)";

export async function FlightHero() {
  const t = await getTranslations("flightExperiences.hero");

  return (
    <section className="relative h-[95vh] lg:h-screen overflow-hidden pt-[4.5rem] lg:pt-0">
      <div className="absolute inset-0 flex justify-center">
        <CloudinaryImage
          publicId={IMAGES.flightExperiences.hero.background}
          alt="Hero Background"
          fill
          priority
          className="h-full w-auto object-contain object-top"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute inset-0 flex items-end justify-center px-[clamp(0.75rem,5vw,1.5rem)] text-center">
        <div
          className="w-full max-w-[1024px] flex flex-col items-center gap-4 sm:gap-6"
          style={{
            paddingTop: NAV_OFFSET,
            maxHeight: `calc(100vh - ${NAV_OFFSET})`
          }}
        >
          <h1 className={`title hero ${TEXT_WRAP}`}>
            {t("pageTitle")}
          </h1>

          <h3 className={`decorative hero ${TEXT_WRAP}`}>
            {t("experiencesList")}
          </h3>

          <p className={`paragraph hero ${TEXT_WRAP}`}>
            {t("pageDescription")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button variant="outline" size="sm" className="px-10">
              {t("ctaFlightPrimary")}
            </Button>
          </div>

          <div className="mt-4">
            <Button variant="ghost" size="md" className="flex items-center gap-2 text-background">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentcolor" viewBox="0 0 256 256"><path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path></svg>
              {t("talkFlight")}
            </Button>
          </div>

          <div className="w-full mt-6 mb-30 flex justify-center mt-20">
            <CloudinaryImage
              publicId="trustbadges1_2x_1_1_pq9pzn"
              alt="Award Badge"
              width={2000}
              height={800}
              className="w-[257px] lg:w-[542px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
