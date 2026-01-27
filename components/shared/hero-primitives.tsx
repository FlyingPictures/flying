import { ReactNode } from 'react';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';

// 1. Actualizamos la interfaz para aceptar height
interface HeroProps {
  children: ReactNode;
  className?: string;
  height?: 'default' | 'full' | 'short'; // Agregamos la prop opcional
}

interface HeroBackgroundProps {
  publicId: string;
  overlay?: boolean;
  children?: ReactNode;
}

// 2. Implementamos la lógica de height en el contenedor
export function HeroContainer({ children, className, height = 'default' }: HeroProps) {
  // Mapeo de alturas para tener control total
  const heightVariants = {
    default: 'h-[95svh] lg:h-screen',
    full: 'h-screen',
    short: 'h-[60vh] md:h-[70vh]'
  };

  return (
    <section 
      className={cn(
        'relative w-full flex flex-col overflow-hidden', 
        heightVariants[height] || heightVariants.default, // Usa la variante o el default
        className
      )}
    >
      {children}
    </section>
  );
}

export function HeroBackground({ publicId, overlay = false, children }: HeroBackgroundProps) {
  return (
    <>
      <div className="absolute inset-0 -z-10">
        <CloudinaryImage 
          publicId={publicId} 
          alt="Hero BG" 
          fill 
          priority 
          className="object-cover" 
        />
        {overlay && <div className="absolute inset-0 bg-black/40" />}
      </div>
      {children}
    </>
  );
}

// ... El resto de tus componentes (HeroContent, HeroTitle, etc.) se mantienen igual
export function HeroContent({ children, className }: Omit<HeroProps, 'height'>) {
  return (
    <div className={cn('relative z-10 w-full h-full flex flex-col items-center text-center justify-end pb-12 px-6 lg:px-8', className)}>
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-8 lg:gap-4">
        {children}
      </div>
    </div>
  );
}

export function HeroTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cn("w-full max-w-[916px] block", className)}>{children}</h1>;
}

export function HeroSubtitle({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn("w-full max-w-[916px]", className)}>{children}</em>;
}

export function HeroDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("w-full max-w-[604px]", className)}>{children}</p>;
}

export function HeroGallery({ logos }: { logos: ReadonlyArray<{ publicId: string; alt: string }> }) {
  if (!logos.length) return null;
  return (
    <div className="w-full max-w-[1025px] flex flex-row items-center justify-between gap-x-4 mt-8 shrink-0">
      {logos.map((logo) => (
        <div key={logo.publicId} className="flex-1 flex justify-center min-w-0">
          <CloudinaryImage
            publicId={logo.publicId}
            alt={logo.alt}
            width={150}
            height={60}
            className="w-full max-w-[clamp(70px,10vw,130px)] h-auto object-contain brightness-70 invert opacity-40 transition-opacity hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );
}