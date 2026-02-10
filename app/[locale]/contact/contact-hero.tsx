import { getTranslations } from "next-intl/server";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { IMAGES } from "@/lib/images";

const TEXT_WRAP = "whitespace-pre-line";
const NAV_OFFSET = "calc(var(--navbar-height, 4.5rem) + 2rem)";

export async function ContactHero() {
  const t = await getTranslations("contact");

  return (
    <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden pt-[4.5rem] lg:pt-0">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <CloudinaryImage
          publicId={IMAGES.contactHero.background}
          alt="Contact Hero"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end justify-center px-4 text-center">
        <div
          className="w-full max-w-3xl flex flex-col items-center"
          style={{
            paddingTop: NAV_OFFSET,
            maxHeight: `calc(100vh - ${NAV_OFFSET})`,
          }}
        >
          <h1 className={`title hero ${TEXT_WRAP} mb-4`}>
            {t("heroTitle")}
          </h1>

          <h3 className={`decorative hero ${TEXT_WRAP} mb-4`}>
            {t("heroSubtitle")}
          </h3>

          <p className={`paragraph hero ${TEXT_WRAP}`}>
            {t("heroDescription")}
          </p>
        </div>
      </div>
    </section>
  );
}
