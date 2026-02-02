import { getTranslations } from "next-intl/server";

export async function PlanEssentialPrep() {
  const t = await getTranslations("planYourVisit.essentialPrep");
  const tOnion = await getTranslations("planYourVisit.essentialPrep.onionStrategy");
  const tFootwear = await getTranslations("planYourVisit.essentialPrep.footwear");
  const tLuggage = await getTranslations("planYourVisit.essentialPrep.luggage");

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-inter font-bold text-sm tracking-wider text-white uppercase mb-4 block">
          {t("label")}
        </span>
        <h2 className="font-poppins font-semibold text-3xl md:text-5xl text-white">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#03303B]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#03303B]/90" />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-[#03303B] text-lg">Imagen: Cebolla</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-libre-baskerville italic text-2xl text-white mb-3">
              {tOnion("title")}
            </h3>
            <p className="font-inter text-white/90 text-sm leading-relaxed">
              {tOnion("description")}
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#03303B]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#03303B]/90" />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-[#03303B] text-lg">Imagen: Calzado</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-libre-baskerville italic text-2xl text-white mb-3">
              {tFootwear("title")}
            </h3>
            <p className="font-inter text-white/90 text-sm leading-relaxed">
              {tFootwear("description")}
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#03303B]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#03303B]/90" />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-[#03303B] text-lg">Imagen: Equipaje</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-libre-baskerville italic text-2xl text-white mb-3">
              {tLuggage("title")}
            </h3>
            <p className="font-inter text-white/90 text-sm leading-relaxed">
              {tLuggage("description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
