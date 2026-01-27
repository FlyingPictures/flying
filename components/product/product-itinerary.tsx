"use client";

import { Clock } from "lucide-react";

interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

interface ProductItineraryProps {
  title: string;
  subtitle: string;
  timeline: TimelineItem[];
}

export function ProductItinerary({ title, subtitle, timeline }: ProductItineraryProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="itinerary">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <span className="font-inter text-sm font-semibold text-[#F7A533] uppercase tracking-[0.15em] mb-4 block">
            {subtitle}
          </span>

          <h2 className="font-libre-baskerville italic text-3xl md:text-4xl text-[#03303B]">
            {title}
          </h2>
        </header>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#03303B]/10 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex gap-6 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden md:flex md:w-1/2 items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#03303B] flex items-center justify-center text-white">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>

                <div className="md:w-1/2 relative">
                  <div className="absolute left-[-32px] top-4 md:hidden w-12 h-12 rounded-full bg-[#03303B] flex items-center justify-center text-white z-10">
                    <Clock className="w-5 h-5" />
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ml-4 md:ml-0">
                    <span className="font-inter text-xs font-semibold text-[#F7A533] uppercase tracking-wide mb-2 block">
                      {item.time}
                    </span>

                    <h3 className="font-poppins font-semibold text-lg text-[#03303B] mb-2">
                      {item.title}
                    </h3>

                    <p className="font-inter text-[#03303B]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
