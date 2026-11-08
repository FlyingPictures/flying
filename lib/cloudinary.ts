const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkmjguzvx';

export function cloudinaryUrl(publicId: string, width?: number, quality: number | string = 95): string {
  if (!publicId) return '';
  const cleanId = publicId.replace(/^v\d+\//, '');
  const transforms = [`q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  // No usamos f_auto para mantener formato original (evita compresión extra)
  const transformString = transforms.join(',');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${cleanId}`;
}

export function cloudinaryOgUrl(publicId: string): string {
  if (!publicId) return '';
  const cleanId = publicId.replace(/^v\d+\//, '');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_jpg/${cleanId}`;
}

// Photo delivery is separate from logos and other existing artwork.
export function cloudinaryPhotoUrl(publicId: string, width: number, aspectRatio?: string, gravity: 'center' | 'faces' = 'center'): string {
  const cleanId = publicId.replace(/^v\d+\//, '');
  const imageWidth = Math.min(3840, Math.max(1, Math.round(width)));
  const resize = aspectRatio
    ? `c_fill,g_${gravity},ar_${aspectRatio},w_${imageWidth}`
    : `c_limit,w_${imageWidth}`;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${resize}/f_auto,q_auto:good/${cleanId}`;
}
