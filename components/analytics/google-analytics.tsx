'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { getProductName, isProductSlug } from '@/lib/commercial-config';
import { SITE_URL } from '@/lib/site-config';

const measurementId = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function initializeAnalytics() {
  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId) || window.location.origin !== SITE_URL) return false;
  if (document.getElementById('ga4-library')) return true;
  window.dataLayer ??= [];
  // gtag.js consumes queued commands as Arguments objects.
  window.gtag ??= function () { window.dataLayer!.push(arguments); }; // eslint-disable-line prefer-rest-params
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const script = document.createElement('script');
  script.id = 'ga4-library';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  return true;
}

function packageOnPage(pathname: string) {
  const match = /^\/(?:en|es)\/product\/([^/]+)$/.exec(pathname);
  return match && isProductSlug(match[1]) ? match[1] : undefined;
}

function trackClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest<HTMLAnchorElement>('a[href]');
  const corporateInquiry = event.target.closest('button[data-corporate-inquiry]:enabled');
  if (!link && !corporateInquiry) return;

  const language = location.pathname.split('/')[1];
  const id = link?.dataset.packageId ?? packageOnPage(location.pathname);
  const context = {
    site_language: language,
    cta_location: event.target.closest<HTMLElement>('[data-cta-location]')?.dataset.ctaLocation ?? 'page',
    ...(id && isProductSlug(id) ? { package_id: id } : {}),
  };

  if (link?.hostname === 'book.peek.com' && link.dataset.packageId) {
    window.gtag?.('event', 'booking_click', { ...context, booking_provider: 'peek' });
    return;
  }

  let method;
  if (corporateInquiry || link?.hostname === 'wa.me') method = 'whatsapp';
  else if (link?.protocol === 'tel:') method = 'phone';
  else if (link?.protocol === 'mailto:') method = 'email';
  if (method) window.gtag?.('event', 'contact_click', {
    ...context, contact_method: method, ...(corporateInquiry && { package_id: 'corporate' }),
  });
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const initialized = useRef(false);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!initialized.current) initialized.current = initializeAnalytics();
    if (!initialized.current) return;
    // Bubble phase excludes cancelled carousel drags and still sees Peek widget clicks.
    document.addEventListener('click', trackClick);
    return () => document.removeEventListener('click', trackClick);
  }, []);

  useEffect(() => {
    if (!initialized.current || !pathname || lastPath.current === pathname) return;
    lastPath.current = pathname;
    const slug = packageOnPage(pathname);
    if (!slug) return;
    const language = pathname.split('/')[1];
    window.gtag?.('event', 'view_item', {
      site_language: language, package_id: slug,
      items: [{ item_id: slug, item_name: getProductName(slug, language) }],
    });
  }, [pathname]);

  return null;
}
