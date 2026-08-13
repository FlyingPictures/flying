import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const localesRoot = path.join(root, 'locales');
const locales = ['es', 'en'];
const expectedProducts = [
  'anniversary',
  'birthday',
  'classic',
  'corporate',
  'journey',
  'open',
  'proposal',
  'transport',
  'vip',
];
const detailedProducts = [
  'anniversary',
  'birthday',
  'classic',
  'journey',
  'proposal',
  'transport',
  'vip',
];
const detailArrays = ['included', 'notIncluded', 'recommendedExtras', 'notes'];

function normaliseItem(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

async function listJsonFiles(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listJsonFiles(path.join(directory, entry.name), relativePath));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(relativePath);
    }
  }

  return files.sort();
}

function collectShape(value, currentPath = '$', result = new Set()) {
  if (Array.isArray(value)) {
    result.add(`${currentPath}:array`);
    for (const item of value) collectShape(item, `${currentPath}[]`, result);
    return result;
  }

  if (value !== null && typeof value === 'object') {
    result.add(`${currentPath}:object`);
    for (const key of Object.keys(value).sort()) {
      collectShape(value[key], `${currentPath}.${key}`, result);
    }
    return result;
  }

  result.add(`${currentPath}:${typeof value}`);
  return result;
}

function difference(left, right) {
  return [...left].filter((item) => !right.has(item));
}

const errors = [];
const filesByLocale = Object.fromEntries(
  await Promise.all(locales.map(async (locale) => [
    locale,
    await listJsonFiles(path.join(localesRoot, locale)),
  ])),
);

const referenceFiles = filesByLocale[locales[0]];
for (const locale of locales.slice(1)) {
  const missing = referenceFiles.filter((file) => !filesByLocale[locale].includes(file));
  const extra = filesByLocale[locale].filter((file) => !referenceFiles.includes(file));
  if (missing.length) errors.push(`${locale}: faltan archivos: ${missing.join(', ')}`);
  if (extra.length) errors.push(`${locale}: sobran archivos: ${extra.join(', ')}`);
}

for (const relativePath of referenceFiles) {
  const documents = {};

  for (const locale of locales) {
    try {
      documents[locale] = JSON.parse(
        await readFile(path.join(localesRoot, locale, relativePath), 'utf8'),
      );
    } catch (error) {
      errors.push(`${locale}/${relativePath}: JSON inválido (${error.message})`);
    }
  }

  if (Object.keys(documents).length !== locales.length) continue;

  const referenceShape = collectShape(documents[locales[0]]);
  for (const locale of locales.slice(1)) {
    const localeShape = collectShape(documents[locale]);
    const missing = difference(referenceShape, localeShape);
    const extra = difference(localeShape, referenceShape);
    if (missing.length) errors.push(`${locale}/${relativePath}: faltan claves/tipos: ${missing.join(', ')}`);
    if (extra.length) errors.push(`${locale}/${relativePath}: sobran claves/tipos: ${extra.join(', ')}`);
  }
}

for (const locale of locales) {
  const productFiles = filesByLocale[locale]
    .filter((file) => file.startsWith(`product${path.sep}`))
    .map((file) => path.basename(file, '.json'))
    .sort();

  if (productFiles.join(',') !== expectedProducts.join(',')) {
    errors.push(`${locale}: catálogo de productos inesperado (${productFiles.join(', ')})`);
  }

  const common = JSON.parse(await readFile(path.join(localesRoot, locale, 'common.json'), 'utf8'));
  if (!common.concierge?.hours?.includes('6:00') || !common.concierge.hours.includes('8:00')) {
    errors.push(`${locale}/common.json: el horario debe indicar 6:00–8:00`);
  }
}

for (const slug of detailedProducts) {
  const documents = {};

  for (const locale of locales) {
    const relativePath = path.join('product', `${slug}.json`);
    const document = JSON.parse(
      await readFile(path.join(localesRoot, locale, relativePath), 'utf8'),
    );
    documents[locale] = document;
    const details = document.details;

    if (!details || typeof details !== 'object') {
      errors.push(`${locale}/${relativePath}: falta details`);
      continue;
    }

    for (const field of detailArrays) {
      if (!Array.isArray(details[field]) || details[field].length === 0) {
        errors.push(`${locale}/${relativePath}: details.${field} debe tener contenido`);
      } else if (details[field].some((item) => typeof item !== 'string' || !item.trim())) {
        errors.push(`${locale}/${relativePath}: details.${field} contiene valores vacíos`);
      }
    }

    if (!Array.isArray(details.itinerary?.steps) || details.itinerary.steps.length < 5) {
      errors.push(`${locale}/${relativePath}: el itinerario detallado debe tener al menos 5 pasos`);
    } else {
      details.itinerary.steps.forEach((step, index) => {
        if (!step.time?.trim() || !step.title?.trim() || !step.description?.trim()) {
          errors.push(`${locale}/${relativePath}: paso ${index + 1} incompleto`);
        }
      });
    }

    if (!document.hero?.subtitle?.includes('40')) {
      errors.push(`${locale}/${relativePath}: el resumen debe comunicar la duración aproximada de 40 minutos`);
    }

    const included = new Set((details.included ?? []).map(normaliseItem));
    const excluded = new Set((details.notIncluded ?? []).map(normaliseItem));
    const overlaps = [...included].filter((item) => excluded.has(item));
    if (overlaps.length) {
      errors.push(`${locale}/${relativePath}: elementos repetidos en incluye/no incluye (${overlaps.join(', ')})`);
    }
  }

  if (documents.es?.details && documents.en?.details) {
    for (const field of detailArrays) {
      if (documents.es.details[field].length !== documents.en.details[field].length) {
        errors.push(`${slug}: details.${field} no tiene paridad ES/EN`);
      }
    }
    if (documents.es.details.itinerary.steps.length !== documents.en.details.itinerary.steps.length) {
      errors.push(`${slug}: el itinerario no tiene paridad ES/EN`);
    }
  }
}

if (errors.length) {
  console.error(`Validación fallida con ${errors.length} problema(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Datos válidos: ${referenceFiles.length} archivos bilingües y ${expectedProducts.length} productos por idioma.`);
}
