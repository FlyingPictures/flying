import { SITE_URL } from './site-config';

// Equivalencias del inventario histórico con las páginas del catálogo aprobado.
const legacyPaths: Record<string, string> = {
  'la-experiencia': 'flight-experiences',
  'home-paquetes-teotihuacan': 'flight-experiences',
  tienda: 'flight-experiences',
  'categoria-producto/paquetes': 'flight-experiences',
  'categoria-producto/vouchers': 'product/open',
  'vuelos-compartidos': 'product/classic',
  'vuelos-privados': 'product/private',
  nosotros: 'safety-heritage',
  ayuda: 'plan-your-visit',
  'terminos-y-condiciones-generales': 'legal/terms',
  'aviso-de-privacidad-integral': 'legal/privacy',
  'producto/voucher-de-vuelo': 'product/open',
  'producto/vuelo-en-globo-tradicional-sobre-teotihuacan': 'product/classic',
  'producto/vuelo-en-globo-teotihuacan-transporte-piramides': 'product/transport',
  'producto/vuelo-en-globo-teotihuacan-degustacion-transporte-redondo': 'product/journey',
  'producto/vuelo-en-globo-privado-en-teotihuacan': 'product/private',
  'producto/vuelo-en-globo-cumpleanos-en-teotihuacan': 'product/celebration',
  'producto/vuelo-en-globo-aniversario': 'product/celebration',
};

const aliases = new Set(['www.flyingpictures.mx', 'flyingpicturesmexico.mx', 'www.flyingpicturesmexico.mx']);

const redirects = new Map<string, string>([
  ['/', '/es'],
  ['/index.html', '/es'],
  ['/index-en.html', '/en'],
  ['/en/index.html', '/en'],
  ['/terminos-y-condiciones.html', '/es/legal/terms'],
  ['/terms-and-conditions.html', '/en/legal/terms'],
]);

// Pages shipped in the temporary static landing.
const landingPackages = {
  essential: 'classic', pyramids: 'transport', traveler: 'journey', premium: 'vip',
  celebration: 'celebration', private: 'private', charter: 'charter',
};

for (const locale of ['es', 'en']) {
  for (const [legacy, current] of Object.entries(legacyPaths)) {
    redirects.set(locale === 'es' ? '/' + legacy : '/en/' + legacy, '/' + locale + '/' + current);
  }
  const prefix = locale === 'es' ? '' : '/en';
  for (const [file, slug] of Object.entries(landingPackages)) {
    redirects.set(`${prefix}/packages/${file}.html`, `/${locale}/product/${slug}`);
  }
  for (const retired of ['birthday', 'anniversary', 'proposal']) {
    redirects.set('/' + locale + '/product/' + retired, '/' + locale + '/product/celebration');
  }
}

export function siteRedirect(pathname: string, hostname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const destination = redirects.get(path) ?? path;
  if (aliases.has(hostname)) return SITE_URL + destination;
  return destination === pathname ? null : destination;
}
