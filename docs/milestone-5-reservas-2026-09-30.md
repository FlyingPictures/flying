# M5 — Reservas preparadas para consulta

Fecha: 30 de septiembre de 2026. Checkpoint de revisión: `fpm-packages-2026-09-30-m5-review`. La modalidad comercial definitiva y las versiones publicadas siguen pendientes.

La versión preparada utiliza el WhatsApp comercial existente del proyecto. Los botones de portada, catálogo, ficha y barra flotante comparten la misma función, con mensaje en el idioma de la página y nombre exacto del paquete. Abrir el enlace prepara una consulta; no envía un mensaje ni confirma una reserva.

Se verificaron los enlaces de las catorce fichas, sus barras y las siete tarjetas de cada idioma: identifican el paquete correcto y preguntan por disponibilidad, condiciones y precio total. Los enlaces antiguos de Peek y la compra del voucher ya no aparecen en las superficies activas. Los textos no prometen confirmación inmediata.

No hay enlaces nuevos de compra verificados en el Excel. `BOOKING_URLS` permanece vacío y cada oferta conserva `bookingUrl: null`. Para activar compra directa deben confirmarse el producto de Peek, precios, personas cubiertas, adicionales, disponibilidad y extras. No se modificó Peek.

La tarjeta de regalo es informativa; grupos/empresas conserva cotización. Ninguna publica una tarifa heredada.

La landing de `emergency-landing/` es una versión previa respaldada en el checkpoint inicial. No se regeneró ni se subió: su fuente y condiciones requieren reconciliación si el usuario confirma que permanece activa. Antes de publicar debe definirse qué dominio/proyecto recibe el cambio y qué otras versiones deben retirarse o actualizarse para evitar ofertas divergentes.

Para cerrar M5 se necesita confirmar la modalidad de reserva y las versiones activas. La alternativa de consulta está implementada y es revisable, sin resolver por suposición los pendientes de M1.
