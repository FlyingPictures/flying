import { ReactNode } from 'react';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';

interface HeroProps {
  children: ReactNode;
  className?: string;
}

export function HeroContainer({ children, className }: HeroProps) {
  return (
    <section className={cn('relative w-full h-[95svh] lg:h-screen flex flex-col overflow-hidden', className)}>
      {children}
    </section>
  );
}

export function HeroBackground({ publicId, overlay = false }: { publicId: string; overlay?: boolean }) {
  return (
    <div className="absolute inset-0 -z-10">
      <CloudinaryImage publicId={publicId} alt="Hero BG" fill priority className="object-cover" />
      {overlay && <div className="absolute inset-0 bg-black/40" />}
    </div>
  );
}

export function HeroContent({ children, className }: HeroProps) {
  return (
    <div className={cn('relative z-10 w-full h-full flex flex-col items-center text-center justify-end pb-12 px-6 lg:px-8', className)}>
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-8 lg:gap-4">
        {children}
      </div>
    </div>
  );
}

export function HeroTitle({ children }: { children: ReactNode }) {
  return <h1 className="w-full max-w-[916px] block">{children}</h1>;
}

export function HeroSubtitle({ children }: { children: ReactNode }) {
  return <em className="w-full max-w-[916px]">{children}</em>;
}

export function HeroDescription({ children }: { children: ReactNode }) {
  return <p className="w-full max-w-[604px]">{children}</p>;
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