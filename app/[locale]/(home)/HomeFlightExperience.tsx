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
    scrollContainerRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  const scrollToCard = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('.snap-center');
    const card = cards[index];
    if (!card) return;

    container.scrollTo({
      left: card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2,
      behavior,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleFlights[1]) {
        scrollToCard(1, 'auto');
        setActiveId(visibleFlights[1].id);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeFilter, visibleFlights]);

  return (
    <section className="relative w-full bg-secondary pb-96 overflow-visible">
      <div className="absolute inset-0 z-0">
        <CloudinaryImage
          publicId="v1769270546/flightexp_kisynt"
          alt="Sky Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 z-10">
        <header className="pt-24 text-center mb-16">
          <h4 className="text-secondary mb-6">CHOOSE YOUR ASCENT</h4>
          <h2 className="text-secondary">
            Flight Experiences <br /> Designed for adventure
          </h2>
        </header>

        <div className="flex justify-center mb-16">
          <div className="w-full max-w-[512px] h-[72px] bg-background rounded-full flex p-2 shadow-lg">
            {(['shared', 'private', 'vip'] as FlightCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  'flex-1 rounded-full font-bold text-sm transition',
                  activeFilter === cat
                    ? 'bg-secondary text-background'
                    : 'text-secondary'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          className={cn(
            'w-full overflow-x-scroll snap-x snap-mandatory mb-32 select-none',
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          )}
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex gap-8 w-max">
            {visibleFlights.map((flight, index) => {
              const isActive = activeId === flight.id;

              return (
                <div
                  key={flight.id}
                  className="snap-center flex-shrink-0"
                  onClick={() => !isDragging && scrollToCard(index)}
                >
                  <div className="relative w-[320px] md:w-[600px] h-[220px] md:h-[420px] rounded-card overflow-hidden">
                    <CloudinaryImage
                      publicId={flight.cloudinaryId}
                      alt={flight.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 p-6 flex flex-col text-white">
                      <h4 className="mb-2 uppercase">{activeFilter} flight</h4>
                      <h3 className="mb-auto">{flight.title}</h3>
                      <strong>From ${flight.price} MXN</strong>
                    </div>
                  </div>

                  {isActive && (
                    <p className="mt-6 text-center text-foreground max-w-md mx-auto">
                      {descriptions[activeFilter]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
