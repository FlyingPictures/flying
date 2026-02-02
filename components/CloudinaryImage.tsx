// components/ui/CloudinaryImage.tsx
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
  width = 1200,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  objectFit = 'cover',
}: CloudinaryImageProps) {
  if (!publicId) {
    return null;
  }

  const src = cloudinaryUrl(publicId, width);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || '100vw'}
        style={{ objectFit }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height || Math.round(width * 0.67)}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}