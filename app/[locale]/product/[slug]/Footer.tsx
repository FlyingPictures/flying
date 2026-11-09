import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function ProductFooter() {
  const t = await getTranslations("product.footer");

  return (
    <section className="relative w-full overflow-hidden">
      
      <div aria-hidden="true" className="absolute top-0 left-0 w-full h-6 bg-background rounded-b-(--radius)" />

      <div
        className="flex w-full flex-col items-center justify-center gap-5 px-6 pt-22 pb-16 text-center text-background md:pt-30 md:pb-24"
        style={{
          background:
            "linear-gradient(180deg, rgba(123,149,171,0.57) 0%, rgba(0,0,0,0.57) 100%), linear-gradient(0deg,#000000,#000000)",
        }}
      >
        <Image
          src="https://res.cloudinary.com/dkmjguzvx/image/upload/v1771956786/sello_flying_1_l7dniq.png"
          alt="Flying Pictures México"
          width={120}
          height={120}
          unoptimized
          className="size-30 object-contain"
        />

        <h3 className="font-libre-baskerville text-xl md:text-2xl italic font-normal leading-tight">
          {t("title")}
        </h3>

        <p className="max-w-sm md:max-w-2xl text-sm md:text-base leading-relaxed opacity-90">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
