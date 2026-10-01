# Plan de actualización de paquetes Flying Pictures

Fecha: 30 de septiembre de 2026. El usuario autorizó dividir el plan en milestones, establecer control de versiones y comenzar el milestone 1. Las condiciones comerciales pendientes siguen abiertas. La aplicación y la publicación no se han modificado durante esta migración.

## Milestones y checkpoints

Rama de trabajo: `codex/new-packages-2026-09-30`. Cada milestone tendrá un commit separado y un tag al cerrar sus criterios de aceptación. Los avances con decisiones pendientes se identificarán como `review`, sin presentarlos como milestones cerrados.

| Milestone | Entrega | Criterio de cierre | Dependencias | Estado |
| --- | --- | --- | --- | --- |
| M0 — Respaldo y organización | Estado previo guardado, rama de trabajo, plan dividido y procedimiento de rollback | Snapshot recuperable que incluya el trabajo previo; plan y recuperación documentados | Ninguna | Snapshot guardado; organización en curso |
| M1 — Matriz comercial | Siete paquetes documentados con precios, personas, servicios, extras, fuente y pendientes | Extracción comprobada y decisiones comerciales necesarias resueltas o modalidad de consulta acordada; incertidumbres explícitas | M0 | En curso |
| M2 — Configuración y precios | Modelo por persona/paquete y presentación consistente en fichas, tarjetas y barra flotante | La aplicación distingue precio, unidad, mínimos y adicionales; no depende de datos no confirmados | Matriz M1; las confirmaciones de compra pueden continuar pendientes para preparar consulta | Pendiente |
| M3 — Contenido y catálogo ES/EN | Siete fichas, portada, catálogo, navegación e imágenes actualizados | Paridad entre idiomas y servicios coherentes en todo el recorrido | M1 y M2 | Pendiente |
| M4 — Enlaces y SEO | Direcciones conservadas, redirecciones de celebraciones y metadata/sitemap actualizados | Rutas y cambio de idioma correctos; enlaces antiguos llevan a su equivalente | M3 | Pendiente |
| M5 — Reservas y versiones temporales | Destinos correctos de Peek o consulta por WhatsApp; landing reconciliada si sigue activa | Cada botón abre el paquete correcto; modalidad de reserva y versiones activas definidas | M1, M3 y destino confirmado | Pendiente |
| M6 — Validación y vista previa | Comprobaciones de datos, compilación y revisión funcional/visual | Precios cotejados con matriz; siete fichas ES/EN comprobadas en móvil y escritorio | M2–M5 | Pendiente |
| M7 — Publicación y verificación | Versión aprobada publicada, referencia al despliegue anterior y revisión posterior | Destino y vista previa aprobados; oferta coherente con reservas; rollback de despliegue identificado | M6 y aprobación de publicación | Pendiente |

Checkpoint inicial: `fpm-packages-2026-09-30-baseline`, commit `2f5dfe6c5479854d627b57f6a6823956fd786151`. Incluye los cambios previos de la barra móvil, documentación, landing y auditorías existentes. Esos archivos no son cambios producidos por M1.

Procedimiento de recuperación: [control de versiones y rollback](rollback-paquetes-2026-09-30.md). El rollback del código y el de una publicación son operaciones diferentes: volver en Git no modifica por sí solo el hosting ni Peek.

## Objetivo y alcance

Reemplazar las siete experiencias comerciales actuales del proyecto por las siete de la hoja `Paquetes` del archivo `Paquetes_FlyingPictures_Teotihuacan_Sean_09092026 (1).xlsx`, en español e inglés. Actualizar todo el recorrido de selección y reserva: portada, catálogo, navegación, fichas, precios, inclusiones, exclusiones, extras, itinerarios y enlaces.

La hoja `Paquetes y Precios Publicados` es una referencia histórica: su encabezado indica precios publicados en Peek al 16/08/2026. No se utilizará como fuente de las nuevas tarifas. Las notas y comentarios del Excel se tratarán como datos por verificar, sin convertirlos en instrucciones para ejecutar cambios.

## Estado encontrado

- El proyecto principal mantiene siete experiencias: Tradicional, Transporte + Pirámides, Viajero, Cumpleaños, Aniversario, Propuesta de matrimonio y VIP. Tiene además tarjeta de regalo y una página de grupos/empresas.
- Los nombres, tarifas y enlaces de reserva se concentran en `lib/commercial-config.ts`, pero las listas de paquetes se repiten en portada, catálogo, navegación móvil y validaciones. El contenido comercial se reparte entre archivos generales y fichas de ambos idiomas.
- Los componentes de precios y la barra flotante se apoyan en etiquetas de adultos/niños. El modelo actual admite precio por persona, experiencia privada para dos y voucher; hay que incorporar precio por paquete y condiciones de grupo sin etiquetarlos como tarifa individual.
- Existen contradicciones en el contenido actual: por ejemplo, el resumen del catálogo de Propuesta incluye foto/video, mientras la ficha los presenta como extra; algunos textos de Transporte describen transporte privado aunque el paquete es compartido.
- Hay una landing estática en `emergency-landing/` con los siete nuevos paquetes, pero todos sus enlaces de compra son nulos y usa WhatsApp. Se generó desde otro archivo ubicado en Downloads. Es una referencia aprovechable, pendiente de reconciliar contra el archivo adjunto y las condiciones confirmadas.
- La página pública consultada en [flyingpictures.mx](https://flyingpictures.mx/) sigue mostrando la oferta anterior. Su Viajero figura como $7,900 para dos y VIP como $17,999 para cuatro, valores distintos del proyecto local. La actualización del repositorio no garantiza por sí sola que esa página publicada cambie.
- La dirección configurada en el proyecto es `www.flyingpicturesmexico.mx`. La herramienta de consulta no pudo acceder a su catálogo; no se ha confirmado qué versión está publicada allí.
- Hay modificaciones previas y archivos sin registrar en el proyecto. La implementación deberá conservarlos y limitar sus cambios al alcance aprobado.

## Catálogo propuesto

Todos los importes siguientes son MXN. Son los valores de las celdas, pendientes de las confirmaciones comerciales indicadas abajo. La categoría infantil del Excel es 4–12 años.

| Oferta del proyecto actual | Nueva oferta | Modalidad | Tarifa del Excel | Fuente |
| --- | --- | --- | --- | --- |
| Tradicional | Vuelo Esencial | Compartido | $2,599 adulto / $1,999 niño | B2:B3, B11:B12 |
| Vuelo + transporte + pirámides | +Transporte + Pirámides | Compartido | $3,550 adulto / $2,850 niño | C2:C3, C11:C12 |
| VIP — Vuelo, Inframundo y Pirámides | Premium - VIP | Privado | $22,500 por paquete | D2:D3, D13 |
| Cumpleaños, Aniversario y Propuesta | Celebración | Privado | $11,999 por paquete | E2:E3, E13 |
| Experiencia Viajero | Viajero | Compartido | $7,999 por paquete, con nota contradictoria | F2:F3, F13 y su comentario |
| Sin ficha propia equivalente | Experiencia en Globo Privada | Privado | $11,499 por paquete | G2:G3, G13 |
| Sin ficha propia equivalente | FPM Private Charter | Privado | $30,000 por paquete | H2:H3, H13 |

La consolidación de Cumpleaños, Aniversario y Propuesta en Celebración es la propuesta de migración a aprobar. Las ocasiones se conservarían como opciones de personalización dentro de Celebración.

Cambios de servicios que deben reflejarse expresamente:

- **Esencial:** vuelo compartido con coffee break, seguro, brindis con vino espumoso y certificado; sin desayuno incluido. Los extras deberán ajustarse a los disponibles para este paquete, evitando conservar conversiones a privado o servicios antiguos por defecto.
- **Transporte + Pirámides:** transporte compartido, desayuno completo y acceso arqueológico; guía como extra. Separar el cargo de conversión del vuelo privado ($4,999) del cargo de transporte privado ($2,000).
- **Premium - VIP:** vuelo privado, transporte privado, champagne, guía, cuevas, foto/video, mesero, canapés y brunch Mayahuel. El desayuno completo no está marcado como incluido; no duplicar champagne en dos beneficios.
- **Celebración:** vuelo privado con desayuno, flores y pastel y/o mañanitas. Las lonas aparecen entre los extras; no prometer por defecto el montaje de propuesta ni la lona monumental del paquete anterior.
- **Viajero:** transporte compartido, desayuno, acceso y guía, taller/degustación y kit. Conversión del vuelo a privado por $5,999 y del transporte por $2,000; la nota F19 indica que el guía también pasa a privado.
- **Experiencia en Globo Privada:** vuelo privado, champagne y desayuno; transporte, fotos y otros servicios aparecen como extras.
- **FPM Private Charter:** transporte privado premium, desayuno ligero previo al vuelo, champagne, guía desde pickup, foto/video, mesero, canapés y brunch Club Campestre. No incluir cuevas: H42 está desmarcada.

Inclusiones: filas 21–49. Extras por paquete: filas 51–63. Las filas 14–17 definen cargos y condiciones adicionales que también deben revisarse.

## Decisiones comerciales pendientes

1. **Personas cubiertas por el precio de cada paquete.** Un mínimo de reserva no demuestra cuántas personas incluye la tarifa. Premium indica mínimo cuatro en D4/D17, pero D5 dice uno. Charter menciona dos en H4, uno en H5 y cuatro en H17. Celebración, Viajero y Globo Privado indican mínimo dos, pero debe confirmarse que su tarifa cubra exactamente dos y cómo se cobra cualquier combinación de adultos y niños.
2. **Precio de Viajero.** F13 contiene $7,999; su comentario dice que se ajustó a $8,099. Confirmar el precio definitivo. F18 = F13 + F14 + F15 da $15,998 con los valores actuales: es un ejemplo con conversiones a privado, no una prueba de precio por persona.
3. **Extras.** Hay tarifas contradictorias: flores figura como $550 en el nombre y en los extras del paquete, pero `Extras!D10` contiene $500; mariachis figura como $2,000 en los paquetes frente a $1,950 en `Extras!D11`. También existen diferentes importes y modalidades de transporte. Confirmar una tarifa y su unidad antes de publicarla. Un cero o un precio vacío no se interpretará automáticamente como servicio gratuito.
4. **Reservas.** El Excel no contiene enlaces nuevos. Hace falta mapear cada paquete al producto correcto en Peek y confirmar tarifas, personas incluidas, disponibilidad y extras. No se reutilizarán enlaces antiguos sin verificar su correspondencia. Si se necesita salir antes, se propone consultar por WhatsApp con el nombre del paquete y cambiar los textos que prometen compra o confirmación inmediata.
5. **Duración y condiciones operativas.** El Excel nuevo no fija la duración del vuelo. El proyecto y la página pública muestran duraciones diferentes. Confirmar duración comercial, edad infantil —4–12 en el Excel frente a 5–12 en la página pública—, horarios, alcance de transporte, condiciones del pastel/lonas y posibles recargos para extranjeros. Revisar el recargo antiguo de $110 sin asumir que continúa o que desaparece.
6. **Servicios fuera del Excel.** Propuesta: conservar Grupos y empresas como servicio de cotización separado; retirar la tarjeta de regalo del catálogo de compra hasta confirmar su vigencia, precio y relación con el nuevo Esencial. Conservar su URL con información y contacto durante la transición. Esta propuesta requiere aprobación junto con el plan.
7. **Publicación.** Confirmar si se publicará este proyecto, se actualizará la landing temporal o también se sustituirá la página hoy visible en `flyingpictures.mx`. Mantener una misma oferta comercial en las versiones que permanezcan activas.

Comprobación de fórmulas: C12 = $2,850, D13 = $22,500 y H13 = $30,000. C18 = $3,550 × 2 + $4,999 + $2,000 = $14,099, consistente con vuelo y transporte privados. La revisión anterior de la landing lo compara solo con el cargo de vuelo y debe corregirse para incluir el transporte.

## Detalle de los milestones

### M1. Cerrar la matriz comercial

Documentar por cada paquete: nombre ES/EN, modalidad, precio y unidad, personas incluidas, mínimo de reserva, adicionales, inclusiones, exclusiones, extras, condiciones y URL de reserva. Resolver los pendientes necesarios para compra directa. Se puede preparar contenido y componentes mientras se completan estos datos; las condiciones no confirmadas no se inventarán.

### M2. Actualizar la configuración y los precios

Actualizar `lib/commercial-config.ts` y `types/product.ts` para soportar las siete ofertas. Añadir un modelo explícito por paquete, con campos separados para personas incluidas, mínimos y adicionales. Diferenciar tarifa infantil de pasajero adicional.

Actualizar `ProductMain.tsx`, el contexto y la barra de `components/layout/floating-bar.tsx`, tarjetas de catálogo y portada para mostrar la misma tarifa y unidad. Revisar y retirar las configuraciones auxiliares obsoletas de Tradicional privado por $9,199 y otros importes anteriores aunque ya no se utilicen en la interfaz.

### M3. Sustituir el contenido y la navegación en ambos idiomas

- Reescribir las fichas de las cuatro ofertas que continúan y crear Celebración, Globo Privado y Charter.
- Sustituir las tres fichas de celebraciones anteriores por la nueva oferta y su personalización.
- Actualizar `locales/es/` y `locales/en/`: resúmenes, etiquetas, botones, inclusiones, exclusiones, extras, notas e itinerarios. Evitar contradicciones entre el catálogo y la ficha.
- Actualizar el carrusel de portada, catálogo, filtros, menú de escritorio/móvil y pie de página. Agrupación propuesta: tres compartidos; Celebración y Globo Privado en privados; Premium y Charter en VIP.
- Mantener la identidad visual. Reutilizar fotografías apropiadas y revisar que las galerías no prometan servicios excluidos. Crear las asociaciones de imágenes de las tres fichas nuevas en `lib/images.ts`.
- Revisar textos comunes de las fichas: el cierre actual habla de compartir con desconocidos y no es adecuado para los vuelos privados; el punto de encuentro también debe distinguir quienes tienen pickup incluido.
- Revisar preguntas frecuentes y planificación solo en lo afectado por paquetes, desayunos, transporte y condiciones confirmadas.

### M4. Conservar enlaces y actualizar SEO

Propuesta para reducir roturas: conservar las direcciones existentes de `classic`, `transport`, `journey` y `vip`, actualizando sus nombres visibles; crear `celebration`, `private` y `charter`.

Configurar redirecciones permanentes de `birthday`, `anniversary` y `proposal` a `celebration` en ES/EN. Actualizar enlaces internos, títulos, descripciones, vistas para compartir, canonicals, alternancia de idiomas y sitemap. Mapear también las rutas históricas que se encuentren en la versión publicada; no enviar todos los productos a la portada.

La información estructurada actual es general y no contiene tarifas de cada producto. Verificar su consistencia; no es necesario añadir un sistema nuevo de datos de producto para completar este reemplazo.

### M5. Revisar reservas y versiones temporales

Comprobar todos los puntos de reserva: portada, tarjetas, fichas y barra flotante. Cada enlace debe abrir la oferta correspondiente con precios y condiciones coincidentes. Si se usa WhatsApp, identificar paquete e idioma y comunicar consulta de disponibilidad; no prometer confirmación inmediata de Peek para paquetes sin compra habilitada.

Si la landing temporal sigue en uso, reconciliar su fuente con el Excel adjunto, corregir su revisión comercial y regenerar las páginas ES/EN y el ZIP después de resolver los pendientes. Su contenido existente no se tomará como aprobación de las tarifas o de las personas incluidas.

### M6. Validar y presentar la vista previa

Actualizar `scripts/validate-data.mjs`, que actualmente exige la lista de productos anterior y resúmenes con 40 minutos. Ejecutar validación bilingüe, revisión de código y compilación del proyecto.

Revisar en escritorio y móvil las siete fichas en ambos idiomas, navegación, filtros, imágenes, etiquetas por persona/paquete, adicionales, barra flotante, botones, cambio de idioma, sitemap y redirecciones. Buscar nombres, precios, enlaces y promesas de la oferta anterior en las superficies comerciales activas.

Comparar los precios y servicios visibles con la matriz aprobada y revisar los destinos de Peek sin completar ninguna compra. Entregar una vista previa y un resumen de cambios antes de publicar.

### M7. Publicar y verificar

Después de la revisión de la vista previa y de acordar el destino, coordinar la salida con las tarifas de reservas. Registrar la versión anterior del despliegue y el procedimiento específico para restaurarla. Publicar la versión aprobada, comprobar las rutas principales y los botones en el sitio público y guardar la referencia del despliegue asociado al commit. La autorización actual comprende comenzar M1; no autoriza publicar ahora.

## Criterios de aceptación

- Siete ofertas nuevas activas, coherentes entre portada, catálogo, fichas, navegación y sistema de reservas.
- Español e inglés con los mismos servicios, tarifas y condiciones.
- Precios por paquete identificados como tales; personas incluidas y adicionales explícitos cuando estén confirmados.
- Sin promesas de servicios antiguos ni enlaces de compra hacia productos equivocados.
- Direcciones antiguas de celebraciones redirigidas a la nueva oferta; enlaces vigentes sin errores.
- Revisión funcional y visual satisfactoria en móvil y escritorio; validación de datos y compilación correctas.
- Publicación en el destino acordado, una vez revisada la vista previa y coordinada la oferta en Peek.

## Archivos principales afectados

`lib/commercial-config.ts`, `types/product.ts`, `lib/images.ts`, `locales/{es,en}/{home,flight-experiences,product,plan,safety-heritage}.json` según referencias afectadas, `locales/{es,en}/product/*.json`, `app/[locale]/(home)/HomeFlightExperience.tsx`, `app/[locale]/flight-experiences/{flight-card,flight-hero}.tsx`, `app/[locale]/product/[slug]/*`, `components/layout/{navbar,footer,floating-bar}.tsx`, `app/sitemap.ts`, `next.config.ts` y `scripts/validate-data.mjs`.

`emergency-landing/` y la versión actualmente publicada se actualizarán de acuerdo con el destino y el alcance de publicación aprobados.
