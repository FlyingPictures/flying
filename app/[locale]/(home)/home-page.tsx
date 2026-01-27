// lib/cloudinary.ts
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'avif';
  gravity?: 'auto' | 'face' | 'center';
}

export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    gravity = 'auto'
  } = options;

  const transformations = [
    'f_' + format,
    'q_' + quality,
    width && 'w_' + width,
    height && 'h_' + height,
    'g_' + gravity,
    'c_fill'
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

// Helper para responsive images
export function getCloudinaryResponsiveSrcSet(publicId: string) {
  return {
    srcSet: `
      ${getCloudinaryUrl(publicId, { width: 640 })} 640w,
      ${getCloudinaryUrl(publicId, { width: 750 })} 750w,
      ${getCloudinaryUrl(publicId, { width: 828 })} 828w,
      ${getCloudinaryUrl(publicId, { width: 1080 })} 1080w,
      ${getCloudinaryUrl(publicId, { width: 1200 })} 1200w,
      ${getCloudinaryUrl(publicId, { width: 1920 })} 1920w,
      ${getCloudinaryUrl(publicId, { width: 2048 })} 2048w
    `,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  };
}