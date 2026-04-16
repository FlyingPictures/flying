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
  urlWidth?: number;        // Ancho al que redimensionar en Cloudinary (solo para fill)
  loading?: 'lazy' | 'eager'; // Carga diferida
  quality?: number | string;   // Calidad (por defecto 95)
}

export function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  objectFit = 'cover',
  urlWidth,
  loading,
  quality = 95,
}: CloudinaryImageProps) {
  if (!publicId) return null;

  // Construir la URL con el ancho adecuado
  let imageWidth: number | undefined;
  if (fill && urlWidth) {
    imageWidth = urlWidth;
  } else if (!fill && width) {
    imageWidth = width;
  }
  const src = cloudinaryUrl(publicId, imageWidth, quality);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={loading}
        sizes={sizes ?? "100vw"}
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
      loading={loading}
      className={className}
      unoptimized={true}
    />
  );
}