const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkmjguzvx';

export function cloudinaryUrl(publicId: string, width?: number): string {
  if (!publicId) return '';

  const transforms = [
    'f_auto',
    'q_auto:best',
    width && `w_${width}`,
    width && 'c_fill,g_auto',
  ]
    .filter(Boolean)
    .join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}