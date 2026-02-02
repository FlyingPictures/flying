import { getTranslations } from "next-intl/server";
import { Mail, Phone } from "lucide-react";

export async function ContactInfo() {
  const t = await getTranslations("contact");

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7B95AB] to-[#03303B]">
              <span className="text-white text-lg">Imagen de Contacto</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-b-2xl p-6 shadow-lg">
            <p className="font-inter font-medium text-[#03303B] text-lg text-center">
              {t("forTravelers")}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="font-poppins font-semibold text-4xl text-[#03303B]">
            {t("sectionTitle")}
          </h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#03303B]/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#03303B]" />
              </div>
              <div>
                <p className="font-inter font-bold text-[#03303B] text-lg">
                  fly@flyingpictures.mx
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#03303B]/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#03303B]" />
              </div>
              <div>
                <p className="font-inter font-bold text-[#03303B] text-lg">
                  (+52) 55 8025 1057
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-6">
            <p className="font-inter font-medium text-[#03303B]">
              {t("availabilityInfo")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
