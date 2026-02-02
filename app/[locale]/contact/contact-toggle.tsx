"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactToggle() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");
  const t = useTranslations("contact");

  return (
    <div className="flex justify-center py-8">
      <div className="inline-flex items-center bg-white rounded-full shadow-md px-2 py-1">
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-6 py-3 rounded-full font-inter font-bold text-sm transition-all duration-300 ${
            activeTab === "personal"
              ? "bg-[#03303B] text-white shadow-md"
              : "text-[#03303B] hover:bg-gray-100"
          }`}
        >
          {t("personal")}
        </button>
        <button
          onClick={() => setActiveTab("business")}
          className={`px-6 py-3 rounded-full font-inter font-bold text-sm transition-all duration-300 ${
            activeTab === "business"
              ? "bg-[#03303B] text-white shadow-md"
              : "text-[#03303B] hover:bg-gray-100"
          }`}
        >
          {t("business")}
        </button>
      </div>
    </div>
  );
}
