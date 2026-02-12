import Image from 'next/image';
import { cloudinaryUrl } from '@/lib/cloudinary';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

export function CloudinaryImage({
  publicId,
  alt,
  width = 2200,
  height,
  className,
  priority = false,
  fill = false,
  sizes = '100vw',
  objectFit = 'cover',
}: CloudinaryImageProps) {
  if (!publicId) return null;

  const src = cloudinaryUrl(publicId, fill ? undefined : width);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
        style={{ objectFit, border: 'none', boxShadow: 'none' }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height || Math.round(width * 0.67)}
      priority={priority}
      sizes={sizes}
      className={className}
      style={{ border: 'none', boxShadow: 'none' }}
    />
  );
}