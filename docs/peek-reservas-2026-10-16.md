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

## Vista previa publicada y verificada

Vercel confirmó `READY`: `dpl_CjNPErEPtc1388V9fLeaJGxfchiW`, URL `https://flying-ly2q028un-flyingpictures-projects.vercel.app`. Código de aplicación: `399b488a0f51c2613ac933776e519459940398c1`. Se enviaron 136 archivos de aplicación y recursos públicos, mediante el conector autenticado de Vercel. El manifiesto con hashes se conserva en `audit/peek-2026-10-16/vercel-deployment.json`. La API no devolvió metadata Git; el manifiesto local identifica el contenido enviado. El enlace de acceso temporal se entrega al usuario y no se guarda en el repositorio.

Se comprobó el catálogo con seis enlaces de Peek y Charter por WhatsApp, la ventana de Celebración desde Vercel y la de Viajero en inglés. Captura: `audit/peek-2026-10-16/vercel-celebration-popup.png`. La lista de producción mantiene `dpl_2s6tEHzZ8WEUai5kjxiYcb4mFsdz`, `main` / `21c0883d255884c02899e4377ca461ac84f6ad39`. No se cambiaron los dominios públicos ni se envió código a GitHub.

Diferencia comercial detectada: la descripción de Peek de Celebración dice «Special Services (flowers, cake, banner)»; el Excel y el sitio excluyen las lonas del paquete base. Se conserva la fuente del Excel y se comunica la diferencia al usuario para confirmación antes de producción. El botón apunta al producto correcto, pero no implica que esas condiciones contradictorias estén aprobadas.
