"use client";

import { useState, useEffect, useCallback } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);

  const updateScrollDirection = useCallback(() => {
    const currentScrollY = window.pageYOffset;
    const lastScrollY = scrollY;
    const threshold = 5;
    const delta = Math.abs(currentScrollY - lastScrollY);
    
    if (delta > threshold) {
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }
    }
    
    setScrollY(currentScrollY);
  }, [scrollY, scrollDirection]);

  useEffect(() => {
    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [updateScrollDirection]);

  return { scrollDirection, scrollY };
}