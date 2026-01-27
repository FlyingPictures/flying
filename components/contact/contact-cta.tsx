"use client";

import { useTranslations } from "next-intl";
import { MessageCircle, Clock, CheckCircle2 } from "lucide-react";

export function ContactCTA() {
  const t = useTranslations("contact");

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#03303B] to-[#044a5c] p-6 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="font-inter font-bold text-sm">{t("online")}</span>
            </div>
            <p className="font-inter italic text-sm opacity-80">
              {t("schedule")}
            </p>
          </div>

          <div className="p-8 text-center">
            <p className="font-inter text-sm text-[#03303B] mb-6">
              {t("weRespond")}
            </p>

            <a
              href="https://wa.me/525580251057"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F7A533] text-[#03303B] font-inter font-bold text-lg rounded-full hover:bg-[#F7A533]/90 transition-colors shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              {t("chatConcierge")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
