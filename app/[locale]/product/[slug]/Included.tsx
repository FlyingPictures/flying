import { getTranslations } from "next-intl/server";
import { CloudinaryImage } from '@/components/CloudinaryImage';
import { IMAGES } from '@/lib/images';

// ── Config ────────────────────────────────────────────────────────────────────
const ITEMS = [
  { imageIndex: 0, titleKey: "included1", descKey: "description1" },
  { imageIndex: 3, titleKey: "included4", descKey: "description4" },
  { imageIndex: 1, titleKey: "included2", descKey: "description2" },
  { imageIndex: 4, titleKey: "included5", descKey: "description5" },
  { imageIndex: 2, titleKey: "included3", descKey: "description3" },
  { imageIndex: 5, titleKey: "included6", descKey: "description6" },
] as const;

// ── Server Component ──────────────────────────────────────────────────────────
export default async function Included() {
  const t = await getTranslations("product.included");

  return (
    <section className="w-full flex flex-col items-center px-4 md:px-10 lg:px-20 py-12 gap-8 lg:gap-16">
      <div className="w-full h-px bg-border" />

      <h3 className="w-full text-left lg:text-center">{t("title")}</h3>

      <div className="w-full max-w-180 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        {ITEMS.map(({ imageIndex, titleKey, descKey }) => (
          <div key={titleKey} className="flex items-start gap-4">
            <div className="shrink-0">
              <CloudinaryImage
                publicId={IMAGES.product.included[imageIndex]}
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