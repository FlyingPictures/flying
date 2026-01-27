import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';

interface FlightCardProps {
  imageId: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  className?: string;
}

export function FlightCard({
  imageId,
  title,
  description,
  price,
  duration,
  className,
}: FlightCardProps) {
  return (
    <article className={cn('group relative overflow-hidden rounded-xl', className)}>
      <div className="relative aspect-video overflow-hidden">
        <CloudinaryImage
          publicId={imageId}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex items-center justify-between">
          {duration && (
            <span className="text-sm text-gray-500">{duration}</span>
          )}
          {price && (
            <span className="text-lg font-semibold text-primary">{price}</span>
          )}
        </div>
      </div>
    </article>
  );
}