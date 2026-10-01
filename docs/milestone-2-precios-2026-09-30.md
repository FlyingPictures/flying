# M2 — Configuración y presentación de precios

Fecha: 30 de septiembre de 2026. Estado: completado y preparado para activar el catálogo en M3. Referencia de recuperación: `fpm-packages-2026-09-30-m2`.

## Resultado

- Configuración de las siete ofertas nuevas en `lib/package-catalog.ts`, con nombres ES/EN, modalidad, fuentes, precio por persona o paquete y adicionales observados pendientes de confirmación.
- Viajero tiene precio `null` hasta confirmar $7,999 frente a $8,099. Ambos valores se conservan como candidatos internos; la presentación pública preparada muestra «Consultar precio» / «Ask for pricing».
- Premium y Charter no tienen mínimo deducido de las celdas contradictorias. Ninguna de las cinco tarifas por paquete afirma cuántas personas incluye. Celebración, Viajero y Globo Privado conservan el mínimo observado de dos, separado de personas incluidas.
- Las tarifas infantiles pertenecen a los dos paquetes por persona. Los precios observados de personas adicionales no se usan como tarifas infantiles del paquete ni se publican como reglas comerciales resueltas.
- Los siete destinos nuevos de compra permanecen nulos. No se asignaron enlaces antiguos a la nueva oferta.
- Presentación común en `lib/product-pricing.ts`, utilizada por fichas, tarjetas, portada y barra flotante: precio, unidad y condiciones derivan del mismo modelo en ambos idiomas.
- La barra flotante obtiene su precio de la ruta actual; ya no espera a que la ficha copie importes a un estado compartido. Esto evita conservar el precio anterior al navegar entre productos.
- Retiradas las configuraciones auxiliares sin uso que contenían Tradicional privado por $9,199.

## Transición hacia M3

El catálogo anterior sigue activo en este checkpoint, con sus precios, contenido y destinos anteriores. Las nuevas ofertas no se activaron parcialmente: M3 debe sustituir conjuntamente nombres, traducciones, fichas, imágenes, listas de navegación y la configuración activa.

Para M3 se usarán las condiciones abiertas de la matriz comercial. Un precio pendiente no se convertirá en un importe publicado y un mínimo de reserva no se interpretará como personas incluidas. La política de compra/consulta de los paquetes nuevos seguirá dependiendo de los enlaces y condiciones que se confirmen.

## Comprobaciones realizadas

| Comprobación | Resultado |
| --- | --- |
| Comparación de los siete precios/modelos con la matriz M1 | Correcta; Viajero sigue pendiente |
| Pruebas de precios | 11 aprobadas |
| Validación de datos bilingües | 18 archivos y nueve fichas por idioma, correspondientes al catálogo aún activo |
| TypeScript | Sin errores |
| Revisión de código de los archivos modificados | Sin errores |
| Revisión React | Precios derivados durante render; eliminación de estado redundante; claves estables y navegación sin importes heredados |
| Compilación final de producción | Correcta; 40 páginas generadas |
| Ficha Esencial/Tradicional ES y navegación hacia Propuesta ES | Etiquetas e importes correctos; barra actualizada al cambiar de ficha |
| Ficha Propuesta EN | Precio para dos y pasajero adicional distinguidos correctamente |
| Móvil a 320 px | Sin desbordamiento horizontal; barra y botones legibles |
| Catálogo EN y portada ES en escritorio | Contenido y nuevas etiquetas de unidad renderizados |
| Consola de las páginas revisadas | Sin errores |

La primera compilación falló al solicitar las tipografías Google Fonts por la restricción de red del entorno. La compilación final con acceso a las tipografías originales pasó. No se cambiaron fuentes ni dependencias para resolverlo.

La herramienta `agent-browser` no estaba instalada; la revisión visual se realizó con el navegador integrado de Codex. No se completó ninguna compra ni se envió ningún mensaje.

Evidencia visual de la presentación de precios a 320 px, todavía con el catálogo anterior activo:

![Precios y barra flotante móvil](../audit/package-migration-2026-09-30/m2-pricing-mobile-320.jpg)

## Rollback

Volver al checkpoint `fpm-packages-2026-09-30-m1-review` recupera el proyecto previo a los cambios de M2. El snapshot `baseline` conserva también el trabajo que existía antes de la migración. El procedimiento está en [rollback-paquetes-2026-09-30.md](rollback-paquetes-2026-09-30.md).

Este checkpoint es local. No se modificaron las tarifas en Peek, la landing temporal ni el sitio publicado.
