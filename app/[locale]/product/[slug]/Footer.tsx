import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cloudinaryUrl } from "@/lib/cloudinary";

export default async function ProductFooter() {
  const t = await getTranslations("product.footer");

  return (
    <section className="relative w-full">
      {/* Pestaña superior */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-6 bg-background rounded-b-2xl" />

      {/* Fondo principal */}
      <div
        className="
          flex flex-col items-center justify-centezr gap-3
          px-4
          pt-[120px] pb-8
          md:py-[120px]
          h-[425px] md:h-[485px]
          w-full
          text-white
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(123,149,171,0.57) 0%, rgba(0,0,0,0.57) 100%), linear-gradient(0deg,#000000,#000000)",
        }}
      >
        {/* Logo */}
        <Image
          src={cloudinaryUrl("v1771956786/sello_flying_1_l7dniq", 240)}
          alt="Flying Seal"
          width={120}
          height={120}
          className="w-[120px] h-[120px]"
          priority
        />

        {/* Title */}
        <h2
          className="
            font-serif italic font-normal
            text-[20px] leading-[25px]
            md:text-[32px] md:leading-[39px]
            tracking-[-0.03em]
            text-center
            max-w-[162px] md:max-w-[485px]
          "
        >
          {t("title")}
        </h2>

        {/* Description */}
        <p
          className="
            font-sans font-bold
            text-[14px] leading-[20px]
            md:text-[18px] md:leading-[22px]
            text-center
            max-w-[343px] md:max-w-[624px]
          "
        >
          {t("description")}
        </p>
      </div>
    </section>
  );
}