import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cloudinaryUrl } from "@/lib/cloudinary";

export default async function ProductFooter() {
  const t = await getTranslations("product.footer");

  return (
    <section className="relative w-full overflow-hidden">
      
      {/* Simulación de sección anterior */}
      <div className="absolute top-0 left-0 w-full h-6 bg-background rounded-b-(--radius)" />

      <div
        className="flex flex-col items-center justify-center gap-4 w-full h-106 md:h-122 px-6 pt-36 pb-10 md:py-30 text-center text-background"
        style={{
          background:
            "linear-gradient(180deg, rgba(123,149,171,0.57) 0%, rgba(0,0,0,0.57) 100%), linear-gradient(0deg,#000000,#000000)",
        }}
      >
        <Image
          src={cloudinaryUrl("v1771956786/sello_flying_1_l7dniq", 240)}
          alt="Flying Seal"
          width={120}
          height={120}
          className="w-30 h-30"
          priority
        />

        <h3 className="font-inter text-xl md:text-2xl italic font-semibold leading-tight">
          {t("title")}
        </h3>

        <p className="max-w-sm md:max-w-2xl text-sm md:text-base leading-relaxed opacity-90">
          {t("description")}
        </p>
      </div>
    </section>
  );
}