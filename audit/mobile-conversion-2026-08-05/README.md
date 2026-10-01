# Auditoría móvil de conversión

Fecha: 5 de agosto de 2026

## Alcance

Landing bilingüe `/[locale]/flight-experiences`, revisada en 390 × 844 y 768 × 1024. El objetivo principal fue comprobar el recorrido desde el hero hasta la elección de paquete y la tarjeta de regalo.

## Resultado

1. **Entrada y hero — saludable.** La propuesta, el precio inicial, los dos CTA y las señales de confianza aparecen en orden claro y sin desbordamiento horizontal.
2. **Acceso al catálogo — corregido.** El botón de reserva del header ahora enlaza directamente a `#catalog-complete` cuando el visitante ya está en la landing.
3. **Elección de paquete — saludable.** La experiencia recomendada comunica categoría, público, inclusiones, precio y reserva en una sola secuencia.
4. **Comparación y celebraciones — corregido.** Se eliminó la barra flotante redundante en esta landing porque ocultaba enlaces y competía con los CTA específicos de cada tarjeta.
5. **Tarjeta de regalo — saludable.** Mantiene tratamiento visual diferenciado y acciones comprensibles.
6. **Tablet — corregido.** La altura mínima del hero bajó de 820 a 720 px en el breakpoint intermedio para reducir espacio vacío sin afectar la legibilidad.

## Evidencia

- `01-mobile-hero.png`: hero móvil antes de ajustes de navegación.
- `02-mobile-recommended-package.png`: paquete recomendado.
- `03-mobile-celebrations.png`: conflicto original con barra flotante.
- `04-mobile-gift-card.png`: tarjeta de regalo.
- `05-tablet-hero.png`: espacio vertical original en tablet.
- `06-tablet-catalog.png`: catálogo tablet con conflicto de barra flotante.
- `07-mobile-hero-en.png`: comprobación de copy inglés.
- `08-mobile-celebrations-fixed.png`: tarjeta sin superposición.
- `09-tablet-hero-fixed.png`: hero tablet compactado.

## Límites

Las capturas permiten revisar jerarquía, reflow, legibilidad aparente y solapamientos. No demuestran por sí solas conformidad WCAG completa; contraste exacto, navegación exhaustiva por teclado y lectores de pantalla requieren pruebas específicas adicionales.
