"use client";

import { Clock, Users, Calendar, Star, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  HeroContainer, 
  HeroBackground, 
  HeroContent, 
  HeroTitle 
} from "@/components/shared/hero-primitives";
import { IMAGES } from '@/lib/cloudinary';

interface ProductHeroProps {
  title: string;
  subtitle: string;
  duration: string;
  participants: string;
  minAge: string;
  rating: number;
  reviewCount: number;
  locale: string;
}

const SPACING = {
  BADGE_TO_TITLE: 'mb-4',
  TITLE_TO_META: 'mb-6 sm:mb-8',
  META_TO_CTA: 'mt-6 sm:mt-8',
} as const;

const BUTTON_STYLE = cn(
  "inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4",
  "bg-primary text-secondary font-inter font-bold rounded-full",
  "hover:bg-primary/90 active:scale-95",
  "transition-all duration-200"
);

/**
 * Badge de categoría
 */
function CategoryBadge({ text }: { text: string }) {
  return (
    <span className={cn(
      "inline-block font-inter text-sm font-semibold",
      "text-primary uppercase tracking-[0.15em]",
      SPACING.BADGE_TO_TITLE
    )}>
      {text}
    </span>
  );
}

/**
 * Metadata Item reutilizable
 */
interface MetaItemProps {
  icon: LucideIcon;
  text: string;
  highlight?: boolean;
}

function MetaItem({ icon: Icon, text, highlight = false }: MetaItemProps) {
  return (
    <div className={cn(
      "flex items-center gap-2",
      highlight ? "text-white" : "text-white/80"
    )}>
      <Icon className={cn(
        "w-5 h-5",
        highlight && "fill-primary text-primary"
      )} />
      <span className={cn(
        "font-inter text-sm sm:text-base",
        highlight && "font-semibold"
      )}>
        {text}
      </span>
    </div>
  );
}

/**
 * Metadata Grid
 */
interface MetadataProps {
  duration: string;
  participants: string;
  minAge: string;
  rating: number;
  reviewCount: number;
  locale: string;
}

function ProductMetadata({ 
  duration, 
  participants, 
  minAge, 
  rating, 
  reviewCount, 
  locale 
}: MetadataProps) {
  return (
    <div className={cn(
      "flex flex-wrap items-center gap-4 sm:gap-6",
      SPACING.TITLE_TO_META
    )}>
      <MetaItem icon={Clock} text={duration} />
      <MetaItem icon={Users} text={participants} />
      <MetaItem icon={Calendar} text={minAge} />
      <MetaItem 
        icon={Star} 
        text={`${rating} (${reviewCount} ${locale === "es" ? "reseñas" : "reviews"})`}
        highlight 
      />
    </div>
  );
}

export function ProductHero({
  title,
  subtitle,
  duration,
  participants,
  minAge,
  rating,
  reviewCount,
  locale,
}: ProductHeroProps) {
  return (
    <HeroContainer height="default">
      <HeroBackground cloudinaryId={IMAGES.hero.product}>
        <HeroContent align="left" verticalAlign="center">
          <CategoryBadge text={subtitle} />

          <HeroTitle>
            {title}
          </HeroTitle>

          <ProductMetadata
            duration={duration}
            participants={participants}
            minAge={minAge}
            rating={rating}
            reviewCount={reviewCount}
            locale={locale}
          />

          <a
            href="#booking"
            className={cn(BUTTON_STYLE, SPACING.META_TO_CTA)}
          >
            {locale === "es" ? "Reservar Ahora" : "Book Now"}
          </a>
        </HeroContent>
      </HeroBackground>
    </HeroContainer>
  );
}