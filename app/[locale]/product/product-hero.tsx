"use client";

import { Clock, Users, Calendar, Star } from "lucide-react";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const NAV_OFFSET = "calc(var(--navbar-height, 4.5rem) + 2rem)";

export function ProductHero({
  title,
  subtitle,
  duration,
  participants,
  minAge,
  rating,
  reviewCount,
  locale,
}: any) {
  return (
    <section className="relative h-[80vh] overflow-hidden pt-[4.5rem] lg:pt-0">
      <div className="absolute inset-0 -z-10">
        <CloudinaryImage
          publicId={IMAGES.productHero.background}          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="absolute inset-0 flex items-center px-4 md:px-12">
        <div
          className="max-w-4xl text-left"
          style={{ paddingTop: NAV_OFFSET }}
        >
          <span className="text-primary uppercase tracking-[0.15em] mb-4 block">
            {subtitle}
          </span>

          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
            {title}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/80 mb-8">
            <Meta icon={Clock} text={duration} />
            <Meta icon={Users} text={participants} />
            <Meta icon={Calendar} text={minAge} />
            <Meta
              icon={Star}
              text={`${rating} (${reviewCount} ${
                locale === "es" ? "reseñas" : "reviews"
              })`}
              highlight
            />
          </div>

          <a
            href="#booking"
            className="inline-flex px-8 py-4 bg-primary text-black font-bold rounded-full"
          >
            {locale === "es" ? "Reservar Ahora" : "Book Now"}
          </a>
        </div>
      </div>
    </section>
  );
}

function Meta({ icon: Icon, text, highlight = false }: any) {
  return (
    <div className={cn("flex items-center gap-2", highlight && "text-white")}>
      <Icon className={cn("w-5 h-5", highlight && "text-primary")} />
      <span className={highlight ? "font-semibold" : ""}>{text}</span>
    </div>
  );
}
