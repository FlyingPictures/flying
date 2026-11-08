'use client';

import { useEffect, useRef, useState } from 'react';
import { cloudinaryPhotoUrl } from '@/lib/cloudinary';
import { IMAGES } from '@/lib/images';

const SLIDES = IMAGES.home.hero.slides;
const HOLD_MS = 8000;

function heroSrcSet(slide: (typeof SLIDES)[number], widths: number[], aspectRatio?: string) {
  const [widthRatio, heightRatio] = (aspectRatio ?? '1:1').split(':').map(Number);
  const maxWidth = Math.min(3840, slide.width, aspectRatio
    ? Math.floor(slide.height * widthRatio / heightRatio)
    : slide.width);
  const candidates = [...new Set(widths.map((width) => Math.min(width, maxWidth)))];

  return candidates.map((width) =>
    `${cloudinaryPhotoUrl(slide.publicId, width, aspectRatio, slide.gravity)} ${width}w`,
  ).join(', ');
}

export function HomeHeroSlideshow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstImageRef = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState(0);
  const [renderedCount, setRenderedCount] = useState(1);
  const [ready, setReady] = useState<readonly number[]>([]);
  const [canAnimate, setCanAnimate] = useState(false);
  const next = (active + 1) % SLIDES.length;
  const activeReady = ready.includes(active);
  const nextReady = ready.includes(next);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = true;
    const update = () => setCanAnimate(!preference.matches && !document.hidden && inView);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    if (containerRef.current) observer.observe(containerRef.current);
    update();
    document.addEventListener('visibilitychange', update);
    preference.addEventListener('change', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      preference.removeEventListener('change', update);
    };
  }, []);

  // A cached first image can finish before React attaches its load handler.
  useEffect(() => {
    const image = firstImageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      void image.decode().catch(() => {}).then(() => setReady((loaded) =>
        loaded.includes(0) ? loaded : [...loaded, 0],
      ));
    }
  }, []);

  useEffect(() => {
    if (!canAnimate || !activeReady || renderedCount === SLIDES.length) return;
    // Prepare only the next photograph, after the current one has painted.
    const timer = window.setTimeout(() => setRenderedCount((count) =>
      Math.max(count, Math.min(active + 2, SLIDES.length)),
    ), 1000);
    return () => window.clearTimeout(timer);
  }, [active, activeReady, canAnimate, renderedCount]);

  useEffect(() => {
    if (!canAnimate || !nextReady) return;
    const timer = window.setTimeout(() => setActive(next), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [active, canAnimate, next, nextReady]);

  return (
    <div ref={containerRef} aria-hidden="true" data-home-hero-slideshow data-active-slide={active} data-playing={canAnimate}
      className="pointer-events-none absolute inset-0 overflow-hidden bg-secondary">
      {SLIDES.slice(0, renderedCount).map((slide, index) => (
        <picture key={slide.publicId} data-hero-slide={index} data-current={active === index}
          className={`absolute inset-0 transition-opacity duration-[2200ms] ease-in-out motion-reduce:transition-none ${
            active === index ? 'opacity-100' : 'opacity-0'
          } ${index === 0 ? 'motion-reduce:opacity-100' : 'motion-reduce:opacity-0'}`}>
          <source media="(max-width: 640px)" srcSet={heroSrcSet(slide, [480, 640, 828, 1080], '1:2')} sizes="100vw" />
          <source media="(max-width: 1024px)" srcSet={heroSrcSet(slide, [750, 1080, 1536], '3:4')} sizes="100vw" />
          <source media="(min-width: 1025px)" srcSet={heroSrcSet(slide, [1200, 1920, 2560, 3840])} sizes="100vw" />
          <img
            ref={index === 0 ? firstImageRef : undefined}
            src={cloudinaryPhotoUrl(slide.publicId, Math.min(1920, slide.width))}
            alt="" width={slide.width} height={slide.height}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: slide.position }}
            fetchPriority={index === 0 ? 'high' : 'low'}
            decoding="async"
            onLoad={({ currentTarget }) => {
              void currentTarget.decode().catch(() => {}).then(() => setReady((loaded) =>
                loaded.includes(index) ? loaded : [...loaded, index],
              ));
            }}
          />
        </picture>
      ))}
    </div>
  );
}
