import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

const base = new URL(process.env.PACKAGE_PREVIEW_URL ?? 'http://127.0.0.1:3100');
assert.ok(['127.0.0.1', 'localhost'].includes(base.hostname), 'Verify a local preview only');
const matrix = JSON.parse(await readFile('docs/matriz-comercial-paquetes-2026-09-30.json', 'utf8'));
const results = [];
const peekFlows = { classic: 'aDOeY', transport: 'OvVBY', vip: 'XWOzq', celebration: 'qjNAb', journey: 'D06ep', private: 'RdYP4' };
const peekUrl = (slug) => `https://book.peek.com/s/3ed46494-9c75-4a7a-b02c-e78f1decab9b/${peekFlows[slug]}`;
const decode = (text) => text.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const money = (amount) => `$${new Intl.NumberFormat('en-US').format(amount)} MXN`;
const linkValues = (html) => [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => decode(match[1]));

for (const locale of ['es', 'en']) {
  for (const pkg of matrix.packages) {
    const path = `/${locale}/product/${pkg.id}`;
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    const html = decode(await response.text());
    const copy = JSON.parse(await readFile(`locales/${locale}/product/${pkg.id}.json`, 'utf8'));
    const name = locale === 'es' ? pkg.nameEs : pkg.proposedNameEn;
    assert.ok(html.includes(`<h1 class="product-title">${name}</h1>`), `${path}: correct name`);
    assert.ok(html.includes(copy.description.paragraph), `${path}: current description`);
    for (const item of copy.details.included) assert.ok(html.includes(item), `${path}: inclusion ${item}`);
    assert.ok(!/voucher-de-vuelo/.test(html), `${path}: no legacy voucher purchase`);
    const bookingLinks = linkValues(html).filter((href) => href.startsWith('https://book.peek.com/s/'));
    if (peekFlows[pkg.id]) {
      assert.ok(bookingLinks.length >= 3, `${path}: main and floating Peek buttons`);
      assert.ok(bookingLinks.every((href) => href === peekUrl(pkg.id)), `${path}: correct Peek flow`);
    } else assert.equal(bookingLinks.length, 0, `${path}: no invented Charter flow`);
    if (pkg.id === 'journey') {
      assert.ok(html.includes(money(7999)), `${path}: verified Peek package price`);
      assert.ok(!html.includes('$8,099'), `${path}: unused Excel comment absent`);
      assert.ok(!html.includes(locale === 'es' ? 'Consultar precio' : 'Ask for pricing'), `${path}: price is visible`);
    } else {
      assert.ok(html.includes(money(pkg.basePrice.value)), `${path}: Excel base price`);
    }
    if (pkg.childPrice?.value != null) {
      assert.ok(html.includes(money(pkg.childPrice.value)), `${path}: Excel child price`);
      assert.ok(html.includes(locale === 'es' ? 'Niños (4–12)' : 'Children (4–12)'), `${path}: child category`);
    } else {
      assert.ok(!html.includes(locale === 'es' ? '<strong>Niños' : '<strong>Children'), `${path}: no invented child fare`);
    }
    const inquiries = linkValues(html).filter((href) => href.startsWith('https://wa.me/') && href.includes('?text='));
    assert.ok(inquiries.length >= (peekFlows[pkg.id] ? 2 : 3), `${path}: WhatsApp contact preserved`);
    for (const href of inquiries) assert.ok(new URL(href).searchParams.get('text').includes(name), `${path}: correct inquiry package`);
    assert.ok(html.includes(`rel="canonical" href="https://www.flyingpicturesmexico.mx${path}"`), `${path}: canonical`);
    for (const lang of ['es', 'en']) assert.ok(html.includes(`hrefLang="${lang}" href="https://www.flyingpicturesmexico.mx/${lang}/product/${pkg.id}"`), `${path}: language alternate`);
    results.push({path, status: 200, prices: 'source matched', reservation: peekFlows[pkg.id] ? 'correct Peek flow' : 'WhatsApp inquiry', metadata: 'verified'});
  }
  for (const slug of ['birthday', 'anniversary', 'proposal']) {
    const path = `/${locale}/product/${slug}`;
    const response = await fetch(new URL(path, base), {redirect: 'manual'});
    assert.equal(response.status, 308, `${path}: permanent redirect`);
    assert.equal(response.headers.get('location'), `/${locale}/product/celebration`, `${path}: localized destination`);
    results.push({path, status: 308, to: response.headers.get('location')});
  }
  for (const slug of ['open', 'corporate']) {
    const path = `/${locale}/product/${slug}`;
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(!/book\.peek\.com|voucher-de-vuelo|\$2,600/.test(html), `${path}: quote only`);
    results.push({path, status: 200, purchase: 'disabled'});
  }
  for (const route of ['', '/flight-experiences']) {
    const path = `/${locale}${route}`;
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    const html = decode(await response.text());
    assert.ok(!/voucher-de-vuelo/.test(html), `${path}: no legacy voucher purchase`);
    const catalog = route ? html.slice(html.indexOf('id="flight-options"')) : html;
    const inquiryLinks = linkValues(catalog).filter((href) => href.startsWith('https://wa.me/') && href.includes('?text='));
    if (route) {
      assert.equal(inquiryLinks.length, 1, `${path}: Charter catalog inquiry`);
      const bookingLinks = linkValues(catalog).filter((href) => href.startsWith('https://book.peek.com/s/'));
      assert.equal(bookingLinks.length, 6, `${path}: six Peek booking buttons`);
      for (const pkg of matrix.packages) {
        const name = locale === 'es' ? pkg.nameEs : pkg.proposedNameEn;
        if (peekFlows[pkg.id]) assert.ok(bookingLinks.includes(peekUrl(pkg.id)), `${path}: ${name}`);
        else assert.ok(inquiryLinks.some((href) => new URL(href).searchParams.get('text').includes(name)), `${path}: ${name}`);
      }
    }
    assert.ok(html.includes(money(7999)), `${path}: Traveler price is visible`);
    assert.ok(!html.includes(locale === 'es' ? 'Consultar precio' : 'Ask for pricing'), `${path}: no missing package price`);
    results.push({path, status: 200, legacyPurchaseLinks: 0, travelerPrice: 7999});
  }
}

const sitemapResponse = await fetch(new URL('/sitemap.xml', base));
assert.equal(sitemapResponse.status, 200, 'sitemap status');
assert.equal(new URL(sitemapResponse.url).pathname, '/sitemap.xml', 'sitemap must not be localized');
assert.ok(sitemapResponse.headers.get('content-type').includes('xml'), 'sitemap XML');
const sitemap = await sitemapResponse.text();
for (const locale of ['es', 'en']) {
  for (const pkg of matrix.packages) assert.ok(sitemap.includes(`/${locale}/product/${pkg.id}`), `sitemap: ${pkg.id}`);
  for (const slug of ['birthday', 'anniversary', 'proposal']) assert.ok(!sitemap.includes(`/product/${slug}`), `sitemap: excludes ${slug}`);
}
results.push({path: '/sitemap.xml', newPackages: 14, retiredProducts: 0});
await writeFile('audit/package-migration-2026-09-30/preview-route-results.json', JSON.stringify({date: '2026-10-16', base: base.origin, results}, null, 2) + '\n');
console.log(`Preview verified: ${results.length} route and sitemap checks; Excel prices, Peek flows, inquiries, metadata and redirects match.`);
