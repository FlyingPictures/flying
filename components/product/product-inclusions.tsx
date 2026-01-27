"use client";

import { Check, X } from "lucide-react";

interface ProductInclusionsProps {
  title: string;
  included: string[];
  notIncluded: string[];
}

export function ProductInclusions({ title, included, notIncluded }: ProductInclusionsProps) {
  return (
    <section className="py-16 md:py-24 bg-white" id="inclusions">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="font-libre-baskerville italic text-3xl md:text-4xl text-[#03303B] text-center mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#03303B] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#F7A533]/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-[#F7A533]" />
              </div>

              <h3 className="font-poppins font-semibold text-xl text-white">
                Incluido
              </h3>
            </div>

            <ul className="space-y-4">
              {included.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#F7A533] mt-0.5 flex-shrink-0" />

                  <span className="font-inter text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <X className="w-5 h-5 text-gray-500" />
              </div>

              <h3 className="font-poppins font-semibold text-xl text-[#03303B]">
                No Incluido
              </h3>
            </div>

            <ul className="space-y-4">
              {notIncluded.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />

                  <span className="font-inter text-[#03303B]/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
