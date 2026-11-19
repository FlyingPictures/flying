import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { resolveWhatsAppContext } from '../lib/whatsapp-context.ts';

test('package cards and the corporate form override the surrounding page', () => {
  assert.deepEqual(resolveWhatsAppContext('/flight-experiences', 'charter'), { key: 'charter', packageId: 'charter' });
  assert.deepEqual(resolveWhatsAppContext('/', 'private'), { key: 'private', packageId: 'private' });
  assert.deepEqual(resolveWhatsAppContext('/contact', 'corporate'), { key: 'corporate', packageId: 'corporate' });
});

test('package context follows route and language changes, including trailing slashes', () => {
  assert.deepEqual(resolveWhatsAppContext('/en/product/transport/'), { key: 'transport', packageId: 'transport' });
  assert.deepEqual(resolveWhatsAppContext('/es/product/celebration'), { key: 'celebration', packageId: 'celebration' });
  assert.deepEqual(resolveWhatsAppContext('/product/open'), { key: 'open', packageId: 'open' });
  assert.deepEqual(resolveWhatsAppContext('/en'), { key: 'home' });
});

test('unknown pages and invalid package slugs have a safe general fallback', () => {
  for (const path of ['/not-found', '/product/missing', '/product/constructor', '/product/__proto__']) {
    assert.deepEqual(resolveWhatsAppContext(path), { key: 'general' });
  }
});

test('every page and package context has distinct agent previews in both languages', async () => {
  const pages = ['/', '/flight-experiences', '/safety-heritage', '/plan-your-visit', '/contact', '/legal/terms', '/legal/privacy', '/legal/cancellation', '/not-found'];
  const products = ['classic', 'transport', 'journey', 'vip', 'celebration', 'private', 'charter', 'open', 'corporate'];
  for (const locale of ['es', 'en']) {
    const { contact: { whatsapp } } = JSON.parse(await readFile(new URL(`../locales/${locale}/contact.json`, import.meta.url), 'utf8'));
    for (const path of [...pages, ...products.map(slug => `/product/${slug}`)]) {
      const context = resolveWhatsAppContext(path);
      for (const name of ['Tere', 'Vero']) {
        assert.equal(typeof whatsapp.previews[context.key]?.[name], 'string', `${locale}/${path}/${name}`);
        assert.ok(whatsapp.previews[context.key][name].length > 10);
      }
      assert.notEqual(whatsapp.previews[context.key].Tere, whatsapp.previews[context.key].Vero);
      if (!context.packageId) assert.equal(typeof whatsapp.messages[context.key], 'string', `${locale}/${path}: initial message`);
    }
  }
});
