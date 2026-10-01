# M6 — Validación y vista previa

Fecha: 30 de septiembre de 2026. Checkpoint: `fpm-packages-2026-09-30-m6`. Versión local para revisión, sin publicación ni envío al remoto.

## Resultado revisable

- [Catálogo en español](http://127.0.0.1:3100/es/flight-experiences)
- [Catálogo en inglés](http://127.0.0.1:3100/en/flight-experiences)
- [Portada en español](http://127.0.0.1:3100/es)

La vista previa funciona mientras esté activo el servidor local en el puerto 3100. Para recuperarla en otra sesión: compilar el proyecto y ejecutar `npm run start -- --hostname 127.0.0.1 --port 3100`.

Siete ofertas nuevas, en ambos idiomas. Los importes consistentes del Excel se presentan por adulto o por paquete según su fuente. Viajero mantiene consulta de precio. No se presupone el número de personas cubiertas por los cinco paquetes ni se publican tarifas contradictorias de extras. Los botones consultan disponibilidad, condiciones y total con el nombre correcto; no hay compra directa habilitada.

## Comprobaciones completadas

| Comprobación | Resultado |
| --- | --- |
| Datos bilingües | 18 pares JSON y nueve páginas de producto por idioma válidos |
| Pruebas de precios y contenido | 14 pruebas correctas; precios cotejados con M1, inclusiones españolas con todas las casillas activas del Excel, sin champagne duplicado |
| Revisión de tipos | Correcta |
| Revisión global de código | Sin errores; permanece una advertencia previa por una variable no utilizada en la landing generada |
| Compilación de producción | Correcta; 40 páginas generadas |
| Rutas y metadata en servidor | 29 comprobaciones correctas: catorce fichas, seis redirecciones 308, cuatro páginas informativas, dos portadas, dos catálogos y sitemap |
| Navegador: fichas ES/EN | 28 comprobaciones a 1280 y 320 píxeles; precios/nombres correctos, sin desbordamiento horizontal ni pantallas de error |
| Navegación | Menú móvil con siete paquetes; cambio de idioma conserva la ficha; apertura de Celebración desde menú correcta |
| Portada | Tres compartidos, dos privados y dos Premium/Charter en ambos idiomas; consultas con nombre correcto |
| Catálogo | Siete tarjetas; cuatro accesos por intención correctos; imágenes de las siete tarjetas cargadas |
| Consola del navegador | Sin errores capturados durante la revisión |

Se hizo revisión visual de ejemplos de fichas y catálogos, la barra móvil y el menú. Las 28 comprobaciones de fichas incluyen observación del navegador y medición del ancho; no se presentan como 28 capturas revisadas individualmente. Se revisaron las seis fotos de Esencial —sin desayuno— y las seis de Charter —sin cuevas—. Las fotos nuevas de Celebración y Globo Privado son de vuelo y paisaje, sin montaje de lona incluido.

Durante M6 se mejoró la legibilidad: las condiciones ocupan una fila completa debajo del precio y del botón, tanto en ficha como en barra flotante. Los importes y `MXN` se mantienen juntos. El menú móvil ahora lista las siete ofertas. El resumen de itinerario conserva el vuelo entre los pasos visibles.

La revisión global inicialmente aplicaba una prohibición de imports CommonJS a un script previo de la landing. Se añadió una excepción limitada a `emergency-landing/review/*.cjs`, coherente con su formato. No se alteró ni ejecutó ese script, ni se modificó el contenido de la landing.

## Evidencias guardadas

- `audit/package-migration-2026-09-30/preview-route-results.json`
- `audit/package-migration-2026-09-30/browser-review-results.json`
- `audit/package-migration-2026-09-30/m6-catalog-desktop.jpg`
- `audit/package-migration-2026-09-30/m6-celebration-mobile-320.jpg`
- `audit/package-migration-2026-09-30/m6-charter-mobile-320.jpg`
- `audit/package-migration-2026-09-30/m6-menu-mobile.jpg`

Las comprobaciones se pueden repetir con `npm run validate:data`, `npm run test:packages`, `npx tsc --noEmit`, `npm run lint`, `npm run build` y, con la vista previa activa, `npm run verify:packages`.

## Pendiente antes de publicar

M1 y M5 conservan confirmaciones comerciales: precio de Viajero, personas cubiertas/mínimos, alcance y tarifas de extras, condiciones operativas y modalidad de reserva. M7 requiere revisar esta vista previa, confirmar el destino de publicación y registrar el despliegue anterior para rollback.

Si la landing temporal u otro sitio sigue activo, deberá reconciliarse con el mismo Excel y la oferta confirmada antes de publicar. Esta entrega no modifica el hosting, Peek ni la página pública.
