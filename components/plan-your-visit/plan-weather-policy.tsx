import { getTranslations } from "next-intl/server";

export async function PlanWeatherPolicy() {
  const t = await getTranslations("planYourVisit.weatherPolicy");

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-inter font-bold text-sm tracking-wider text-[#03303B] uppercase mb-4 block">
          {t("label")}
        </span>
        <h2 className="font-poppins font-semibold text-3xl md:text-5xl text-[#03303B] mb-8">
          {t("title")}
        </h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <h3 className="font-libre-baskerville italic text-2xl text-[#03303B]">
            {t("ifCancel")}
          </h3>
          <p className="font-inter text-[#03303B]">
            {t("ifCancelDescription")}
          </p>
        </div>

        <div className="space-y-6">
          <div className="border-b border-[#03303B]/50 pb-4">
            <div className="flex justify-between items-start">
              <h4 className="font-libre-baskerville italic text-xl text-[#03303B]">
                {t("48hours")}
              </h4>
              <span className="font-inter font-medium text-[#03303B]">
                {t("48hoursRefund")}
              </span>
            </div>
          </div>

          <div className="border-b border-[#03303B]/50 pb-4">
            <div className="flex justify-between items-start">
              <h4 className="font-libre-baskerville italic text-xl text-[#03303B]">
                {t("24_48hours")}
              </h4>
              <span className="font-inter font-medium text-[#03303B]">
                {t("24_48Refund")}
              </span>
            </div>
          </div>

          <div className="border-b border-[#03303B]/50 pb-4">
            <div className="flex justify-between items-start">
              <h4 className="font-libre-baskerville italic text-xl text-[#03303B]">
                {t("24hours")}
              </h4>
              <span className="font-inter font-medium text-[#03303B]">
                {t("24Refund")}
              </span>
            </div>
          </div>
        </div>

        <p className="font-inter text-sm text-[#03303B] text-center italic">
          {t("note")}
        </p>
      </div>
    </section>
  );
}
