"use client";

import { Play, ArrowDown } from "lucide-react";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const TEXT_WRAP = "whitespace-pre-line";
const NAV_OFFSET = "calc(var(--navbar-height, 4.5rem) + 2rem)";

interface FlightHeroProps {
  title: string;
  subtitle: string;
  description: string;
  locale: string;
}

export function FlightHero({
  title,
  subtitle,
  description,
  locale,
}: FlightHeroProps) {
  return (
    <section className="relative h-screen overflow-hidden pt-[4.5rem] lg:pt-0">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <CloudinaryImage
          publicId={IMAGES.flightHero.background}
          alt="Flight Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <div
          className="max-w-4xl flex flex-col items-center"
          style={{ paddingTop: NAV_OFFSET }}
        >
          <span className="text-primary uppercase tracking-[0.2em] mb-6">
            {subtitle}
          </span>

          <h1 className={`title hero ${TEXT_WRAP} mb-6`}>
            {title}
          </h1>

          <p className={`paragraph hero ${TEXT_WRAP}`}>
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a
              href="#experiences"
              className="px-8 py-4 bg-primary text-secondary font-bold rounded-full"
            >
              {locale === "es" ? "Ver Experiencias" : "View Experiences"}
            </a>

            <button className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white rounded-full backdrop-blur">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
                <Play className="w-4 h-4 fill-white" />
              </span>
              {locale === "es" ? "Ver Video" : "Watch Video"}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/60" />
      </div>
    </section>
  );
}
