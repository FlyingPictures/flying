"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface StickyCTAProps {
  title: string;
  description: string;
  buttonText: string;
  locale: string;
}

export function StickyCTA({ title, description, buttonText, locale }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg transform transition-transform duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <h3 className="font-poppins font-bold text-[#03303B] text-lg">
                {title}
              </h3>
              <p className="font-inter text-sm text-[#03303B]/70">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-2 text-[#03303B]/60 hover:text-[#03303B] transition-colors"
              aria-label={locale === "es" ? "Volver arriba" : "Scroll to top"}
            >
              <ArrowUp className="w-5 h-5" />
            </button>

            <a
              href="#booking"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#03303B] text-white font-inter font-bold rounded-full hover:bg-[#03303B]/90 transition-colors"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
