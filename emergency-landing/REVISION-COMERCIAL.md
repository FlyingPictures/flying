# Revisión comercial pendiente

Fuente usada: `Paquetes_FlyingPictures_Teotihuacan_Sean_09092026.xlsx`, pestaña `Paquetes`. Se excluyó la pestaña histórica `Paquetes y Precios Publicados` y se evitó mezclar los precios de `Extras`, que difieren en varios casos.

| Paquete | Precio mostrado | Base |
| --- | ---: | --- |
| Vuelo Esencial | $2,599 adulto / $1,999 niño | B11:B12 |
| +Transporte + Pirámides | $3,550 adulto / $2,850 niño | C11:C12 |
| Premium – VIP | $22,500 por paquete | D13 |
| Celebración | $11,999 por paquete | E13 |
| Viajero | $7,999 por paquete | F13 |
| Experiencia en Globo Privada | $11,499 por paquete | G13 |
| FPM Private Charter | $30,000 por paquete | H13 |

Todos los importes se presentan en MXN. La categoría infantil es 4–12 años según A12. Inclusiones: filas 21–49. Extras de cada paquete: filas 51–63. La fila Champagne se consolidó con Brindis con Champagne cuando ambas estaban activadas.

## Confirmaciones para habilitar compra directa

- Los siete enlaces nuevos de reserva. El Excel no tiene enlaces. Mientras tanto se usa el WhatsApp existente en `lib/site-config.ts`; no se envió ningún mensaje durante las pruebas.
- Premium–VIP: D4 y D17 mencionan cuatro personas; D5 dice uno. Se muestra precio por paquete sin afirmar cuántas personas incluye.
- Viajero: F13 indica $7,999 por paquete y F5 mínimo dos; F18 muestra $15,998 en un ejemplo. Confirmar el alcance exacto del total. La landing no calcula un total ni asume que $7,999 sea por persona.
- FPM Private Charter: H4 menciona mínimo dos, H5 uno y H17 cuatro. Se muestra precio por paquete y se remite a confirmación de grupo.
- Celebración y Experiencia en Globo Privada indican mínimo dos. La landing comunica ese mínimo, pero no lo transforma en una afirmación de que el precio incluye exactamente dos personas.
- El ejemplo de C18 ($14,099) no coincide con dos adultos de C11 más el cargo de C14. No se utilizó el ejemplo para cotizar.

El paquete es funcional para consultas, sin estos datos. Las cantidades de personas incluidas siguen pendientes para una oferta de compra directa inequívoca.

## Recursos y funcionamiento

Las fotos, logo y fuentes son los del proyecto existente y están incluidas localmente. Las fotografías ilustran las experiencias; no constituyen una promesa adicional de servicios. Se conservaron los colores de marca, Poppins, Inter y Libre Baskerville.

Cada idioma tiene HTML propio. El selector conserva el paquete en las páginas individuales; el detalle superpuesto permite abrir el mismo paquete en el otro idioma. Con JavaScript desactivado, los enlaces conducen a las páginas completas. Sin almacenamiento local disponible, el cambio manual de idioma sigue funcionando.
