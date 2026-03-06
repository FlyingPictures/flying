import { getTranslations } from "next-intl/server";
import { CloudinaryImage } from '@/components/CloudinaryImage';
import { IMAGES } from '@/lib/images';

const EXTRAS = [
  { imageIndex: 0, titleKey: "round",     descKey: "rounddesc" },
  { imageIndex: 1, titleKey: "breakfast", descKey: "breakdesc" },
  { imageIndex: 2, titleKey: "medial",    descKey: "mediadesc" },
] as const;

export default async function RecommendedExtras() {
  const t = await getTranslations("product.recommended");

  return (
    <section className="w-full flex flex-col items-center px-4 md:px-10 lg:px-20 py-12 gap-8 lg:gap-16">
      <div className="w-full h-px bg-border" />

      <h3 className="w-full text-left lg:text-center">{t("title")}</h3>

      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 lg:justify-center">
        {EXTRAS.map(({ imageIndex, titleKey, descKey }) => (
          <div key={titleKey} className="flex items-start gap-4 flex-1">
            <div className="shrink-0">
              <CloudinaryImage
                publicId={IMAGES.product.recomended[imageIndex]}
                alt={t(titleKey)}
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="font-bold text-lg">{t(titleKey)}</h5>
              <p className="text-sm leading-relaxed">{t(descKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}