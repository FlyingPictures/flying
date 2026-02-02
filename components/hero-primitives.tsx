import { ReactNode } from 'react';
import { CloudinaryImage } from '@/components/CloudinaryImage';
import { cn } from '@/lib/utils';

interface HeroBaseProps {
  children: ReactNode;
  className?: string;
}

interface ContainerProps extends HeroBaseProps {
  publicId: string;
  overlay?: boolean;
}

export function HeroContainer({ children, className, publicId, overlay = false }: ContainerProps) {
  return (
    <section className={cn(
      'w-full overflow-hidden relative',
      'pt-[4.5rem] h-[95vh]',
      'lg:pt-0 lg:h-screen',
      className
    )}>
      <div className="absolute inset-0">
        <CloudinaryImage 
          publicId={publicId} 
          alt="Hero Background" 
          fill 
          priority 
          className="object-cover object-top" 
        />
        {overlay && <div className="absolute inset-0 bg-black/30" />}
      </div>
      {children}
    </section>
  );
}

export function HeroContent({ children, className }: HeroBaseProps) {
  return (
    <div className={cn(
      'absolute inset-0 flex flex-col items-center text-center justify-end p-2',
      className
    )}>
      <div className="w-full max-w-[1024px] flex flex-col items-center justify-end gap-2 sm:gap-4">
        {children}
      </div>
    </div>
  );
}

const textStyles = "w-full max-w-[916px] shrink-0";

export const HeroTitle = ({ children, className }: HeroBaseProps) => (
  <h1 className={cn(textStyles, "text-balance", className)}>{children}</h1>
);

export const HeroSubtitle = ({ children, className }: HeroBaseProps) => (
  <h3 className={cn(textStyles, "text-balance", className)}>{children}</h3>
);

export const HeroDescription = ({ children, className }: HeroBaseProps) => (
  <p className={cn(textStyles, "text-pretty", className)}>{children}</p>
);

export function HeroGallery({ logos }: { logos: ReadonlyArray<{ publicId: string; alt: string }> }) {
  if (!logos.length) return null;

  return (
    <div className={cn(
      "w-full mt-2 pb-4",
      "flex flex-row items-center gap-x-8",
      "overflow-x-auto scrollbar-hide snap-x snap-mandatory",
      "justify-center lg:justify-center lg:flex-wrap"
    )}>
      {logos.map((logo) => (
        <div 
          key={logo.publicId} 
          className="flex-none snap-center"
        >
          <CloudinaryImage
            publicId={logo.publicId}
            alt={logo.alt}
            width={120}
            height={48}
            className={cn(
              "w-auto h-[clamp(3rem,6vw,12rem)] object-contain",
              "brightness-90 opacity-80 transition-all duration-300 hover:opacity-100 hover:brightness-90"
            )}
          />
        </div>
      ))}
    </div>
  );
}