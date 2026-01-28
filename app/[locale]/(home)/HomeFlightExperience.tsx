'use client';

import * as React from "react";
import { useState, useMemo, useRef, useEffect } from 'react';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button"; // Asegúrate de importar tu componente Button
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// ... (DESCRIPTIONS y ALL_FLIGHTS se mantienen idénticos)
const DESCRIPTIONS = {
  shared: <>Solo travellers, friends, & couples. Fly in a shared compartmented basket<br />that gives everyone their own corner of the sky.<br />Add extras with transport options and breakfast.</>,
  private: "Exclusive experience for your group. Enjoy the sky in complete privacy with personalized service and premium amenities.",
  vip: "Ultimate luxury experience. The finest hot air balloon journey with champagne service and gourmet breakfast."
};

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

export function FlightExperienceSection() {
  const [activeFilter, setActiveFilter] = useState('shared');
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState({ isDragging: false, startX: 0, scrollLeft: 0 });

  const visibleFlights = useMemo(() => ALL_FLIGHTS.filter(f => f.cat === activeFilter), [activeFilter]);

  const scrollToCard = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('.snap-center');
    if (cards[index]) {
      const targetCard = cards[index] as HTMLElement;
      const scrollPos = targetCard.offsetLeft - (container.offsetWidth / 2) + (targetCard.offsetWidth / 2);
      container.scrollTo({ left: scrollPos, behavior });
    }
  };

  const handleDrag = (e: React.MouseEvent, type: 'start' | 'move' | 'end') => {
    if (!scrollContainerRef.current) return;
    if (type === 'start') {
      setDragState({ isDragging: true, startX: e.pageX - scrollContainerRef.current.offsetLeft, scrollLeft: scrollContainerRef.current.scrollLeft });
    } else if (type === 'move' && dragState.isDragging) {
      const walk = (e.pageX - scrollContainerRef.current.offsetLeft - dragState.startX) * 1.5;
      scrollContainerRef.current.scrollLeft = dragState.scrollLeft - walk;
    } else {
      setDragState(prev => ({ ...prev, isDragging: false }));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCard(1, 'auto');
      if (visibleFlights[1]) setActiveId(visibleFlights[1].id);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeFilter, visibleFlights]);

  return (
    <section className="relative w-full bg-secondary pb-96 overflow-visible">
      <div className="absolute inset-0 z-0">
        <CloudinaryImage publicId="v1769270546/flightexp_kisynt" alt="Sky" fill priority className="object-cover" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 z-10 text-left">
        <header className="pt-24 text-center mb-16">
          <h4 className="text-secondary mb-6 tracking-widest uppercase">CHOOSE YOUR ASCENT</h4>
          <h2 className="text-secondary">Flight Experiences <br />Designed for adventure</h2>
        </header>

        {/* --- Tabs y Slider de Vuelos (Sin tocar) --- */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="h-[72px] bg-background p-2 shadow-lg rounded-full w-full max-w-[512px] border-none">
              {['shared', 'private', 'vip'].map((v) => (
                <TabsTrigger key={v} value={v} className="flex-1 h-full rounded-full font-bold text-sm capitalize data-[state=active]:bg-secondary data-[state=active]:text-background text-secondary transition-all">
                  {v === 'vip' ? 'vip & tours' : v}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeFilter} className="outline-none m-0">
            <div 
              ref={scrollContainerRef}
              onMouseDown={(e) => handleDrag(e, 'start')}
              onMouseMove={(e) => handleDrag(e, 'move')}
              onMouseUp={() => handleDrag(null as any, 'end')}
              onMouseLeave={() => handleDrag(null as any, 'end')}
              className={cn("w-full overflow-x-scroll snap-x snap-mandatory mb-32 select-none no-scrollbar", dragState.isDragging ? "cursor-grabbing" : "cursor-grab")}
              style={{ paddingLeft: 'calc(50vw - clamp(300px, 48.5vw, 349px))', paddingRight: 'calc(50vw - clamp(300px, 48.5vw, 349px))' }}
            >
              <div className="flex gap-8 w-max">
                {visibleFlights.map((flight, index) => {
                  const isActive = String(activeId) === String(flight.id);
                  return (
                    <div key={flight.id} data-id={flight.id} className="snap-center flex-shrink-0" onClick={() => !dragState.isDragging && scrollToCard(index)}>
                      <div style={{ width: 'clamp(320px, 48.5vw, 698px)' }}>
                        <div className={cn("relative w-full rounded-[1.5rem] overflow-hidden transition-all duration-300 shadow-lg", isActive ? "opacity-100" : "opacity-85")} style={{ height: 'clamp(200px, 30.4vw, 437px)' }}>
                          <CloudinaryImage publicId={flight.cloudinaryId} alt={flight.title} fill className="object-cover pointer-events-none" />
                          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-transparent to-foreground/60 p-8 flex flex-col items-center text-white text-center">
                            <h4 className="mb-4 uppercase">{activeFilter} FLIGHT</h4>
                            <h3 className="mb-auto not-italic text-white">{flight.title}</h3>
                            <div className="flex flex-col sm:flex-row items-center gap-4 pb-4">
                              <strong className="text-xl">From ${flight.price} MXN</strong>
                              <button className="bg-primary text-secondary px-8 py-2.5 rounded-full font-bold">Book Flight</button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-8 text-center mx-auto" style={{ maxWidth: 'clamp(320px, 45vw, 649px)', minHeight: '180px' }}>
                          <div className={cn("transition-all duration-300", isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none")}>
                            <p className="text-foreground font-medium text-lg leading-snug mb-6">{DESCRIPTIONS[activeFilter as keyof typeof DESCRIPTIONS]}</p>
                            <button className="text-foreground font-bold text-xl underline decoration-2 underline-offset-[2px]">View flight details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mb-32 pt-16">
          <img src="https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270546/certificate_tde9fm.png" alt="Aviation Awards" className="mx-auto w-[clamp(150px,16vw,235px)] h-auto mb-12" />
          <h2 className="text-background max-w-[858px] mx-auto mb-8 font-serif not-italic">Award-winning <br /> AVIATION COMPANY</h2>
          <p className="mx-auto text-lg text-white max-w-[608px]">
            Discover the most trusted and refined hot air balloon flight in Mexico — a seamless fusion of British precision and Mexican warmth.
          </p>
        </div>
      </div>

      {/* --- SECCIÓN DE TARJETAS INFERIORES CON BOTONES ACTUALIZADOS --- */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1231px] px-6 pb-12 translate-y-1/2 z-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <CardWithImage title="More Than a Ride, a Tradition." img="v1769270545/twocards_1_oijkmu" badge>
            As you rise with the first light, the valley unfolds below: the Pyramid of the Sun, the Avenue of the Dead, and miles of golden horizon. Each moment feels carefully orchestrated — calm, elegant, and utterly unforgettable.
          </CardWithImage>
          <CardWithImage title="Safety You Can See." img="v1769270544/Rectangle_40_1_x4el6d" dark>
            Our senior pilots, all certified by Mexico's Civil Aviation Authority and fully trained to guide you to national standards, guide you with the confidence of many years dedicated flying balloons. Every flight includes full insurance, a traditional toast after landing, and the quiet joy of watching the morning awaken.
          </CardWithImage>
        </div>
      </div>
    </section>
  );
}

function CardWithImage({ title, children, img, badge, dark }: any) {
  const containerStyle = { 
    width: '100%',
    maxWidth: '608px', 
    height: 'clamp(500px, 55vw, 650px)' 
  };

  // TARJETA DERECHA (OSCURA)
  if (dark) {
    return (
      <Card style={containerStyle} className="relative border-none overflow-hidden shadow-2xl p-0 gap-0 bg-[#06191d]">
        <CloudinaryImage publicId={img} alt={title} fill className="object-cover opacity-40" />
        <div className="relative h-full flex flex-col z-10 p-10 justify-end text-white text-left">
          <CardHeader className="p-0 mb-6 text-left">
            <CardTitle className="text-white text-3xl italic font-serif mb-4 text-left">{title}</CardTitle>
            <CardDescription className="text-slate-300 text-lg leading-relaxed opacity-100 text-left">
              {children}
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-0">
            {/* Botón variant="outline" para la tarjeta derecha */}
            <Button variant="outline" className="rounded-full px-8 py-6 font-bold text-white border-white hover:bg-white hover:text-[#06191d]">
              Meet our fleet
            </Button>
          </CardFooter>
        </div>
      </Card>
    );
  }

  // TARJETA IZQUIERDA (BLANCA)
  return (
    <Card style={containerStyle} className="relative border-none overflow-hidden shadow-2xl p-0 gap-0 bg-white">
      <div className="relative w-full h-[45%]">
        <CloudinaryImage publicId={img} alt={title} fill className="object-cover" />
      </div>
      
      <div className="flex flex-col flex-1 p-8 justify-between text-left">
        <div className="text-left">
          <CardTitle className="text-[#06191d] text-3xl italic font-serif mb-4 text-left">
            {title}
          </CardTitle>
          <CardDescription className="text-slate-700 text-base leading-relaxed opacity-100 text-left">
            {children}
          </CardDescription>
        </div>

        <CardFooter className="p-0 flex items-center justify-between mt-6">
          {/* Botón variant="secondary" para la tarjeta izquierda */}
          <Button variant="secondary" className="rounded-full px-6 py-6 font-bold">
            Explore Flight Collection
          </Button>
          
          {badge && (
            <div className="flex items-center gap-3 h-10 grayscale opacity-80">
               <img src="https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270545/awward_nvceuz.png" alt="Awards" className="h-full w-auto" />
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}