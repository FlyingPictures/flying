"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqCategories = [
  {
    id: "aboutFlight",
    labelKey: "aboutFlight",
    questions: ["afraidHeights", "restrooms"],
  },
  {
    id: "safetyLimits",
    labelKey: "safetyLimits",
    questions: ["childrenFly", "pregnantFly", "weightLimit"],
  },
  {
    id: "bookingExtra",
    labelKey: "bookingExtra",
    questions: ["bringCamera", "breakfast"],
  },
];

export function PlanFAQ() {
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());
  const t = useTranslations("planYourVisit.faq.questions");
  const tSection = useTranslations("planYourVisit.faq");

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions((prev) => {
      const updatedSet = new Set(prev);
      if (updatedSet.has(questionId)) {
        updatedSet.delete(questionId);
      } else {
        updatedSet.add(questionId);
      }
      return updatedSet;
    });
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="font-poppins font-semibold text-3xl md:text-5xl text-white">
          {tSection("title")}
        </h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {faqCategories.map((category) => (
          <div key={category.id} className="space-y-4">
            <h3 className="font-libre-baskerville italic text-2xl text-white">
              {tSection(category.labelKey)}
            </h3>
            <div className="space-y-3">
              {category.questions.map((questionId) => {
                const isOpen = openQuestions.has(questionId);
                return (
                  <div
                    key={questionId}
                    className={cn(
                      "border border-white/50 rounded-xl overflow-hidden transition-all duration-300",
                      isOpen && "bg-white/10"
                    )}
                  >
                    <button
                      onClick={() => toggleQuestion(questionId)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <span className="font-inter font-bold text-lg text-white">
                        {t(questionId)}
                      </span>
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-white" />
                      )}
                    </button>
                    {isOpen && questionId === "afraidHeights" && (
                      <div className="px-6 pb-4">
                        <p className="font-inter text-white/90">
                          {t("afraidHeightsAnswer")}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
