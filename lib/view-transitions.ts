// lib/view-transitions.ts
"use client";

export function enableViewTransitions() {
  if (typeof document === 'undefined') return;
  
  // Next.js 15+ View Transitions
  const links = document.querySelectorAll('a[href^="/"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if ('startViewTransition' in document) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).href;
        
        (document as any).startViewTransition(() => {
          window.location.href = href;
        });
      }
    });
  });
}