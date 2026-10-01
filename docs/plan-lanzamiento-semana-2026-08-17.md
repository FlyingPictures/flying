# Plan de lanzamiento — Flying Pictures México

**Presentación para aprobación:** 15 de agosto de 2026  
**Ventana recomendada de lanzamiento:** 19 o 20 de agosto de 2026  
**Dominio definitivo:** `https://flyingpictures.mx`  
**Objetivo:** lanzar el sitio nuevo sin perder el posicionamiento acumulado y dejar preparada la base SEO, GEO y AEO.

## Resumen para presentar

El sitio nuevo se publicará en el mismo dominio que ya tiene historial, tráfico, enlaces y reconocimiento: `flyingpictures.mx`. No haremos una migración de dominio ni utilizaremos la herramienta Change of Address.

La estrategia de lanzamiento tiene tres prioridades:

1. **Conservar autoridad:** mantener las URLs actuales de mayor valor o redirigirlas una sola vez hacia una página verdaderamente equivalente.
2. **Evitar errores técnicos:** ninguna página importante debe terminar en 404, tener canonical hacia otro dominio, quedar bloqueada por robots o perder su versión en inglés.
3. **Mejorar descubrimiento:** después de asegurar la transición, publicar páginas específicas de precios, horarios, transporte, seguridad y planificación con información propia y verificable.

El lanzamiento no depende de crear decenas de artículos. Depende de conservar correctamente lo que ya existe y presentar mejor el conocimiento real de Flying Pictures.

## Decisiones aprobadas

- Se conserva `flyingpictures.mx`.
- El dominio canónico recomendado es `https://flyingpictures.mx`, sin `www`, sujeto a confirmar que coincide con la propiedad y los canonicals históricos de Search Console.
- La portada en español debe conservarse en `/`.
- El inglés debe conservar la estructura `/en`.
- No se enviará Change of Address en Search Console.
- No se redirigirá el sitio anterior hacia `flyingpicturesmexico.mx`.
- Las rutas antiguas con posicionamiento se conservarán o tendrán un redirect permanente directo al destino final.
- Las URLs sin sustituto real devolverán 404/410; no se enviarán masivamente a la portada.

## Principio de arquitectura

Para minimizar cambios durante el lanzamiento:

```text
Español: https://flyingpictures.mx/
Inglés:  https://flyingpictures.mx/en/
```

Las páginas de producto antiguas ya tienen slugs descriptivos. Para las URLs con tráfico, la opción de menor riesgo es mantenerlas como URL pública final, aunque internamente utilicen los componentes nuevos:

```text
/producto/vuelo-en-globo-tradicional-sobre-teotihuacan/
/producto/vuelo-en-globo-teotihuacan-transporte-piramides/
/producto/vuelo-en-globo-teotihuacan-degustacion-transporte-redondo/
/producto/vuelo-en-globo-cumpleanos-en-teotihuacan/
/producto/vuelo-en-globo-aniversario/
/producto/voucher-de-vuelo/
/producto/vuelo-en-globo-privado-en-teotihuacan/
```

Si técnicamente se decide utilizar las rutas nuevas `/product/...`, cada ruta anterior deberá responder con un solo 301/308 hacia el producto equivalente. No se cambiarán esos destinos nuevamente después del lanzamiento.

## Bloqueantes P0

Estos puntos deben estar resueltos para autorizar el lanzamiento.

### 1. Dominio y canonicals

- Cambiar `SITE_URL` de `https://www.flyingpicturesmexico.mx` a `https://flyingpictures.mx`.
- Retirar los redirects que envían `flyingpictures.mx` y `www.flyingpictures.mx` al dominio nuevo.
- Redirigir únicamente `www.flyingpictures.mx` hacia `https://flyingpictures.mx` si la versión sin `www` queda confirmada como canónica.
- Revisar canonical, Open Graph, JSON-LD, sitemap y robots para que utilicen el dominio definitivo.

### 2. Idiomas y estructura histórica

- Configurar español como idioma principal.
- Mantener la portada española en `/` y el inglés en `/en`.
- Evitar que `/` redirija por defecto a `/en`.
- Verificar que cada par ES/EN tenga canonical autorreferente y `hreflang` recíproco.
- Definir `x-default` como `/` si la portada española es el destino principal.

### 3. Mapa de URLs antiguas

- Completar el mapa con Search Console, GA4, backlinks y logs.
- Probar primero las URLs con clics, impresiones, enlaces o ventas.
- Evitar cadenas: URL antigua → destino final, en un solo salto.
- Conservar parámetros de campañas cuando sean necesarios para medición.
- No redirigir plantillas Elementor, carrito, cuenta o contenidos obsoletos a la home.

### 4. Página de vuelo privado

La página antigua de vuelo privado existe en español e inglés, pero el sitio nuevo no tiene un equivalente directo. Debe crearse antes del lanzamiento o conservarse temporalmente la página actual. No debe enviarse a “propuesta”, “VIP” o catálogo si la intención y la oferta son diferentes.

### 5. Robots y sitemap

- Retirar `Disallow: /_next/` para permitir que los crawlers accedan a recursos e imágenes optimizadas.
- Cambiar las fechas automáticas del sitemap por fechas reales.
- Incluir únicamente URLs canónicas con status 200.
- Retirar del sitemap URLs redirigidas, parámetros, carrito, cuenta y páginas internas.
- Mantener el sitemap en `https://flyingpictures.mx/sitemap.xml`.

### 6. Consistencia comercial

- Congelar antes de publicar: nombres, precios, duración, edades, peso, transporte, inclusiones y políticas.
- Confirmar que tarjeta, página de producto, datos estructurados y motor de reserva muestran la misma información.
- Verificar los teléfonos, WhatsApp, correo y horarios.
- Probar cada CTA y reserva desde móvil.

### 7. Medición y verificación

- Mantener la propiedad actual de Google Search Console.
- Confirmar que el método de verificación seguirá disponible después del cambio de hosting.
- Mantener la propiedad y flujo actual de GA4 o documentar cualquier cambio.
- Probar eventos de reserva, WhatsApp, llamada, formulario y cambio de idioma.
- Guardar una línea base de los últimos 90 días antes del lanzamiento.

## Calendario de ejecución

### Sábado 15 de agosto — aprobación y congelamiento

**Objetivo:** salir de la presentación con decisiones cerradas.

- Aprobar dominio canónico sin `www`.
- Aprobar estructura española `/` e inglesa `/en`.
- Aprobar catálogo, precios, políticas y contenido principal.
- Definir responsable de negocio, desarrollo, contenido y analítica.
- Confirmar accesos a DNS, hosting, Search Console, GA4 y motor de reservas.
- Congelar cambios visuales no esenciales hasta después del lanzamiento.

**Salida:** acta de aprobación y lista cerrada de bloqueantes.

### Domingo 16 y lunes 17 — correcciones P0

**Objetivo:** preparar una versión candidata.

- Corregir dominio, redirects, locale, canonical, hreflang, robots y sitemap.
- Crear o conservar la página de vuelo privado.
- Implementar el mapa inicial de URLs antiguas.
- Corregir inconsistencias comerciales.
- Confirmar tracking y verificaciones.
- Generar build de producción.

**Salida:** Release Candidate 1 desplegado en entorno de prueba.

### Martes 18 — QA integral

**Objetivo:** probar el sitio como usuario y como crawler.

- Rastrear todas las URLs antiguas y nuevas.
- Validar redirects, status, canonical, hreflang y schema.
- Probar navegación, idioma, móvil, formularios y reserva.
- Comparar contenido y metadatos de páginas antiguas prioritarias.
- Revisar accesibilidad y rendimiento de páginas de entrada.
- Resolver todos los P0; documentar P1 aceptados.

**Salida:** reporte de QA sin bloqueantes críticos.

### Miércoles 19 — Go/No-Go

**Objetivo:** decidir si se publica.

- Repetir pruebas sobre la versión exacta que irá a producción.
- Confirmar backup o capacidad de regresar a la versión anterior.
- Preparar monitoreo de 404, 5xx, tráfico y reservas.
- Confirmar disponibilidad del equipo durante las primeras horas.
- Tomar decisión formal de lanzamiento.

**Salida:** aprobación Go o nueva fecha; no se lanza con P0 abiertos.

### Jueves 20 — lanzamiento recomendado

**Objetivo:** publicar con tiempo suficiente para observar y corregir.

- Lanzar por la mañana, en el horario de menor tráfico confirmado por GA4.
- Verificar portada, inglés, productos, sitemap, robots y reserva.
- Inspeccionar manualmente las diez URLs orgánicas más importantes.
- Enviar o actualizar el sitemap en Search Console y Bing Webmaster Tools.
- Revisar logs, 404, 5xx y conversiones durante todo el día.

Evitar un lanzamiento el viernes por la tarde o durante el fin de semana.

### Viernes 21 y semana del 24 — estabilización

- Corregir rutas antiguas no contempladas.
- Revisar indexación y canonicals seleccionados.
- Comparar tráfico y conversiones con la línea base.
- Revisar consultas de marca y no marca.
- Priorizar ajustes que afecten venta o descubrimiento; posponer cambios estéticos.

## Criterios Go/No-Go

### Go

- Dominio y canonical correctos en todas las páginas probadas.
- Portada española en `/` e inglés en `/en`.
- 100% de URLs antiguas prioritarias termina en contenido equivalente con 200.
- Cero cadenas, loops o redirects hacia el dominio descartado.
- Página de vuelo privado disponible.
- Robots y sitemap correctos.
- Reserva, WhatsApp, teléfono y formularios funcionan.
- Search Console y GA4 continúan verificados.
- Existe una forma probada de regresar a la versión anterior.

### No-Go

- Alguna URL con tráfico o backlinks termina en 404.
- Canonical, schema, sitemap u Open Graph apuntan a `flyingpicturesmexico.mx`.
- `/` abre o redirige al idioma equivocado.
- Las páginas privadas no tienen equivalente.
- Robots bloquea recursos necesarios o existe `noindex` accidental.
- Precios o políticas contradicen el motor de reservas.
- No se puede medir una reserva o recuperar la versión anterior.

## Primeros 30 días

### Semana 1 — estabilidad

- Monitorear 404, 5xx, redirects, indexación, reservas y páginas de entrada.
- No cambiar URLs ni arquitectura salvo para corregir errores.
- Solicitar actualización de enlaces externos prioritarios cuando sea posible.

### Semana 2 — páginas de demanda

- Publicar precios, horarios y FAQ visibles.
- Mejorar títulos y respuestas rápidas de las experiencias principales.
- Implementar breadcrumbs y datos estructurados de ofertas.

### Semana 3 — autoridad

- Publicar equipo/pilotos, seguridad, flota e historia con evidencia.
- Publicar cómo llegar y qué llevar.

### Semana 4 — GEO/AEO

- Publicar mejor época para volar y política meteorológica explicada.
- Crear el primer activo con datos propios.
- Iniciar medición estable de menciones/citas en Google, ChatGPT y Copilot.

## Responsables mínimos

| Área | Responsabilidad |
|---|---|
| Dirección/cliente | Aprobar dominio, catálogo, precios, políticas y afirmaciones |
| Desarrollo | Dominio, routing, redirects, metadata, sitemap, robots, build y rollback |
| Contenido/SEO | Mapa de equivalencias, títulos, contenido, hreflang y QA editorial |
| Operaciones | Seguridad, duración, restricciones, clima, horarios e inclusiones |
| Analítica | Search Console, GA4, línea base, eventos y monitoreo |

Una persona puede cubrir más de un rol, pero cada punto debe tener propietario y fecha.

## Mensaje ejecutivo

> Mantendremos el dominio que ya tiene posicionamiento y trasladaremos el valor URL por URL. El nuevo sitio no se lanzará hasta comprobar que las páginas que hoy reciben tráfico, enlaces o ventas conservan una respuesta equivalente. Después del lanzamiento, la estrategia GEO/AEO crecerá sobre esa base estable mediante información propia, verificable y mejor estructurada.

