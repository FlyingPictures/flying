"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CloudinaryImage } from "@/components/CloudinaryImage";
import { Button } from "@/components/ui/button";

/**
 * 🧱 ESQUELETO BASE (Interno)
 * Basado en tu estructura original para mantener la coherencia técnica.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground overflow-hidden rounded-card flex flex-col relative",
        "w-[345px] transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 py-4", className)} {...props} />;
}

/**
 * 🎴 VARIANTES EXPORTABLES
 * Cada una con sus dimensiones fijas de Figma y slots para props.
 */

export function CardTradition({ imageId, title, description, badge, children }: any) {
  return (
    <div className="relative w-full lg:w-[clamp(450px,42vw,608px)] h-[503px] lg:h-[clamp(650px,55vw,797px)] flex flex-col bg-transparent">
      <div className="relative w-full h-[207px] lg:h-[clamp(300px,30vw,444px)] rounded-t-card overflow-hidden">
        <CloudinaryImage 
          publicId={imageId} 
          alt={title} 
          fill 
          className="object-cover"
        />
      </div>

      <div className="relative w-full h-[296px] lg:h-[clamp(300px,25vw,353px)] bg-card rounded-b-card p-6 lg:p-[clamp(24px,2.7vw,40px)_clamp(24px,2.7vw,40px)_clamp(26px,2.9vw,42px)_clamp(24px,2.7vw,40px)] flex flex-col gap-4">
        <h3 className="text-secondary">{title}</h3>
        <p className="text-secondary">{description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex-shrink-0">
            {children}
          </div>
          
          {badge && (
            <div className="relative w-[clamp(110px,10vw,142px)] aspect-[142/36]">
              {badge}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 2. Safety Full Overlay (452px)
export function CardSafetyOverlay({ imageId, title, description, children }: any) {
  return (
    <Card className="h-[452px] border-none shadow-none">
      <CloudinaryImage publicId={imageId} alt={title} fill className="rounded-card" />
      <div className="absolute inset-0 p-10 flex flex-col justify-end gap-4 bg-black/10">
        <h3 className="text-white text-[28px] font-libre-baskerville italic leading-tight">{title}</h3>
        <p className="text-white text-sm font-inter font-medium">{description}</p>
        <div className="mt-2">{children}</div>
      </div>
    </Card>
  );
}

// 5. Review / Testimonial (281px)
export function CardTestimonial({ name, role, quote, review }: any) {
  return (
    <Card className="h-[281px] bg-card p-6 border border-border shadow-sm">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-secondary/10 shrink-0" />
        <div className="flex flex-col">
          <h4 className="text-secondary text-sm font-bold leading-none">{name}</h4>
          <span className="text-secondary/60 text-[13px] font-medium">{role}</span>
        </div>
      </div>
      <div className="h-px w-full bg-secondary/20 my-3" />
      <h3 className="text-secondary text-[20px] font-libre-baskerville italic leading-tight">“{quote}”</h3>
      <p className="text-secondary text-sm font-inter font-medium leading-relaxed mt-1 line-clamp-2">{review}</p>
      <div className="flex gap-1.5 mt-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="size-[17px] bg-[#F7A533]" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
        ))}
      </div>
    </Card>
  );
}

// 6. Fleet / Cameron (675px)
export function CardFleet({ imageId, model, plate, description, capacity, mission }: any) {
  return (
    <Card className="h-[675px] bg-transparent border-none">
      <div className="w-full h-[437px] rounded-card overflow-hidden relative">
        <CloudinaryImage publicId={imageId} alt={model} fill />
        <div className="absolute bottom-8 left-8">
          <h3 className="text-white text-2xl font-libre-baskerville italic leading-none">{model}</h3>
          <span className="text-white font-inter text-base opacity-90 tracking-widest uppercase">{plate}</span>
        </div>
      </div>
      <div className="mt-8 px-6 flex flex-col gap-6">
        <p className="text-white text-sm font-medium leading-relaxed">{description}</p>
        <div className="flex flex-col gap-4 text-white text-[11px] font-bold font-inter italic uppercase tracking-[0.1em]">
          <div className="flex items-center gap-4">
            <div className="size-6 border border-white/30 rounded-sm" /> 
            Capacity: {capacity}
          </div>
          <div className="flex items-center gap-4">
            <div className="size-6 border border-white/30 rounded-sm" /> 
            Mission: {mission}
          </div>
        </div>
      </div>
    </Card>
  );
}

// 7. Contact & Inquiries (485px)
export function CardContact({ title, subtitle, info, email, phone, imageId }: any) {
  return (
    <Card className="h-[485px] bg-transparent border-none gap-8">
      <div className="text-center">
        <h2 className="text-secondary text-[36px] font-poppins font-medium leading-tight tracking-tight">{title}</h2>
        <p className="text-secondary text-[12px] font-bold uppercase tracking-[0.2em] mt-2">{subtitle}</p>
      </div>
      <div className="bg-card rounded-[24px] overflow-hidden h-[327px] border border-border flex flex-col shadow-sm">
        <div className="h-[150px] relative"><CloudinaryImage publicId={imageId} alt="Contact" fill /></div>
        <div className="p-5 flex flex-col gap-4">
          <p className="text-secondary text-[15px] font-medium leading-snug">{info}</p>
          <div className="flex flex-col gap-2 text-secondary text-[11px] font-bold font-inter uppercase tracking-wider">
            <div>Email: {email}</div>
            <div>Phone: {phone}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// 8. Onion Strategy / Dress Code (321px)
export function CardOnion({ imageId, title, description }: any) {
  return (
    <Card className="h-[321px] bg-transparent border-none gap-4">
      <div className="w-full h-[192px] rounded-card overflow-hidden relative">
        <CloudinaryImage publicId={imageId} alt={title} fill />
        <div className="absolute bottom-4 left-6">
          <h3 className="text-white text-[20px] font-libre-baskerville italic">{title}</h3>
        </div>
      </div>
      <div className="px-2">
        <p className="text-white text-sm font-inter font-medium leading-relaxed italic">{description}</p>
      </div>
    </Card>
  );
}