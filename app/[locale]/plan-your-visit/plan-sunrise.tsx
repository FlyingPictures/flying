import { getTranslations } from "next-intl/server";

export async function PlanSunrise() {
  const t = await getTranslations("planYourVisit.sunriseRitual");

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <span className="font-inter font-bold text-sm tracking-wider text-[#03303B] uppercase mb-4 block">
          {t("label")}
        </span>
        <h2 className="font-poppins font-semibold text-3xl md:text-5xl text-[#03303B] mb-8">
          {t("title")}
        </h2>
        <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-gray-200">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7B95AB] to-[#03303B]">
            <span className="text-white text-lg">Imagen del amanecer</span>
          </div>
        </div>
        <p className="font-inter font-medium text-lg text-[#03303B] leading-relaxed max-w-3xl mx-auto">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
