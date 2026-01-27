"use client";

import { useState } from "react";
import { Calendar, Users, Shield, RefreshCw, Star } from "lucide-react";

interface PricingProps {
  title: string;
  fromText: string;
  price: string;
  perPerson: string;
  selectDateText: string;
  availabilityText: string;
  availableText: string;
  limitedText: string;
  soldOutText: string;
  bookNowText: string;
  whatsappText: string;
  guarantee: {
    weather: string;
    cancellation: string;
    bestPrice: string;
  };
  locale: string;
}

export function ProductPricing({
  title,
  fromText,
  price,
  perPerson,
  selectDateText,
  availabilityText,
  availableText,
  limitedText,
  soldOutText,
  bookNowText,
  whatsappText,
  guarantee,
  locale,
}: PricingProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const dates = [
    { date: "2026-01-20", status: "available" as const },
    { date: "2026-01-21", status: "limited" as const },
    { date: "2026-01-22", status: "available" as const },
    { date: "2026-01-23", status: "soldout" as const },
    { date: "2026-01-24", status: "available" as const },
    { date: "2026-01-25", status: "limited" as const },
    { date: "2026-01-26", status: "available" as const },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "limited":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "soldout":
        return "bg-gray-100 text-gray-500 border-gray-200";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return availableText;
      case "limited":
        return limitedText;
      case "soldout":
        return soldOutText;
      default:
        return "";
    }
  };

  return (
    <section id="booking" className="py-16 md:py-24 bg-[#03303B]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="font-libre-baskerville italic text-3xl md:text-4xl text-white text-center mb-12">
          {title}
        </h2>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-inter text-sm text-[#03303B]/60 uppercase tracking-wide">
                  {fromText}
                </span>

                <div className="flex items-baseline gap-2">
                  <span className="font-poppins text-4xl md:text-5xl font-bold text-[#03303B]">
                    {price}
                  </span>
                  <span className="font-inter text-lg text-[#03303B]/60">
                    {perPerson}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-[#F7A533]/10 rounded-full">
                <Star className="w-5 h-5 fill-[#F7A533] text-[#F7A533]" />
                <span className="font-inter font-semibold text-[#03303B]">
                  4.9/5
                </span>
              </div>
            </div>

            <div className="mb-8">
              <span className="font-inter text-sm font-semibold text-[#03303B]/60 uppercase tracking-wide mb-4 block">
                {selectDateText}
              </span>

              <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                {dates.map((dateOption) => (
                  <button
                    key={dateOption.date}
                    onClick={() => dateOption.status !== "soldout" && setSelectedDate(dateOption.date)}
                    disabled={dateOption.status === "soldout"}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      selectedDate === dateOption.date
                        ? "border-[#03303B] bg-[#03303B] text-white"
                        : "border-gray-200 hover:border-gray-300"
                    } ${dateOption.status === "soldout" ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="text-xs font-inter mb-1">
                      {new Date(dateOption.date).toLocaleDateString(locale === "es" ? "es-MX" : "en-US", {
                        weekday: "short",
                      })}
                    </div>
                    <div className="font-poppins font-bold">
                      {new Date(dateOption.date).getDate()}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        selectedDate === dateOption.date
                          ? "text-white/80"
                          : getStatusColor(dateOption.status).split(" ")[1]
                      }`}
                    >
                      {getStatusText(dateOption.status)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://wa.me/525580251057"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-[#03303B] text-white font-inter font-bold rounded-full hover:bg-[#03303B]/90 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                {bookNowText}
              </a>

              <a
                href={`/${locale}/contact`}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-[#03303B] text-[#03303B] font-inter font-bold rounded-full hover:bg-gray-50 transition-colors"
              >
                <Users className="w-5 h-5" />
                {whatsappText}
              </a>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-inter text-sm text-[#03303B]">
                  {guarantee.weather}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-inter text-sm text-[#03303B]">
                  {guarantee.cancellation}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F7A533]/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#F7A533]" />
                </div>
                <span className="font-inter text-sm text-[#03303B]">
                  {guarantee.bestPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
