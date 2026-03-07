import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|site.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff2?|map)).*)',
  ],
};