# Auditoría UX/UI del menú móvil

Fecha: 14 de agosto de 2026

## Alcance

Menú móvil de Flying Pictures México en español, revisado a 424 × 1076 px y 390 × 844 px. El objetivo principal es que una persona pueda elegir cómo volar, preparar su visita o contactar al equipo sin recorrer un sitemap completo.

## Evidencia

1. `01-menu-closed.png`: entrada al menú desde la navegación móvil.
2. `02-menu-open-top.png`: menú completo a 424 × 1076 px.
3. `03-language-selector.png`: selector de idioma dentro del menú.
4. `04-menu-short-screen.png`: menú a 390 × 844 px.

## Diagnóstico

El menú es funcional, legible y mantiene visible la acción de reservar. Sin embargo, presenta demasiadas decisiones al mismo nivel y se parece más al sitemap del pie de página que a una navegación móvil priorizada.

### Fortalezas confirmadas

- La llamada a reservar es visible desde el primer momento.
- El contraste visual es fuerte y la tipografía se lee con claridad.
- El menú utiliza semántica de diálogo.
- El foco inicial llega al botón de cierre.
- La tecla Escape cierra el menú y devuelve el foco al botón que lo abrió.
- El selector de idioma utiliza opciones de radio comprensibles para tecnologías de asistencia.

### Riesgos principales

1. Ocho experiencias aparecen seguidas y con el mismo peso visual. Esto aumenta el esfuerzo para distinguir vuelos principales, celebraciones y regalos.
2. “Reservar vuelo” y “Experiencias de vuelo” aparecen juntos y conducen al mismo destino, generando redundancia.
3. En una pantalla de 390 × 844 px, contacto e idioma quedan fuera de la primera vista; el área desplazable mide 684 px y su contenido 825 px.
4. Las áreas táctiles son pequeñas: las experiencias miden aproximadamente 28 px de alto, las rutas principales 36 px, contacto 24 px y cerrar 40 px. Conviene llevarlas a un mínimo práctico de 44 px.
5. El mismo peso y color en casi todos los enlaces debilita la jerarquía entre categorías, productos y utilidades.
6. El selector de idioma flota sobre los enlaces inferiores y puede tapar temporalmente “Contacto y atención”.
7. No existe una señal visible ni `aria-current` para indicar en qué sección está la persona.

## Dirección recomendada

Convertir el menú en una navegación de dos niveles:

- Mostrar de entrada cuatro decisiones: `Tradicional`, `Vuelo + transporte`, `Experiencia Viajero` y `VIP`.
- Añadir una sola ruta `Ver todas las experiencias` para cumpleaños, aniversario, propuesta y tarjeta de regalo.
- Separar debajo `Seguridad`, `Planea tu visita` y `Grupos y empresas` como navegación principal.
- Colocar contacto e idioma en una franja de utilidades compacta.
- Mantener una acción de reserva fija en la parte inferior, en vez de ocupar la cabecera y duplicar el enlace al catálogo.
- Dar a todos los controles una altura mínima de 44–48 px y marcar la página activa.

## Límites de la auditoría

Las capturas y la inspección del DOM permiten revisar estructura, jerarquía, reflujo, foco y áreas táctiles. No sustituyen una prueba completa con lector de pantalla ni una medición formal de contraste WCAG.
