import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';
import { siteRedirect } from '@/lib/site-redirects';
import { SITE_URL } from '@/lib/site-config';

const localize = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;
  if (searchParams.has('elementor_library') || searchParams.has('add-to-cart')) {
    return new NextResponse(null, { status: 410 });
  }

  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();
  const destination = siteRedirect(pathname, host);
  if (destination) {
    const origin = host === new URL(SITE_URL).hostname ? SITE_URL : request.nextUrl.origin;
    const target = new URL(destination, origin);
    target.search = search;
    return NextResponse.redirect(target, 308);
  }

  if (pathname.includes('.') || pathname.startsWith('/_next/') || (pathname === '/api' || pathname.startsWith('/api/'))) {
    return NextResponse.next();
  }
  return localize(request);
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] };
