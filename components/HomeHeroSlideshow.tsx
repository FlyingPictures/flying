'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cloudinaryPhotoUrl } from '@/lib/cloudinary';
import { IMAGES } from '@/lib/images';

const SLIDES = IMAGES.home.hero.slides;
const HOLD_MS = 8000;

function heroSrcSet(slide: (typeof SLIDES)[number]) {
  const widths = [360, 540, 768, 1080, 1536, 2160, 2880, 3840].filter((width) => width <= slide.width);
  return widths.map((width) => `${cloudinaryPhotoUrl(slide.publicId, width)} ${width}w`).join(', ');
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
          <img
            ref={index === 0 ? firstImageRef : undefined}
            src={cloudinaryPhotoUrl(slide.publicId, Math.min(1920, slide.width))}
            srcSet={heroSrcSet(slide)}
            sizes="(max-width: 640px) max(100vw, 95svh), 100vw"
            alt="" width={slide.width} height={slide.height}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              '--focus-x': slide.focusX,
              '--subject-top': slide.subjectTop,
              '--height-per-width': slide.height / slide.width,
            } as CSSProperties}
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
