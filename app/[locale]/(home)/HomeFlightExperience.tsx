'use client';

import * as React from 'react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';

type FlightCategory = 'shared' | 'private' | 'vip';

interface Flight {
  id: number;
  cat: FlightCategory;
  title: string;
  price: string;
  cloudinaryId: string;
}

export function FlightExperienceSection() {
  const [activeFilter, setActiveFilter] = useState<FlightCategory>('shared');
  const [activeId, setActiveId] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const descriptions: Record<FlightCategory, React.ReactNode> = {
    shared: (
      <>
        Solo travellers, friends, & couples. Fly in a shared compartmented basket
        <br />
        that gives everyone their own corner of the sky.
        <br />
        Add extras with transport options and breakfast.
      </>
    ),
    private:
      'Exclusive experience for your group. Enjoy the sky in complete privacy with personalized service and premium amenities.',
    vip:
      'Ultimate luxury experience. The finest hot air balloon journey with champagne service and gourmet breakfast.',
  };

  const allFlights: Flight[] = useMemo(
    () => [
      { id: 1, cat: 'shared', title: 'The Classic Journey', price: '2,599', cloudinaryId: 'v1769270545/toggle1_pydq5z' },
      { id: 2, cat: 'shared', title: 'The Classic Journey', price: '2,800', cloudinaryId: 'v1769270545/toggle2_dasi0j' },
      { id: 3, cat: 'shared', title: 'Group Adventure', price: '2,400', cloudinaryId: 'v1769270544/toggle3_fd1suy' },

      { id: 4, cat: 'private', title: 'Private Escape', price: '5,999', cloudinaryId: 'v1769270545/toggle1_pydq5z' },
      { id: 5, cat: 'private', title: 'Exclusive Journey', price: '6,500', cloudinaryId: 'v1769270545/toggle2_dasi0j' },
      { id: 6, cat: 'private', title: 'Intimate Adventure', price: '5,799', cloudinaryId: 'v1769270544/toggle3_fd1suy' },

      { id: 7, cat: 'vip', title: 'Luxury Experience', price: '9,999', cloudinaryId: 'v1769270545/toggle1_pydq5z' },
      { id: 8, cat: 'vip', title: 'Premium Sunrise', price: '10,500', cloudinaryId: 'v1769270545/toggle2_dasi0j' },
      { id: 9, cat: 'vip', title: 'Elite Journey', price: '9,799', cloudinaryId: 'v1769270544/toggle3_fd1suy' },
    ],
    []
  );

  const visibleFlights = useMemo(
    () => allFlights.filter((f) => f.cat === activeFilter),
    [activeFilter, allFlights]
  );

  const scrollToCard = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('.snap-center');
    const card = cards[index];
    if (!card) return;

    const containerWidth = container.offsetWidth;
    const cardWidth = card.offsetWidth;
    const cardOffset = card.offsetLeft;

    container.scrollTo({
      left: cardOffset - containerWidth / 2 + cardWidth / 2,
      behavior,
    });

    setActiveId(visibleFlights[index]?.id ?? null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => setIsDragging(false);

  // Efecto para centrar la tarjeta del medio cuando cambia la categoría
  useEffect(() => {
    const timer = setTimeout(() => {
      const middleIndex = Math.floor(visibleFlights.length / 2);
      scrollToCard(middleIndex, 'auto');
    }, 50);

    return () => clearTimeout(timer);
  }, [activeFilter, visibleFlights]);

  return (
    <section className="relative w-full bg-secondary pb-32 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <CloudinaryImage
          publicId="v1769270546/flightexp_kisynt"
          alt="Sky Background"
          fill
          priority
          className="object-cover opacity-80"
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 z-10">
        <header className="pt-24 text-center mb-12">
          <h4 className="text-secondary-foreground font-semibold tracking-widest mb-4 uppercase">CHOOSE YOUR ASCENT</h4>
          <h2 className="text-4xl md:text-6xl font-bold text-secondary-foreground leading-tight">
            Flight Experiences <br /> Designed for adventure
          </h2>
        </header>

        {/* Filter Toggle */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-[512px] h-[64px] bg-white/90 backdrop-blur-sm rounded-full flex p-1.5 shadow-xl border border-white/20">
            {(['shared', 'private', 'vip'] as FlightCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  'flex-1 rounded-full font-bold text-sm uppercase transition-all duration-300',
                  activeFilter === cat
                    ? 'bg-secondary text-secondary-foreground shadow-md'
                    : 'text-secondary-foreground/60 hover:text-secondary-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={handleMouseMove}
          className={cn(
            'w-full overflow-x-auto snap-x snap-mandatory no-scrollbar select-none pb-20',
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          )}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-6 md:gap-12 px-[10vw] md:px-[30vw] w-max">
            {visibleFlights.map((flight, index) => {
              const isActive = activeId === flight.id;

              return (
                <div
                  key={flight.id}
                  className="snap-center flex-shrink-0 flex flex-col items-center"
                  style={{ width: 'clamp(300px, 60vw, 600px)' }}
                >
                  <div 
                    onClick={() => !isDragging && scrollToCard(index)}
                    className={cn(
                      "relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden transition-transform duration-500 shadow-2xl cursor-pointer",
                      isActive ? "scale-105" : "scale-90 opacity-60 grayscale-[0.5]"
                    )}
                  >
                    <CloudinaryImage
                      publicId={flight.cloudinaryId}
                      alt={flight.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
                      <span className="text-xs font-bold tracking-widest uppercase mb-2 opacity-80">{activeFilter} flight</span>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{flight.title}</h3>
                      <p className="text-lg font-medium">From ${flight.price} MXN</p>
                    </div>
                  </div>

                  {/* Info Section - Only visible if active */}
                  <div className={cn(
                    "mt-10 text-center transition-all duration-500 max-w-lg",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none h-0"
                  )}>
                    <p className="text-lg text-secondary-foreground/90 leading-relaxed font-medium">
                      {descriptions[activeFilter]}
                    </p>
                    <button className="mt-8 px-10 py-4 bg-secondary text-secondary-foreground rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
                      BOOK NOW
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}