const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkmjguzvx';

export function cloudinaryUrl(publicId: string, width?: number): string {
  if (!publicId || publicId.startsWith('http')) return publicId;
  
  const transforms = [
    'f_auto',
    'q_auto',
    width && `w_${width}`,
    'c_limit',
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export const IMAGES = {
  hero: {
    product: 'v1769106748/product_hero_xxxxx',
    contact: 'v1769106748/contact_hero_hb2kwa',
    safety: 'v1769106749/safety_hero_xxxxx',
    flight: 'v1769106750/flightexp_hero_rw8fkj',
  },
  // Agrega más imágenes según necesites
} as const;