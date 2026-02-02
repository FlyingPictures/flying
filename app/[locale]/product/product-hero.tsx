"use client";

import { Clock, Users, Calendar, Star, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  HeroContainer, 
  HeroContent, 
  HeroTitle 
} from "@/components/hero-primitives";
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

/**
 * Badge de categoría estilizado
 */
function CategoryBadge({ text }: { text: string }) {
  return (
    <span className="inline-block font-inter text-sm font-semibold text-primary uppercase tracking-[0.15em] mb-4">
      {text}
    </span>
  );
}

/**
 * Ítems de metadatos (Duración, pax, etc.)
 */
function MetaItem({ 
  icon: Icon, 
  text, 
  highlight = false 
}: { 
  icon: LucideIcon
  text: string
  highlight?: boolean 
}) {
  return (
    <div className={cn("flex items-center gap-2", highlight ? "text-white" : "text-white/80")}>
      <Icon className={cn("w-5 h-5", highlight && "fill-primary text-primary")} />
      <span className={cn("font-inter text-sm sm:text-base", highlight && "font-semibold")}>
        {text}
      </span>
    </div>
  );
}

/**
 * Componente Principal ProductHero
 */
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
    // Se pasa el publicId aquí para que coincida con la estructura de tus primitivas
    <HeroContainer publicId={IMAGES.hero.product}>
      
      <HeroContent className="items-start text-left justify-center px-4 md:px-8">
        <div className="flex flex-col items-start w-full gap-6">
          
          <CategoryBadge text={subtitle} />

          <HeroTitle>
            <span className="text-white drop-shadow-lg text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              {title}
            </span>
          </HeroTitle>

          {/* Grid de Metadatos */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <MetaItem icon={Clock} text={duration} />
            <MetaItem icon={Users} text={participants} />
            <MetaItem icon={Calendar} text={minAge} />
            <MetaItem 
              icon={Star} 
              text={`${rating} (${reviewCount} ${locale === "es" ? "reseñas" : "reviews"})`}
              highlight 
            />
          </div>

          {/* Botón de Acción Principal (CTA) */}
          <a
            href="#booking"
            className={cn(
              "inline-flex items-center justify-center gap-2 px-8 py-4",
              "bg-primary text-black font-inter font-bold rounded-full",
              "hover:bg-primary/90 active:scale-95 transition-all duration-200",
              "shadow-xl"
            )}
          >
            {locale === "es" ? "Reservar Ahora" : "Book Now"}
          </a>
          
        </div>
      </HeroContent>
    </HeroContainer>
  );
}