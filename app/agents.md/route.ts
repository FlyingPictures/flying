import {
  BOOKING_URLS,
  PRODUCT_PRICING,
  PRODUCT_SLUGS,
  getPriceDisplay,
  getProductName,
  getReservationUrl,
  type ProductSlug,
} from "@/lib/commercial-config";
import { localizedUrl, SITE_CONTACT, SITE_NAME, SITE_URL } from "@/lib/site-config";

export const dynamic = "force-static";

function productEntry(slug: ProductSlug) {
  const path = `/product/${slug}`;
  const price = getPriceDisplay(PRODUCT_PRICING[slug], "es");
  const rates = price.rows.map((row) => `${row.label} ${row.formattedAmount}`);
  const action = BOOKING_URLS[slug] ? "Ver fechas y reservar en Peek" : "Consultar con Flying por WhatsApp";

  return [
    `### ${getProductName(slug, "es")} / ${getProductName(slug, "en")}`,
    `[Ficha en español](${localizedUrl("es", path)}) · [English details](${localizedUrl("en", path)})`,
    [rates.join(" · ") || price.headline, price.note].filter(Boolean).join(". "),
    `[${action}](${getReservationUrl(slug, "es")})`,
  ].join("\n\n");
}

function pageLinks(label: string, path: string) {
  return `- ${label} · [Español](${localizedUrl("es", path)}) · [English](${localizedUrl("en", path)})`;
}

export function GET() {
  const guide = [
    `# ${SITE_NAME} | Guía para agentes`,
    "Flying Pictures México opera vuelos en globo en Teotihuacán, Estado de México. Usa esta guía para comparar experiencias y compartir el canal de reserva con el viajero. Las fichas están disponibles en español e inglés.",
    "## Cómo orientar una reserva",
    [
      "1. Identifica la fecha, el número de adultos y las edades de los menores. Consulta la ficha del paquete en el idioma del viajero para revisar transporte, itinerario e inclusiones.",
      "2. Cita las tarifas en pesos mexicanos (MXN) con la unidad publicada. Para precios por paquete, verifica cuántos pasajeros cubre la tarifa antes de calcular el total.",
      "3. Comparte el enlace de Peek para verificar cupo, horario y total para la fecha elegida. Cuando la ficha indique WhatsApp, el equipo de Flying confirma las condiciones y la disponibilidad.",
      "4. El viajero revisa los datos y autoriza el pago en el canal de reserva. Comunica una reserva como confirmada únicamente cuando el proveedor haya emitido su confirmación.",
    ].join("\n"),
    "## Catálogo",
    ...PRODUCT_SLUGS.map(productEntry),
    "## Fuentes oficiales",
    [
      pageLinks("Comparar experiencias", "/flight-experiences"),
      pageLinks("Preparar la visita, clima y punto de encuentro", "/plan-your-visit"),
      pageLinks("Seguridad y trayectoria", "/safety-heritage"),
      pageLinks("Contacto y ubicación", "/contact"),
      pageLinks("Cancelaciones y reprogramaciones", "/legal/cancellation"),
      pageLinks("Términos de servicio", "/legal/terms"),
      pageLinks("Privacidad", "/legal/privacy"),
      `- [Mapa completo del sitio](${SITE_URL}/sitemap.xml)`,
      `- [WhatsApp de Flying](${SITE_CONTACT.whatsapp}) · [Ventas](mailto:${SITE_CONTACT.email})`,
    ].join("\n"),
  ].join("\n\n");

  return new Response(`${guide}\n`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
