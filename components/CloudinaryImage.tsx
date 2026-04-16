// components/CloudinaryImage.tsx
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
  sizes?: string;               // ← AGREGADO
  objectFit?: 'cover' | 'contain' | 'fill';
}

export function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,                        // ← AGREGADO
  objectFit = 'cover',
}: CloudinaryImageProps) {
  if (!publicId) return null;
  const src = cloudinaryUrl(publicId);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}            // ← PASADO
        className={className}
        unoptimized={true}
        style={{ objectFit }}
      />
    );
  }

  if (!width || !height) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      unoptimized={true}
    />
  );
}