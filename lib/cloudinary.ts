const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkmjguzvx';

export function cloudinaryUrl(
  publicId: string,
  width?: number,
  options?: { height?: number; crop?: string; gravity?: string; quality?: string }
): string {
  if (!publicId) return '';

  const cleanId = publicId.replace(/^v\d+\//, '');

  const transforms = [
    'f_auto',
    options?.quality ? `q_${options.quality}` : 'q_auto:eco',
    width && `w_${width}`,
    options?.height && `h_${options.height}`,
    options?.crop ? `c_${options.crop}` : width && 'c_limit',
    options?.gravity && `g_${options.gravity}`,
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${cleanId}`;
}