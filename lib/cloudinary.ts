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