'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Definimos la interfaz para que coincida con la página de producto
interface ProductImage {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
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

  // Lógica de visualización de la rejilla
  const displayImages = images.slice(0, 5);
  const remainingCount = images.length - displayImages.length;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className={cn('space-y-4', className)}>
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayImages.map((image, index) => (
            <div
              key={image.src}
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
                <Image
                  src={image.src}
                  alt={image.alt}
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

              {/* Overlay para la última imagen si hay más */}
              {index === displayImages.length - 1 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-white">
                    <p className="text-2xl font-bold">+{remainingCount}</p>
                    <p className="text-sm">{viewAllText}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 text-center font-medium">
          {images.length} {photosText}
        </p>
      </div>

      {/* Lightbox / Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[110] p-2 text-white hover:bg-white/10 rounded-full transition"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-6 z-[110] p-3 text-white hover:bg-white/10 rounded-full transition"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-6 z-[110] p-3 text-white hover:bg-white/10 rounded-full transition"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div 
            className="relative w-full h-full max-w-6xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-base font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}