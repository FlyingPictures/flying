'use client';

import { useState } from 'react';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  viewAllText?: string;
  photosText?: string;
  className?: string;
}

export function ProductGallery({
  images,
  viewAllText = "Ver todas",
  photosText = "fotos",
  className,
}: ProductGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const displayImages = images.slice(0, 5);
  const remainingCount = images.length - displayImages.length;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className={cn('space-y-4', className)}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayImages.map((publicId, index) => (
            <div
              key={publicId}
              onClick={() => openLightbox(index)}
              className={cn(
                'relative overflow-hidden rounded-xl cursor-pointer group',
                index === 0 && 'md:col-span-2 md:row-span-2'
              )}
            >
              <div className={cn(
                'relative',
                index === 0 ? 'aspect-square md:aspect-[4/3]' : 'aspect-square'
              )}>
                <CloudinaryImage
                  publicId={publicId}
                  alt={`Imagen ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes={index === 0 
                    ? '(max-width: 768px) 100vw, 50vw'
                    : '(max-width: 768px) 50vw, 25vw'
                  }
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              {index === displayImages.length - 1 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-2xl font-bold">+{remainingCount}</p>
                    <p className="text-sm">{viewAllText}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 text-center">
          {images.length} {photosText}
        </p>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-full transition"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-full transition"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
            <CloudinaryImage
              publicId={images[currentIndex]}
              alt={`Imagen ${currentIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}