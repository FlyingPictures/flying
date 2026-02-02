"use client";

import { Award, Shield, Heart, Clock } from "lucide-react";

interface Badge {
  icon: string;
  title: string;
  description: string;
}

interface TrustBadgesProps {
  title: string;
  badges: Badge[];
}

const iconMap: Record<string, React.ReactNode> = {
  award: <Award className="w-8 h-8" />,
  shield: <Shield className="w-8 h-8" />,
  heart: <Heart className="w-8 h-8" />,
  clock: <Clock className="w-8 h-8" />,
};

export function TrustBadges({ title, badges }: TrustBadgesProps) {
  return (
    <section className="py-16 md:py-24 bg-[#03303B]">
      <div className="container mx-auto px-4">
        <h2 className="font-inter text-sm font-semibold text-[#F7A533] uppercase tracking-[0.15em] text-center mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-[#F7A533]/10 flex items-center justify-center text-[#F7A533] mb-4 group-hover:bg-[#F7A533] group-hover:text-[#03303B] transition-all duration-300">
                {iconMap[badge.icon]}
              </div>

              <h3 className="font-poppins font-semibold text-lg text-white mb-2">
                {badge.title}
              </h3>

              <p className="font-inter text-sm text-white/70 leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
