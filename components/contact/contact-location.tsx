import { getTranslations } from "next-intl/server";
import { MapPin } from "lucide-react";

export async function ContactLocation() {
  const t = await getTranslations("contact");

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-libre-baskerville italic text-2xl text-[#03303B] mb-2">
            {t("findGloboport")}
          </p>
          <p className="font-inter font-medium text-lg text-[#03303B] max-w-xl mx-auto">
            {t("address")}
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] bg-gray-200 mb-6">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#7B95AB] to-[#03303B]">
            <div className="text-center text-white">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg">Mapa de ubicación</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#03303B] text-white font-inter font-bold text-sm rounded-full hover:bg-[#03303B]/90 transition-colors"
          >
            {t("openMaps")}
          </a>
          <a
            href="https://waze.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#03303B] text-[#03303B] font-inter font-bold text-sm rounded-full hover:bg-gray-100 transition-colors"
          >
            {t("openWaze")}
          </a>
        </div>
      </div>
    </section>
  );
}
