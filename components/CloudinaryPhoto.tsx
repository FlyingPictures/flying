'use client';

import Image, { type ImageLoaderProps } from 'next/image';
import { cloudinaryPhotoUrl } from '@/lib/cloudinary';

interface CloudinaryPhotoProps {
  publicId: string;
  alt: string;
  fill: true;
  sizes: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
}

/** Let the browser choose a CDN rendition without a second image encoder. */
export function CloudinaryPhoto({ publicId, alt, aspectRatio, priority = false, ...props }: CloudinaryPhotoProps) {
  const loader = ({ src, width }: ImageLoaderProps) => cloudinaryPhotoUrl(src, width, aspectRatio);

  return <Image {...props} alt={alt} src={publicId} loader={loader} priority={priority} />;
}
