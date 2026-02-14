"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [scrollY, setScrollY] = useState(0);
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.pageYOffset;
    const delta = Math.abs(currentScrollY - lastScrollYRef.current);
    
    if (delta > 5) {
      const direction = currentScrollY > lastScrollYRef.current ? 'down' : 'up';
      setScrollDirection(direction);
    }
    
    setScrollY(currentScrollY);
    lastScrollYRef.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { scrollDirection, scrollY };
}