const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkmjguzvx';

export function cloudinaryUrl(publicId: string, width?: number): string {
  if (!publicId) return '';

  const cleanId = publicId.replace(/^v\d+\//, '');

  const transforms = [
    'f_auto',
    'q_auto:good',
    width && `w_${width}`,
    width && 'c_limit',
  ]
    .filter(Boolean)
    .join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${cleanId}`;
}