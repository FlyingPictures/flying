# Activación de GA4 para Flying Pictures

## Conectar el flujo existente

1. En la propiedad GA4 del cliente, identificar el flujo web de `flyingpictures.mx`. Guardar la línea base de sesiones, canales, páginas de entrada y eventos clave antes del cambio.
2. Revisar las etiquetas existentes en GA4, Peek y, si se usa, Tag Manager. Elegir un solo emisor por evento. Revisar el consentimiento acordado con el cliente antes de activar etiquetas. En **Medición mejorada**, revisar los cambios de página por historial del navegador para registrar la navegación interna. Desactivar la medición automática de clics salientes si enviaría `link_url` con texto de WhatsApp o direcciones de correo. El evento propio de contacto ya cubre esos clics.
3. En Vercel, asignar el ID público del flujo (`G-…`) a `NEXT_PUBLIC_GA_ID` en Production y volver a compilar. La aplicación carga la etiqueta únicamente en `https://flyingpictures.mx`.
4. En Peek Pro, revisar **Configurations → Analytics** con el administrador. Conectar el flujo existente una sola vez y verificar cómo se conserva la sesión entre el sitio y el checkout. Registrar ingresos únicamente desde la confirmación de la transacción.
5. En GA4, registrar como dimensiones personalizadas de evento los parámetros que se usarán para segmentar reportes: `package_id`, `site_language`, `cta_location` y `contact_method`.

## Qué verificar

| Evento | Cuándo se registra | Datos propios |
| --- | --- | --- |
| `view_item` | Al entrar en una ficha válida, incluida la navegación interna | Producto de comercio electrónico con `item_id` y `item_name`, `package_id`, `site_language` |
| `booking_click` | Al pulsar un enlace de reserva de Peek | Paquete, idioma, ubicación del botón y `booking_provider=peek` |
| `contact_click` | Al pulsar WhatsApp, teléfono, correo o el botón habilitado de cotización corporativa | Canal, idioma, ubicación y paquete cuando corresponda. El sitio omite el destinatario, la URL de contacto y los campos del formulario. |
| `purchase` | Al confirmar una reserva en Peek, pendiente de validar en la cuenta | Comprobar ID único, valor, moneda y producto frente a la reserva de prueba. |

Abrir un recorrido con UTM reconocibles y Tag Assistant. En DebugView comprobar una sola vista por navegación, un evento por clic y conservación del origen al entrar en Peek. Verificar en ES y EN tanto el widget como la apertura del enlace directo. Con el responsable de Peek, completar una reserva de prueba por el mecanismo acordado y conciliarla con el registro de Peek, incluido el importe y el ID. Una recarga de la confirmación debe conservar una sola transacción. El clic de contacto indica intención. Ventas confirma por separado las consultas recibidas y los cierres.
