"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [scrollY, setScrollY] = useState(0);
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = Math.max(0, window.scrollY);
    const delta = Math.abs(currentScrollY - lastScrollYRef.current);
    
    if (delta > 5) {
      const direction = currentScrollY > lastScrollYRef.current ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollYRef.current = currentScrollY;
    }
    
    setScrollY(currentScrollY);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { scrollDirection, scrollY };
}