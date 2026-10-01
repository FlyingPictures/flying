import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getPriceDisplay } from "../lib/product-pricing.ts";
import { NEW_PACKAGE_OFFERS, NEW_PACKAGE_SLUGS } from "../lib/package-catalog.ts";

test("new package prices match the reviewed source without choosing a disputed price", async () => {
  const matrix = JSON.parse(await readFile(new URL("../docs/matriz-comercial-paquetes-2026-09-30.json", import.meta.url), "utf8"));
  assert.equal(NEW_PACKAGE_SLUGS.length, 7);
  for (const source of matrix.packages) {
    const offer = NEW_PACKAGE_OFFERS[source.id];
    assert.ok(offer, `Missing ${source.id}`);
    assert.equal(offer.mode, source.mode);
    assert.equal(offer.pricing.model, source.basePrice.unit === "per_adult" ? "perPerson" : "perPackage");
    assert.equal(offer.pricing.primary, source.basePrice.commercialStatus === "pending_confirmation" ? null : source.basePrice.value);
    assert.equal(offer.pricing.secondary, source.childPrice?.value ?? null);
    assert.equal(offer.bookingUrl, null, "Legacy checkout must not be assigned to a new offer");
    if (offer.pricing.model === "perPackage") {
      assert.equal(offer.pricing.includedPeople, null);
      assert.equal(offer.pricing.minimumPeople, source.group.minimumBookingPeople);
    }
  }
});

for (const locale of ["es", "en"]) {
  test(`${locale}: packages are billed once, not as adult or child fares`, () => {
    const display = getPriceDisplay(NEW_PACKAGE_OFFERS.vip.pricing, locale);
    assert.equal(display.rows.length, 1);
    assert.equal(display.rows[0].amount, 22500);
    assert.equal(display.unitLabel, locale === "es" ? "Precio por paquete" : "Price per package");
    assert.match(display.note, locale === "es" ? /Confirma cuántas personas/ : /Confirm how many guests/);
    assert.doesNotMatch(display.note, /4/);
  });

  test(`${locale}: a minimum does not become included passenger count`, () => {
    const display = getPriceDisplay(NEW_PACKAGE_OFFERS.celebration.pricing, locale);
    assert.match(display.note, locale === "es" ? /Mínimo 2 personas/ : /Minimum 2 guests/);
    assert.doesNotMatch(display.note, locale === "es" ? /Incluye 2/ : /Includes 2/);
  });

  test(`${locale}: disputed Traveler price is absent from all display values`, () => {
    const display = getPriceDisplay(NEW_PACKAGE_OFFERS.journey.pricing, locale);
    assert.deepEqual(display.rows, []);
    assert.equal(display.headline, locale === "es" ? "Consultar precio" : "Ask for pricing");
    assert.equal(display.summary, display.headline);
    assert.doesNotMatch(JSON.stringify(display), /7,999|8,099|7999|8099|\$0/);
  });

  test(`${locale}: a child price is separate from an additional guest price`, () => {
    const person = getPriceDisplay(NEW_PACKAGE_OFFERS.transport.pricing, locale);
    assert.equal(person.rows[1].amount, 2850);
    assert.equal(person.rows[1].label, locale === "es" ? "Niños (4–12)" : "Children (4–12)");
    const couple = getPriceDisplay({ primary: 11500, secondary: 2600, model: "privateForTwo" }, locale);
    assert.equal(couple.rows[1].label, locale === "es" ? "Persona adicional" : "Additional guest");
  });
}

test("an unknown amount is different from zero and never leaks a secondary fare", () => {
  const missing = getPriceDisplay({ primary: null, secondary: 1999, model: "perPerson" }, "es");
  assert.deepEqual(missing.rows, []);
  const zero = getPriceDisplay({ primary: 0, secondary: 0, model: "perPerson" }, "es");
  assert.deepEqual(zero.rows.map((row) => row.amount), [0, 0]);
});

test("a quote-only service and a voucher do not invent child prices", () => {
  assert.deepEqual(getPriceDisplay(null, "es").rows, []);
  const voucher = getPriceDisplay({ primary: 2600, secondary: null, model: "voucher" }, "en");
  assert.equal(voucher.rows.length, 1);
  assert.equal(voucher.unitLabel, "Individual gift card");
});
