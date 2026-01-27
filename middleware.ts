import { NextRequest, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorar rutas estáticas y API
  const shouldIgnore = 
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|css|js)$/)

  if (shouldIgnore) {
    return NextResponse.next()
  }

  // Extraer el locale de la URL
  const pathnameLocale = pathname.split('/')[1]

  // Validar si el locale es válido
  const isValidLocale = routing.locales.includes(pathnameLocale as any)

  // Si no hay locale o es inválido, redirigir al locale por defecto
  if (!pathnameLocale || !isValidLocale) {
    const defaultLocale = routing.defaultLocale
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Matcher que excluye rutas estáticas y API
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
}