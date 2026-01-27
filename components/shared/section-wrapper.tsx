import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  backgroundImageId?: string;
  backgroundOpacity?: number;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
}

export function SectionWrapper({
  children,
  backgroundImageId,
  backgroundOpacity = 0.1,
  className,
  containerClassName,
  fullWidth = false,
}: SectionWrapperProps) {
  return (
    <section className={cn('relative py-16 md:py-24', className)}>
      {backgroundImageId && (
        <>
          <div className="absolute inset-0 z-0">
            <CloudinaryImage
              publicId={backgroundImageId}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0 z-0 bg-white"
            style={{ opacity: 1 - backgroundOpacity }}
          />
        </>
      )}

      <div className="relative z-10">
        <div className={cn(
          !fullWidth && 'container mx-auto px-4',
          containerClassName
        )}>
          {children}
        </div>
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-12', alignClasses[align], className)}>
      {subtitle && (
        <p className="text-sm md:text-base text-primary font-semibold mb-2 uppercase tracking-wide">
          {subtitle}
        </p>
      )}
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {title}
      </h2>
      
      {description && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}