"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqItems = [
  { id: "lookingForPrices", hasAnswer: false },
  { id: "worriedAboutWeather", hasAnswer: false },
  { id: "whatToWear", hasAnswer: false },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("contact");

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-poppins font-semibold text-3xl md:text-4xl text-[#03303B] text-center mb-12">
          {t("faqTitle")}
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id}
                className={cn(
                  "border border-[#03303B] rounded-xl overflow-hidden transition-all duration-300",
                  isOpen && "bg-[#03303B] text-white"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-inter font-medium text-lg">
                    {t(item.id)}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
