'use client';

import * as React from "react";
import { useState, useMemo, useRef, useEffect } from 'react';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';

export function FlightExperienceSection() {
  const [activeFilter, setActiveFilter] = useState('shared');
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const descriptions = {
    shared: (
      <>
        Solo travellers, friends, & couples. Fly in a shared compartmented basket<br />
        that gives everyone their own corner of the sky.<br />
        Add extras with transport options and breakfast.
      </>
    ),
    private: "Exclusive experience for your group. Enjoy the sky in complete privacy with personalized service and premium amenities.",
    vip: "Ultimate luxury experience. The finest hot air balloon journey with champagne service and gourmet breakfast."
  };

  const allFlights = useMemo(() => [
    { id: 1, cat: "shared", title: "The Classic Journey", price: "2,599", cloudinaryId: "v1769270545/toggle1_pydq5z" },
    { id: 2, cat: "shared", title: "The Classic Journey", price: "2,800", cloudinaryId: "v1769270545/toggle2_dasi0j" },
    { id: 3, cat: "shared", title: "Group Adventure", price: "2,400", cloudinaryId: "v1769270544/toggle3_fd1suy" },
    { id: 4, cat: "private", title: "Private Escape", price: "5,999", cloudinaryId: "v1769270545/toggle1_pydq5z" },
    { id: 5, cat: "private", title: "Exclusive Journey", price: "6,500", cloudinaryId: "v1769270545/toggle2_dasi0j" },
    { id: 6, cat: "private", title: "Intimate Adventure", price: "5,799", cloudinaryId: "v1769270544/toggle3_fd1suy" },
    { id: 7, cat: "vip", title: "Luxury Experience", price: "9,999", cloudinaryId: "v1769270545/toggle1_pydq5z" },
    { id: 8, cat: "vip", title: "Premium Sunrise", price: "10,500", cloudinaryId: "v1769270545/toggle2_dasi0j" },
    { id: 9, cat: "vip", title: "Elite Journey", price: "9,799", cloudinaryId: "v1769270544/toggle3_fd1suy" },
  ], []);

  const visibleFlights = useMemo(() => {
    return allFlights.filter(f => f.cat === activeFilter);
  }, [activeFilter, allFlights]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollToCard = (index: number, behavior: 'smooth' | 'auto' = 'smooth') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('.snap-center');
    if (cards[index]) {
      const targetCard = cards[index] as HTMLElement;
      const scrollLeftPos = targetCard.offsetLeft - (container.offsetWidth / 2) + (targetCard.offsetWidth / 2);
      container.scrollTo({ left: scrollLeftPos, behavior });
    }
  };

  const detectCenterCard = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('.snap-center');
    let closestId: string | number | null = null;
    let minDistance = Infinity;
    
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const containerCenter = containerRect.left + containerRect.width / 2;
      const centerDistance = Math.abs(cardCenter - containerCenter);
      
      if (centerDistance < minDistance) {
        minDistance = centerDistance;
        closestId = card.getAttribute('data-id');
      }
    });
    
    if (closestId !== null && String(closestId) !== String(activeId)) {
      setActiveId(closestId);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCard(1, 'auto');
      if (visibleFlights[1]) setActiveId(visibleFlights[1].id);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeFilter, visibleFlights]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let rafId: number;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(detectCenterCard);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [visibleFlights, activeId]);

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
            Flight Experiences <br></br>Designed for adventure
          </h2>
        </header>

        <div className="flex justify-center mb-16">
          <div className="w-full max-w-[512px] h-[72px] bg-background rounded-full flex items-center p-2 shadow-lg">
            {['shared', 'private', 'vip & tours'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveFilter(cat === 'vip & tours' ? 'vip' : cat)} 
                className={cn(
                  "flex-1 h-full rounded-full font-bold text-sm transition-all duration-300 capitalize", 
                  (activeFilter === cat || (cat === 'vip & tours' && activeFilter === 'vip'))
                    ? "bg-secondary text-background" 
                    : "text-secondary"
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
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={cn(
            "w-full overflow-x-scroll snap-x snap-mandatory mb-32 select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            paddingLeft: 'calc(50vw - clamp(300px, 48.5vw, 349px))',
            paddingRight: 'calc(50vw - clamp(300px, 48.5vw, 349px))',
            scrollBehavior: isDragging ? 'auto' : 'smooth',
          }}
        >
          <div className="flex gap-8 w-max">
            {visibleFlights.map((flight, index) => {
              const isActive = String(activeId) === String(flight.id);
              
              return (
                <div 
                  key={flight.id} 
                  data-id={flight.id} 
                  className="snap-center flex-shrink-0"
                  onClick={() => !isDragging && scrollToCard(index, 'smooth')}
                >
                  <div style={{ width: 'clamp(320px, 48.5vw, 698px)' }}>
                    <div 
                      className={cn(
                        "relative w-full rounded-card overflow-hidden transition-all duration-300 ease-out",
                        isActive ? "shadow-2xl" : "shadow-lg opacity-85"
                      )}
                      style={{ height: 'clamp(200px, 30.4vw, 437px)' }}
                    >
                      <CloudinaryImage 
                        publicId={flight.cloudinaryId} 
                        alt={flight.title} 
                        fill 
                        className="object-cover pointer-events-none" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-transparent to-foreground/60 p-8 flex flex-col items-center text-white">
                        <h4 className="mb-4">{activeFilter.toUpperCase()} FLIGHT</h4>
                        <h3 className="mb-auto text-center not-italic">{flight.title}</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-4 pb-4">
                          <strong className="text-xl">From ${flight.price} MXN</strong>
                          <button className="bg-primary text-secondary px-8 py-2.5 rounded-full font-bold">
                            Book Flight
                          </button>
                        </div>
                      </div>
                    </div>

                    <div 
                      className="mt-8 text-center mx-auto" 
                      style={{ maxWidth: 'clamp(320px, 45vw, 649px)', minHeight: '180px' }}
                    >
                      <div 
                        className={cn(
                          "transition-all duration-300", 
                          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                        )}
                      >
                        <p className="text-foreground font-medium text-lg leading-snug mb-6">
                          {descriptions[activeFilter as keyof typeof descriptions]}
                        </p>
                        <button className="text-foreground font-bold text-xl underline decoration-2 underline-offset-[2px] decoration-foreground/80">
                          View flight details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mb-32 pt-16">
          <img 
            src="https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270546/certificate_tde9fm.png" 
            alt="Aviation Awards" 
            className="mx-auto w-[clamp(150px,16vw,235px)] h-auto mb-12" 
          />
          <h2 className="text-background max-w-[858px] mx-auto mb-8 font-serif not-italic">
            Award-winning <br /> AVIATION COMPANY
          </h2>
          <p className="mx-auto text-lg text-white" style={{ width: 'clamp(320px, 100%, 608px)' }}>
            Discover the most trusted and refined hot air balloon flight in Mexico — a seamless fusion of British precision and Mexican warmth. For over two decades, Flying Pictures Mexico has set the standard for safe, cinematic flights over the ancient pyramids of Teotihuacán.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1231px] px-6 pb-12 translate-y-1/2 z-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div 
            className="flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-card overflow-hidden bg-background"
            style={{ 
              width: 'clamp(320px, 100%, 608px)',
              height: 'clamp(400px, 55.4vw, 797px)'
            }}
          >
            <div className="relative flex-1">
              <CloudinaryImage 
                publicId="v1769270545/twocards_1_oijkmu" 
                alt="Tradition" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="p-10 space-y-6 flex-shrink-0">
              <h3 className="text-secondary text-[clamp(24px,2.22vw,32px)] leading-tight">
                More Than a Ride, a Tradition.
              </h3>
              <p className="text-secondary font-medium text-[clamp(16px,1.39vw,20px)] leading-normal">
                As you rise with the first light, the valley unfolds below: the Pyramid of the Sun, the Avenue of the Dead, and miles of golden horizon. Each moment feels carefully orchestrated — calm, elegant, and utterly unforgettable.
              </p>
              <div className="flex items-center justify-between gap-4">
                <button className="bg-secondary text-background px-6 py-3 rounded-full font-bold text-sm">
                  Request Corporate Quote
                </button>
                <img 
                  src="https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270545/awward_nvceuz.png" 
                  alt="Award" 
                  className="h-[clamp(40px,5vw,71px)] w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div 
            className="relative rounded-card overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            style={{ 
              width: 'clamp(320px, 100%, 608px)',
              height: 'clamp(400px, 55.4vw, 797px)'
            }}
          >
            <CloudinaryImage 
              publicId="v1769270544/Rectangle_40_1_x4el6d" 
              alt="Safety" 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent p-12 flex flex-col justify-end space-y-6">
              <h3 className="text-[clamp(24px,2.22vw,32px)] leading-tight text-white">
                Safety You Can See.
              </h3>
              <p className="font-medium text-[clamp(16px,1.39vw,20px)] leading-normal text-white">
                Our senior pilots, all certified by Mexico's Civil Aviation Authority and fully trained to guide you national standards, guide you with the confidence of many years dedicated flying balloons. Every flight includes full insurance, a traditional toast after landing, and the quiet joy of watching the morning awaken.
              </p>
              <button className="bg-background text-secondary px-8 py-3 rounded-full font-bold w-fit">
                Meet our fleet
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}