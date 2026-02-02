"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Clock, Car, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlanGettingHere() {
  const [activeTab, setActiveTab] = useState<"shuttle" | "selfDrive">("shuttle");
  const t = useTranslations("planYourVisit.gettingHere");
  const tShuttle = useTranslations("planYourVisit.gettingHere.shuttle");
  const tDrive = useTranslations("planYourVisit.gettingHere.selfDrive");

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-inter font-bold text-sm tracking-wider text-[#03303B] uppercase mb-4 block">
          {t("label")}
        </span>
        <h2 className="font-poppins font-semibold text-3xl md:text-5xl text-[#03303B]">
          {t("title")}
        </h2>
      </div>

      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-white rounded-full shadow-md p-1">
          <button
            onClick={() => setActiveTab("shuttle")}
            className={cn(
              "px-8 py-3 rounded-full font-inter font-bold text-sm transition-all duration-300",
              activeTab === "shuttle"
                ? "bg-[#03303B] text-white shadow-md"
                : "text-[#03303B] hover:bg-gray-100"
            )}
          >
            {tShuttle("title")}
          </button>
          <button
            onClick={() => setActiveTab("selfDrive")}
            className={cn(
              "px-8 py-3 rounded-full font-inter font-bold text-sm transition-all duration-300",
              activeTab === "selfDrive"
                ? "bg-[#03303B] text-white shadow-md"
                : "text-[#03303B] hover:bg-gray-100"
            )}
          >
            {tDrive("title")}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activeTab === "shuttle" ? (
            <>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7B95AB] to-[#03303B]">
                  <span className="text-white text-lg">Imagen del transporte</span>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="font-libre-baskerville italic text-2xl text-[#03303B]">
                  {tShuttle("title")}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#03303B]" />
                    <p className="font-inter font-bold text-[#03303B]">
                      {tShuttle("pickupTime")}
                    </p>
                  </div>
                  <p className="font-inter text-[#03303B]">
                    {tShuttle("perks")}
                  </p>
                  <p className="font-inter text-sm text-[#03303B] italic">
                    {tShuttle("note")}
                  </p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#03303B] text-white font-inter font-bold text-sm rounded-full hover:bg-[#03303B]/90 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  {tShuttle("openMaps")}
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#7B95AB] to-[#03303B]">
                  <span className="text-white text-lg">Imagen de estacionamiento</span>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="font-libre-baskerville italic text-2xl text-[#03303B]">
                  {tDrive("title")}
                </h3>
                <p className="font-inter text-[#03303B]">
                  {tDrive("description")}
                </p>
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-[#03303B] mt-1" />
                  <p className="font-inter font-bold text-[#03303B]">
                    {tDrive("parking")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#03303B] text-white font-inter font-bold text-sm rounded-full hover:bg-[#03303B]/90 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    {tDrive("openMaps")}
                  </a>
                  <a
                    href="https://waze.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#03303B] text-[#03303B] font-inter font-bold text-sm rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {tDrive("openWaze")}
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
