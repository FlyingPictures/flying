import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const matrix = JSON.parse(await readFile(new URL('../docs/matriz-comercial-paquetes-2026-09-30.json', import.meta.url), 'utf8'));
const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const sourceWording = {
  'Desayuno Bufette Ligero (Previo al Despegue)': 'Desayuno buffet ligero previo al despegue',
  'Brunch (Mayahuel)': 'Brunch en Mayahuel',
  'Brunch (Club Campestre)': 'Brunch en Club Campestre',
};
const documents = {};
for (const locale of ['es', 'en']) {
  documents[locale] = {};
  for (const pkg of matrix.packages) {
    documents[locale][pkg.id] = JSON.parse(await readFile(new URL(`../locales/${locale}/product/${pkg.id}.json`, import.meta.url), 'utf8'));
  }
}

test('Spanish base inclusions match every checked Excel service without duplicating champagne', () => {
  for (const pkg of matrix.packages) {
    const source = pkg.included.filter((item) => item.nameEs !== 'Champagne').map((item) => sourceWording[item.nameEs] ?? item.nameEs);
    source.push(pkg.mode === 'private' ? 'Vuelo privado' : 'Vuelo compartido');
    assert.deepEqual(new Set(documents.es[pkg.id].details.included.map(normalize)), new Set(source.map(normalize)), pkg.id);
    assert.equal(documents.es[pkg.id].details.included.length, source.length, `${pkg.id}: no duplicates`);
  }
});

test('New content never promises a fixed flight duration or unconfirmed extra fare', () => {
  for (const locale of ['es', 'en']) {
    for (const pkg of matrix.packages) {
      const copy = documents[locale][pkg.id];
      assert.ok(!/40\s*(min|minutes)|45\s*[-–a]\s*60/.test(JSON.stringify(copy)), `${locale}/${pkg.id}: duration`);
      assert.ok(copy.details.recommendedExtras.every((item) => !/\$|\d[\d,]*\s*MXN/.test(item)), `${locale}/${pkg.id}: extra prices`);
      assert.equal(copy.details.included.length, documents.es[pkg.id].details.included.length, `${locale}/${pkg.id}: service parity`);
    }
  }
});

test('Key commercial changes remain explicit in the package details', () => {
  assert.ok(documents.es.classic.details.notIncluded.includes('Desayuno'));
  assert.ok(documents.es.transport.details.included.includes('Transporte redondo compartido'));
  assert.ok(documents.es.transport.details.notIncluded.includes('Guía bilingüe'));
  assert.ok(documents.es.journey.details.included.includes('Guía bilingüe'));
  assert.ok(documents.es.celebration.details.notIncluded.includes('Lonas de personalización'));
  assert.ok(documents.es.celebration.details.notIncluded.includes('Fotografías y video'));
  assert.ok(documents.es.private.details.included.includes('Brindis tradicional con champagne'));
  assert.ok(documents.es.charter.details.notIncluded.includes('Tour en cuevas ceremoniales'));
  assert.ok(!documents.es.charter.details.included.some((item) => /cuevas/i.test(item)));
});
