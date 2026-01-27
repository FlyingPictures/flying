import { ReactNode } from 'react';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';

interface HeroProps {
  children?: ReactNode;
  className?: string;
  height?: 'default' | 'full' | 'short' | string;
  verticalAlign?: 'center' | 'bottom' | 'top' | string;
  align?: 'left' | 'center' | 'right' | string;
}

interface HeroBackgroundProps {
  publicId?: string;
  cloudinaryId?: string;
  overlay?: boolean;
  children?: ReactNode;
  className?: string;
}

// 1. Contenedor Principal: 95% del viewport en mobile para asomar el sig. componente
export function HeroContainer({ children, className, height = 'default' }: HeroProps) {
  const heightVariants: Record<string, string> = {
    // 95svh asegura que el 5% del siguiente componente sea visible en móviles
    default: 'h-[95svh] lg:h-screen',
    full: 'h-screen',
    short: 'h-[60vh] md:h-[70vh]'
  };

  return (
    <section 
      className={cn(
        'relative w-full flex flex-col overflow-hidden',
        // Margen negativo para pegarse al top real ignorando el espacio del Navbar (7.5rem según tu config)
        '-mt-[7.5rem] lg:mt-0', 
        heightVariants[height] || height, 
        className
      )}
    >
      {children}
    </section>
  );
}

// 2. Fondo
export function HeroBackground({ publicId, cloudinaryId, overlay = false, children, className }: HeroBackgroundProps) {
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

// 3. Contenido
export function HeroContent({ children, className, verticalAlign = 'bottom', align = 'center' }: HeroProps) {
  const verticalStyles = {
    center: 'justify-center',
    bottom: 'justify-end pb-16', // Un poco más de padding abajo por el 95% height
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
      // En mobile, compensamos el -mt con un pt para que el texto no quede bajo la Navbar
      'justify-start pt-[8.5rem] lg:pt-0', 
      'lg:' + (verticalStyles[verticalAlign as keyof typeof verticalStyles] || verticalStyles.bottom),
      horizontalStyles[align as keyof typeof horizontalStyles] || horizontalStyles.center,
      className
    )}>
      <div className={cn(
        "w-full max-w-[1200px] flex flex-col gap-6 lg:gap-4",
        align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start'
      )}>
        {children}
      </div>
    </div>
  );
}

// 4. Sub-componentes
export function HeroTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cn("w-full max-w-[916px] block", className)}>{children}</h1>;
}

export function HeroSubtitle({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn("w-full max-w-[916px] not-italic block", className)}>{children}</em>;
}

export function HeroDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("w-full max-w-[604px]", className)}>{children}</p>;
}

// 5. Galería de Logos
export function HeroGallery({ logos }: { logos: ReadonlyArray<{ publicId: string; alt: string }> }) {
  if (!logos || logos.length === 0) return null;
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