// lib/cloudinary.ts
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkmjguzvx';

export function cloudinaryUrl(publicId: string): string {
  if (!publicId) return '';
  const cleanId = publicId.replace(/^v\d+\//, '');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${cleanId}`;
}