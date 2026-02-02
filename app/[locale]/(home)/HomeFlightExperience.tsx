'use client';

import * as React from "react";
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { CloudinaryImage } from '@/components/CloudinaryImage';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CardTradition } from "@/components/ui/card";

const ALL_FLIGHTS = [
  { id: 1, cat: "shared", title: "The Classic Journey", price: "2,599", cloudinaryId: "v1769270545/toggle1_pydq5z" },
  { id: 2, cat: "shared", title: "The Classic Journey", price: "2,800", cloudinaryId: "v1769270545/toggle2_dasi0j" },
  { id: 3, cat: "shared", title: "Group Adventure", price: "2,400", cloudinaryId: "v1769270544/toggle3_fd1suy" },
  { id: 4, cat: "private", title: "Private Escape", price: "5,999", cloudinaryId: "v1769270545/toggle1_pydq5z" },
  { id: 5, cat: "private", title: "Exclusive Journey", price: "6,500", cloudinaryId: "v1769270545/toggle2_dasi0j" },
  { id: 6, cat: "private", title: "Intimate Adventure", price: "5,799", cloudinaryId: "v1769270544/toggle3_fd1suy" },
  { id: 7, cat: "vip", title: "Luxury Experience", price: "9,999", cloudinaryId: "v1769270545/toggle1_pydq5z" },
  { id: 8, cat: "vip", title: "Premium Sunrise", price: "10,500", cloudinaryId: "v1769270545/toggle2_dasi0j" },
  { id: 9, cat: "vip", title: "Elite Journey", price: "9,799", cloudinaryId: "v1769270544/toggle3_fd1suy" },
];

const CARD_CONFIGS = [
  {
    id: 'tradition',
    titleKey: 'cards.tradition.title',
    imgId: "v1769270545/twocards_1_oijkmu",
    btnKey: 'cards.tradition.button',
    descKey: 'cards.tradition.description',
    badge: true,
  },
  {
    id: 'safety',
    titleKey: 'cards.safety.title',
    imgId: "v1769270544/Rectangle_40_1_x4el6d",
    btnKey: 'cards.safety.button',
    descKey: 'cards.safety.description',
    dark: true,
  },
];

export function FlightExperienceSection() {
  const t = useTranslations('FlightExperience');
  const [activeFilter, setActiveFilter] = useState('shared');
  const [activeId, setActiveId] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const visibleFlights = useMemo(() => 
    ALL_FLIGHTS.filter(f => f.cat === activeFilter), 
    [activeFilter]
  );

  const visibleFlightsRef = useRef(visibleFlights);
  useEffect(() => { visibleFlightsRef.current = visibleFlights; }, [visibleFlights]);

  const scrollToCard = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('.snap-center');
    const targetCard = cards[index] as HTMLElement;
    if (targetCard) {
      const scrollPos = targetCard.offsetLeft - (container.offsetWidth / 2) + (targetCard.offsetWidth / 2);
      container.scrollTo({ left: scrollPos, behavior });
      setActiveId(visibleFlightsRef.current[index]?.id ?? null);
    }
  }, []);

  useEffect(() => {
    if (visibleFlights.length > 0) {
      const timer = setTimeout(() => scrollToCard(1, 'auto'), 50);
      return () => clearTimeout(timer);
    }
  }, [activeFilter, scrollToCard]);

  return (
    <section className="relative w-full bg-secondary pb-[450px] md:pb-96 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <CloudinaryImage publicId="v1769270546/flightexp_kisynt" alt="Sky" fill priority className="object-cover" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 z-10">
        <header className="pt-24 text-center mb-12 md:mb-16">
          <h4 className="text-secondary tracking-[0.2em] font-bold uppercase text-xs md:text-sm">
            {t('subtitle')}
          </h4>
          <h2 className="text-secondary whitespace-pre-line leading-[1.1] mt-4">
            {t('title')}
          </h2>
        </header>

        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
          <div className="flex justify-center mb-12 md:mb-16">
            <TabsList className="h-[52px] md:h-[72px] bg-background p-1.5 md:p-2 shadow-xl rounded-full w-full max-w-[345px] md:max-w-[514px] border-none">
              {['shared', 'private', 'vip'].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab} 
                  className="flex-1 h-full rounded-full text-xs md:text-sm font-medium
                    data-[state=active]:bg-secondary data-[state=active]:text-background 
                    data-[state=inactive]:text-secondary data-[state=inactive]:bg-transparent"
                >
                  {t(`tabs.${tab}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeFilter} className="m-0 outline-none p-0 w-full">
            <div 
              ref={scrollContainerRef}
              className="w-full overflow-x-auto snap-x snap-mandatory no-scrollbar flex gap-4"
              style={{ 
                paddingLeft: 'calc(50vw - 160px)', 
                paddingRight: 'calc(50vw - 160px)',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {visibleFlights.map((flight, index) => (
                <div 
                  key={flight.id} 
                  className="snap-center flex-shrink-0 cursor-pointer w-[300px] md:w-[698px]" 
                  onClick={() => scrollToCard(index)}
                >
                  <div className={cn(
                    "relative w-full overflow-hidden transition-all duration-500 shadow-2xl rounded-[1.25rem] h-[200px] md:h-[437px]",
                    activeId === flight.id ? "opacity-100 scale-100" : "opacity-60 scale-95"
                  )}>
                    <CloudinaryImage publicId={flight.cloudinaryId} alt={flight.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 p-4 md:p-8 flex flex-col items-center justify-between text-white text-center">
                      <h4 className="tracking-widest text-[8px] md:text-sm font-semibold uppercase">
                         {t('flightBadge', { type: t(`tabs.${activeFilter}`) })}
                      </h4>
                      <h3 className="text-white text-sm md:text-4xl font-semibold">{flight.title}</h3>
                      <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                        <strong className="text-sm md:text-2xl">{t('from', { price: flight.price })}</strong>
                        <Button variant="primary" size="sm" className="px-6 md:px-8 h-7 md:h-10 text-[10px] md:text-sm font-bold">
                          {t('ctaBook')}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* RESTAURADO: Texto de descripción y detalles debajo de la card activa */}
                  <div className={cn(
                    "mt-4 md:mt-8 text-center transition-all duration-700",
                    activeId === flight.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}>
                    <p className="whitespace-pre-line mb-3 md:mb-4 text-sm md:text-base text-secondary">
                      {t(`descriptions.${activeFilter}`)}
                    </p>
                    <button className="text-foreground font-bold text-sm md:text-xl underline underline-offset-4 decoration-foreground hover:opacity-80 transition-opacity">
                      {t('ctaDetails')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Award Section */}
        <div className="text-center mb-32 pt-16">
          <img src="https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270546/certificate_tde9fm.png" alt="Aviation Awards" className="mx-auto w-[150px] md:w-[235px] mb-12" />
          <div className="max-w-[858px] mx-auto mb-8 px-4">
            <h1 className="text-background whitespace-pre-line leading-tight">
              {t('awardSection.title').split('\n')[0]}
            </h1>
            <h3 className="text-background whitespace-pre-line font-libre-baskerville italic">
              {t('awardSection.title').split('\n').slice(1).join('\n')}
            </h3>
          </div>
          <p className="mx-auto text-white max-w-[608px] px-6">
            {t('awardSection.description')}
          </p>
        </div>
      </div>

      {/* --- BOTTOM CARDS GRID --- */}
      <div className="absolute bottom-0 left-0 w-full px-6 translate-y-1/2 z-40 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch max-w-[345px] lg:max-w-[1231px] mx-auto">
          {CARD_CONFIGS.map((config) => {
            // USAR CARD TRADITION DE UI/CARD
            if (config.id === 'tradition') {
              return (
                <CardTradition
                  key={config.id}
                  imageId={config.imgId}
                  title={t(config.titleKey)}
                  description={t(config.descKey)}
                  badge={
                    <CloudinaryImage 
                      publicId="awward_nvceuz" 
                      alt="Award Winning Logo" 
                      fill 
                      className="object-contain" 
                    />
                  }
                >
                  <Button variant="secondary" size="xs">
                    {t(config.btnKey)}
                  </Button>
                </CardTradition>
              );
            }

            // MANTENER LOGICA PARA SAFETY (DARK)
            return (
              <div key={config.id} className="relative border-none overflow-hidden shadow-2xl flex flex-col w-full h-[503px] lg:h-[650px] rounded-[1.25rem] bg-[#06191d]">
                <div className="relative w-full h-[40%] lg:h-[45%] flex-shrink-0 opacity-60">
                  <CloudinaryImage publicId={config.imgId} alt={t(config.titleKey)} fill className="object-cover" />
                </div>
                <div className="flex flex-col flex-1 justify-between p-6 lg:p-10 gap-4">
                  <div>
                    <h3 className="text-xl lg:text-3xl italic font-libre-baskerville mb-3 leading-tight text-white">
                      {t(config.titleKey)}
                    </h3>
                    <p className="text-sm lg:text-lg leading-relaxed text-slate-300 line-clamp-4">
                      {t(config.descKey)}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <Button variant="outline" size="sm" className="rounded-full px-8 font-bold text-white border-white/20">
                      {t(config.btnKey)}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="block md:hidden w-full h-[2140px] pointer-events-none" />
    </section>
  );
}