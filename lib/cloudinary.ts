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