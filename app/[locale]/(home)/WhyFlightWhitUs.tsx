"use client";
import React, { useState, useEffect } from 'react';
import { CloudinaryImage } from '@/components/CloudinaryImage';

interface ImageGridSectionProps {
  translations: {
    h2: string;
    paragraph: string;
    takeaway?: string;
    cards: Array<{
      title: string;
      paragraph: string;
    }>;
  };
}

export function WhyFlightWhitUs({ translations }: ImageGridSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cardAssets = [
    { 
      id: 'minigallery1_auhyyf', 
      logo: 'https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270546/cameronlogo_hve9ws.png',
      titleWidth: '302px',
    },
    { id: 'minigallery2_bakwy5', titleWidth: '291px' },
    { id: 'minigallery3_wbdxcz', titleWidth: '328px' }
  ];

  return (
    <section className="relative w-full min-h-screen lg:h-[1655px] bg-foreground overflow-hidden">
      
      {/* 1. BACKGROUND (Rectangle 44) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <CloudinaryImage 
          publicId="Rectangle_44_1_cuhoex" 
          alt="Background" 
          fill 
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/20 to-foreground" />
      </div>

      {/* 2. GROUP 51: EL DIV ENVOLVENTE (Eje central del UX) */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 lg:px-0 lg:h-full">
        
        {/* HEADER: Adaptativo (Centrado en mobile, Figma positions en Desktop) */}
        <div className="flex flex-col items-center lg:items-start pt-20 lg:pt-0 lg:absolute lg:top-[586px] lg:w-full">
          <h2 className="text-background text-center lg:text-left text-[40px] md:text-[56px] lg:text-[64px] font-semibold leading-tight lg:leading-[83px] tracking-[-0.03em] lg:max-w-[493px]">
            {translations.h2}
          </h2>

          <div className="mt-8 lg:mt-0 lg:absolute lg:left-[615px] lg:top-0 lg:w-[589px] flex flex-col gap-3 text-center lg:text-left">
            <h4 className="text-background font-bold text-[14px] uppercase tracking-widest">
              {translations.takeaway || "THE 30 SECOND TAKEAWAY"}
            </h4>
            <p className="text-background font-medium text-[18px] lg:text-[20px] leading-relaxed lg:leading-[22px]">
              {translations.paragraph}
            </p>
          </div>
        </div>

        {/* GRID DE TARJETAS: UX Centrado en Mobile */}
        <div className="mt-16 lg:mt-0 lg:absolute lg:top-[872px] flex flex-col lg:flex-row gap-12 lg:gap-[45px] items-center lg:items-start pb-20 lg:pb-0">
          {translations.cards.slice(0, 3).map((card, index) => {
            const asset = cardAssets[index];
            return (
              <div key={index} className="flex flex-col items-center lg:items-start w-full max-w-[365px]">
                
                {/* Imagen (Rectangle 41/42/43) */}
                <div className="relative w-full h-[437px] rounded-[22px] overflow-hidden shadow-2xl border border-background/5">
                  <CloudinaryImage publicId={asset.id} alt={card.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                  
                  {asset.logo && (
                    <div className="absolute left-[31px] bottom-[121px] w-[66px] h-[28px]">
                       <img src={asset.logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                  )}

                  {/* Título: Dentro de la imagen para Desktop, pero centrado para Mobile */}
                  <h3 
                    className="absolute bottom-[32px] left-0 w-full px-[31px] text-background italic text-[28px] lg:text-[32px] leading-tight tracking-[-0.03em] text-center lg:text-left"
                    style={{ maxWidth: asset.titleWidth }}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* Párrafo descriptivo debajo de la imagen */}
                <p className="mt-6 text-background font-medium text-[17px] lg:text-[18px] leading-[22px] text-center lg:text-left opacity-90">
                  {card.paragraph}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}