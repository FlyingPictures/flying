const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkmjguzvx';

// Objeto que falta y causa el error en product-hero.tsx
export const IMAGES = {
  backgrounds: {
    reviews: 'flying-pictures/backgrounds/balloon-sunrise', // O la ruta exacta en tu Cloudinary
  },
  ui: {
    avatarDefault: 'v1769505304/Ellipse_8_reoc5x.png',
    starsGroup: 'v1769505467/Group_64_xrfcje.png',
  }
};

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