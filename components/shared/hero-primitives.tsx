import { ReactNode } from 'react';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';

interface HeroProps {
  children: ReactNode;
  className?: string;
}

/**
 * Contenedor principal: Ocupa toda la pantalla (svh para móviles)
 * Se asegura de que el fondo cubra todo el viewport.
 */
export function HeroContainer({ children, className }: HeroProps) {
  return (
    <section className={cn('absolut w-full h-[95svh] lg:h-screen flex flex-col overflow-hidden', className)}>
      {children}
    </section>
  );
}

/**
 * Imagen de fondo: Se mantiene absoluta cubriendo todo el contenedor.
 */
export function HeroBackground({ publicId, overlay = false, children }: { publicId: string; overlay?: boolean; children?: ReactNode }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <CloudinaryImage 
        publicId={publicId} 
        alt="Hero BG" 
        fill 
        priority 
        className="object-cover object-top" 
      />
      {overlay && <div className="absolute inset-0 bg-black/40" />}
      {children}
    </div>
  );
}

/**
 * Contenido: Modificado a 'justify-end' para anclarse abajo.
 * El pt-[7rem] respeta el espacio del Navbar superior.
 */
export function HeroContent({ children, className }: HeroProps) {
  return (
    <div className={cn(
      'relative z-10 w-full h-full flex flex-col items-center text-center',
      'pt-[7rem] pb-[clamp(2.5rem,10vh,6rem)] px-6 lg:px-8 justify-end', 
      className
    )}>
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-[clamp(1rem,3vh,2rem)]">
        {children}
      </div>
    </div>
  );
}

export function HeroTitle({ children, className }: HeroProps) {
  /* Clamp: Min 1.8rem, ideal 5vh, Max 3.5rem */
  return <h1 className={cn("w-full max-w-[916px] block text-[clamp(1.8rem,5vh,3.5rem)] leading-[1.1] font-bold text-white", className)}>{children}</h1>;
}

export function HeroSubtitle({ children, className }: HeroProps) {
  /* Clamp: Min 0.9rem, ideal 2.5vh, Max 1.25rem */
  return <em className={cn("w-full max-w-[916px] not-italic text-[clamp(0.9rem,2.5vh,1.25rem)] text-white/90", className)}>{children}</em>;
}

export function HeroDescription({ children, className }: HeroProps) {
  return <p className={cn("w-full max-w-[604px] text-[clamp(0.85rem,2vh,1.1rem)] text-white/80", className)}>{children}</p>;
}

/**
 * Galería de logos: Ajustada para mantener coherencia en la parte inferior.
 */
export function HeroGallery({ logos }: { logos: ReadonlyArray<{ publicId: string; alt: string }> }) {
  if (!logos.length) return null;
  return (
    <div className="w-full max-w-[1025px] flex flex-row items-center justify-center gap-x-[clamp(1rem,4vw,3rem)] mt-[clamp(1.5rem,4vh,3rem)]  flex-wrap">
      {logos.map((logo) => (
        <div key={logo.publicId} className="flex justify-center min-w-[60px]">
          <CloudinaryImage
            publicId={logo.publicId}
            alt={logo.alt}
            width={150}
            height={60}
            className="w-full max-w-[clamp(60px,7vh,120px)] h-auto object-contain invert opacity-60 transition-opacity hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );
}