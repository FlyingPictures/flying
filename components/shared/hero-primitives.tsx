import { ReactNode } from 'react';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';

// 1. Interfaz unificada para soportar todas las props enviadas desde las páginas
interface HeroProps {
  children?: ReactNode;
  className?: string;
  height?: 'default' | 'full' | 'short' | string;
  verticalAlign?: 'center' | 'bottom' | 'top' | string;
  align?: 'left' | 'center' | 'right' | string; // Añadido para soportar product-hero
}

interface HeroBackgroundProps {
  publicId?: string;
  cloudinaryId?: string; // Añadido para soportar la discrepancia en product-hero
  overlay?: boolean;
  children?: ReactNode;
  className?: string;
}

export function HeroContainer({ children, className, height = 'default' }: HeroProps) {
  const heightVariants: Record<string, string> = {
    default: 'h-[95svh] lg:h-screen',
    full: 'h-screen',
    short: 'h-[60vh] md:h-[70vh]'
  };

  return (
    <section 
      className={cn(
        'relative w-full flex flex-col overflow-hidden', 
        heightVariants[height] || height, 
        className
      )}
    >
      {children}
    </section>
  );
}

export function HeroBackground({ publicId, cloudinaryId, overlay = false, children, className }: HeroBackgroundProps) {
  // Soporta ambos nombres de propiedad para evitar errores de compilación
  const activeId = publicId || cloudinaryId;

  return (
    <>
      <div className={cn("absolute inset-0 -z-10", className)}>
        {activeId && (
          <CloudinaryImage 
            publicId={activeId} 
            alt="Hero BG" 
            fill 
            priority 
            className="object-cover" 
          />
        )}
        {overlay && <div className="absolute inset-0 bg-black/40" />}
      </div>
      {children}
    </>
  );
}

export function HeroContent({ children, className, verticalAlign = 'bottom', align = 'center' }: HeroProps) {
  const verticalStyles = {
    center: 'justify-center',
    bottom: 'justify-end pb-12',
    top: 'justify-start pt-12'
  };

  const horizontalStyles = {
    center: 'items-center text-center',
    left: 'items-start text-left',
    right: 'items-end text-right'
  };

  return (
    <div className={cn(
      'relative z-10 w-full h-full flex flex-col px-6 lg:px-8',
      verticalStyles[verticalAlign as keyof typeof verticalStyles] || verticalStyles.bottom,
      horizontalStyles[align as keyof typeof horizontalStyles] || horizontalStyles.center,
      className
    )}>
      <div className="w-full max-w-[1200px] flex flex-col items-inherit gap-8 lg:gap-4">
        {children}
      </div>
    </div>
  );
}

export function HeroTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cn("w-full max-w-[916px] block", className)}>{children}</h1>;
}

export function HeroSubtitle({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn("w-full max-w-[916px] not-italic", className)}>{children}</em>;
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