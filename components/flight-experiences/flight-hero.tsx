"use client";

import { Play, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HeroContainer,
  HeroBackground,
  HeroContent,
  HeroTitle,
  HeroDescription,
} from "@/components/shared/hero-primitives";

interface FlightHeroProps {
  title: string;
  subtitle: string;
  description: string;
  locale: string;
}

const FLIGHT_HERO_IMAGE = 'v1769106750/flightexp_hero_rw8fkj';

const SPACING = {
  BADGE_TO_TITLE: 'mb-6',
  TITLE_TO_DESCRIPTION: 'mb-6',
  DESCRIPTION_TO_CTA: 'mt-10',
  ARROW_POSITION: 'bottom-8',
} as const;

const BUTTON_STYLES = {
  primary: cn(
    "inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4",
    "bg-primary text-secondary font-inter font-bold rounded-full",
    "hover:bg-primary/90 active:scale-95",
    "transition-all duration-200"
  ),
  secondary: cn(
    "inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4",
    "bg-white/10 backdrop-blur-sm text-white font-inter font-semibold rounded-full",
    "hover:bg-white/20 transition-all group"
  ),
  playIcon: cn(
    "w-10 h-10 rounded-full bg-white/20 flex items-center justify-center",
    "group-hover:bg-white/30 transition-colors"
  ),
} as const;

function CategoryBadge({ text }: { text: string }) {
  return (
    <span className={cn(
      "inline-block font-inter text-sm md:text-base font-semibold",
      "text-primary uppercase tracking-[0.2em]",
      "animate-fade-in",
      SPACING.BADGE_TO_TITLE
    )}>
      {text}
    </span>
  );
}

function CTAButtons({ locale }: { locale: string }) {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row gap-4 justify-center items-center",
      SPACING.DESCRIPTION_TO_CTA
    )}>
      <a href="#experiences" className={BUTTON_STYLES.primary}>
        {locale === "es" ? "Ver Experiencias" : "View Experiences"}
      </a>

      <button type="button" className={BUTTON_STYLES.secondary}>
        <div className={BUTTON_STYLES.playIcon}>
          <Play className="w-4 h-4 fill-white text-white ml-0.5" />
        </div>
        <span>{locale === "es" ? "Ver Video" : "Watch Video"}</span>
      </button>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className={cn(
      "absolute left-1/2 -translate-x-1/2 z-20",
      "animate-bounce",
      SPACING.ARROW_POSITION
    )}>
      <ArrowDown className="w-6 h-6 text-white/60" aria-hidden="true" />
    </div>
  );
}

export function FlightHero({
  title,
  subtitle,
  description,
  locale,
}: FlightHeroProps) {
  return (
    <HeroContainer height="tall">
      <HeroBackground publicId={FLIGHT_HERO_IMAGE}>
        <HeroContent verticalAlign="center">
          <CategoryBadge text={subtitle} />

          <HeroTitle className={SPACING.TITLE_TO_DESCRIPTION}>
            {title}
          </HeroTitle>

          <HeroDescription>
            {description}
          </HeroDescription>

          <CTAButtons locale={locale} />

          <ScrollIndicator />
        </HeroContent>
      </HeroBackground>
    </HeroContainer>
  );
}