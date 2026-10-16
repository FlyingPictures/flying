# Integración de Peek — 16 de octubre de 2026

El usuario solicitó integrar los botones de los paquetes nuevos desde el PDF y después crear la vista previa en Vercel. El documento se trató como fuente de códigos y destinos; no se ejecutaron instrucciones ajenas a ese alcance.

Fuente: `Scripts HTML - Paquetes Peek FP 2026.pdf` (6 páginas). SHA-256: `3f5ea29090ce2c495a7463cfc1a6faeaf84cdaa375a21b120a7a82daf4e09a65`.

| Oferta del sitio | Producto comprobado en Peek | Flujo |
| --- | --- | --- |
| Vuelo Esencial | Essential Flight (Shared Flight) | aDOeY |
| +Transporte + Pirámides | Transport + Pyramids – Shared Flight | OvVBY |
| Premium - VIP | Premium – VIP Private Charter (4 Pax) | XWOzq |
| Celebración | Celebration – Private Flight (2 Pax) | qjNAb |
| Viajero | Traveler Experience – Shared Flight (2 Pax) | D06ep |
| Experiencia en Globo Privada | Private Essential Flight – 2 Pax | RdYP4 |

Todos usan la clave pública de widget `3ed46494-9c75-4a7a-b02c-e78f1decab9b`. FPM Private Charter no tiene código en el PDF: conserva la consulta de WhatsApp. Tarjeta de regalo y empresas conservan sus destinos de consulta.

Se centralizaron los enlaces y las etiquetas Reservar/Book now para portada, catálogo, ficha y barra flotante. El script y los estilos oficiales de Peek se cargan una sola vez después de la hidratación; el propio script detecta los botones nuevos al navegar sin recarga. Si no carga, el enlace normal permite abrir la reserva directamente. El icono de WhatsApp conserva una consulta identificada por paquete e idioma.

Validación: datos bilingües, 15 pruebas, tipos, lint (sin errores; advertencia previa en landing antigua), compilación y 29 comprobaciones HTTP. En navegador se abrieron las seis ventanas con el producto correspondiente. Se comprobó navegación interna, etiquetas en inglés, un solo script/estilo y ventana móvil de 320 px sin desbordamiento del documento. Evidencia en `audit/peek-2026-10-16/`. No se completó ninguna reserva, pago ni envío de datos personales. La comprobación del calendario no certifica la configuración de tarifas, extras o disponibilidad de todas las fechas en Peek.

Los importes comerciales pendientes del Excel conservan su estado; esta integración no modifica Peek ni la landing estática previa. El punto anterior a Peek es `fpm-packages-2026-09-30-m6` / `e1e3e6947b5cea16ce62f58efa15d7f4c1481b4e`. El checkpoint de esta entrega será `fpm-packages-2026-10-16-peek`.

La vista previa se cargará directamente al proyecto `flying` del equipo `flyingpictures-projects`, conservando la versión de producción `dpl_2s6tEHzZ8WEUai5kjxiYcb4mFsdz`. Solo se enviarán archivos de aplicación y recursos públicos; documentos, Excel, PDF, auditorías, credenciales y landing antigua quedan fuera del despliegue.
