# Plan de migración SEO para preservar el posicionamiento

**Sitio actual:** `https://flyingpictures.mx`  
**Dominio configurado actualmente en el código:** `https://www.flyingpicturesmexico.mx`  
**Decisión confirmada:** conservar `https://flyingpictures.mx`  
**Fecha del inventario:** 14 de agosto de 2026

## Decisión principal — confirmada

Se mantendrá `flyingpictures.mx`. Por lo tanto, el proyecto se tratará como reemplazo de plataforma y arquitectura dentro del mismo dominio, no como migración a un dominio nuevo.

### Estrategia aprobada: mantener `flyingpictures.mx`

- Publicar el nuevo diseño y tecnología en el dominio que ya tiene historial.
- Conservar las URLs antiguas de mayor valor cuando su intención siga siendo la misma.
- Usar redirects 301 sólo para rutas que realmente deban cambiar.
- Evitar cambiar al mismo tiempo dominio, arquitectura, contenido, diseño y sistema de reservas.

Esta opción elimina el componente más delicado de la migración: transferir señales entre dominios.

No debe utilizarse Change of Address en Search Console. Los redirects actuales hacia `www.flyingpicturesmexico.mx` deben retirarse antes del lanzamiento y todas las referencias canónicas deben volver a `https://flyingpictures.mx`.

## Hallazgo crítico en la configuración actual

`next.config.ts` sólo mapea de forma específica `/la-experiencia`. Para el resto aplica una regla general que conserva el path:

```text
flyingpictures.mx/:path*
→ www.flyingpicturesmexico.mx/:path*
```

Esto no funciona para las rutas cuyo nombre cambió. Por ejemplo:

```text
flyingpictures.mx/producto/vuelo-en-globo-tradicional-sobre-teotihuacan
→ www.flyingpicturesmexico.mx/producto/vuelo-en-globo-tradicional-sobre-teotihuacan
→ 404, porque esa ruta no existe en el sitio nuevo
```

Un redirect que termina en 404 no transfiere correctamente la experiencia ni las señales de la página anterior.

## Inventario inicial

El mapeo público encontró:

- **147 URLs** en total;
- **66 URLs de contenido o funcionales**;
- **81 URLs con parámetros internos de Elementor**;
- **36 URLs de contenido en español**;
- **30 URLs de contenido en inglés**;
- **14 URLs de producto en ambos idiomas**.

Este inventario debe combinarse con cuatro fuentes antes de cerrar el mapa:

1. páginas y consultas de Google Search Console de los últimos 16 meses;
2. landing pages orgánicas y conversiones de GA4;
3. backlinks por URL en Search Console u otra herramienta;
4. logs del servidor y sitemap del WordPress actual.

Una URL que no aparece en el rastreo público puede seguir teniendo enlaces, impresiones o tráfico estacional.

## Mapa prioritario de redirects

Los destinos siguientes usan las rutas que existen hoy en el proyecto. Las rutas marcadas como “crear antes de migrar” no deben apuntarse a una página genérica.

| URL antigua | Destino propuesto | Estado |
|---|---|---|
| `/` | `/es` | Listo |
| `/en` | `/en` | Listo |
| `/la-experiencia` | `/es/flight-experiences` | Listo |
| `/en/la-experiencia` | `/en/flight-experiences` | Listo |
| `/home-paquetes-teotihuacan` | `/es/flight-experiences` | Listo |
| `/en/home-paquetes-teotihuacan` | `/en/flight-experiences` | Listo |
| `/producto/voucher-de-vuelo` | `/es/product/open` | Listo |
| `/en/producto/voucher-de-vuelo` | `/en/product/open` | Listo |
| `/producto/vuelo-en-globo-tradicional-sobre-teotihuacan` | `/es/product/classic` | Listo |
| `/en/producto/vuelo-en-globo-tradicional-sobre-teotihuacan` | `/en/product/classic` | Listo |
| `/producto/vuelo-en-globo-teotihuacan-transporte-piramides` | `/es/product/transport` | Listo |
| `/en/producto/vuelo-en-globo-teotihuacan-transporte-piramides` | `/en/product/transport` | Listo |
| `/producto/vuelo-en-globo-teotihuacan-degustacion-transporte-redondo` | `/es/product/journey` | Listo |
| `/en/producto/vuelo-en-globo-teotihuacan-degustacion-transporte-redondo` | `/en/product/journey` | Listo |
| `/producto/vuelo-en-globo-cumpleanos-en-teotihuacan` | `/es/product/birthday` | Listo |
| `/en/producto/vuelo-en-globo-cumpleanos-en-teotihuacan` | `/en/product/birthday` | Listo |
| `/producto/vuelo-en-globo-aniversario` | `/es/product/anniversary` | Listo |
| `/en/producto/vuelo-en-globo-aniversario` | `/en/product/anniversary` | Listo |
| `/producto/vuelo-en-globo-privado-en-teotihuacan` | Nueva página de vuelo privado | **Bloqueante** |
| `/en/producto/vuelo-en-globo-privado-en-teotihuacan` | Nueva página de vuelo privado en inglés | **Bloqueante** |
| `/vuelos-compartidos` | `/es/product/classic` | Revisar contenido y Search Console |
| `/en/vuelos-compartidos` | `/en/product/classic` | Revisar contenido y Search Console |
| `/vuelos-privados` | Nueva página de vuelo privado | **Bloqueante** |
| `/en/vuelos-privados` | Nueva página de vuelo privado en inglés | **Bloqueante** |
| `/vuelos-premier` | `/es/product/vip` | Revisar equivalencia |
| `/en/vuelos-premier` | `/en/product/vip` | Revisar equivalencia |
| `/paquetes-de-grupo` | `/es/product/corporate` o `/es/product/journey` | Decisión comercial |
| `/en/paquetes-de-grupo` | Equivalente aprobado en inglés | Decisión comercial |
| `/nosotros` | Página nueva de historia/equipo o `/es/safety-heritage` | Revisar paridad |
| `/en/nosotros` | Página nueva de historia/equipo o `/en/safety-heritage` | Revisar paridad |
| `/ayuda` | `/es/plan-your-visit` | Listo tras revisar FAQ |
| `/en/ayuda` | `/en/plan-your-visit` | Listo tras revisar FAQ |
| `/terminos-y-condiciones-generales` | `/es/legal/terms` | Listo tras revisión legal |
| `/en/terminos-y-condiciones-generales` | `/en/legal/terms` | Listo tras revisión legal |
| `/aviso-de-privacidad-integral` | `/es/legal/privacy` | Listo tras revisión legal |
| `/en/aviso-de-privacidad-integral` | `/en/legal/privacy` | Listo tras revisión legal |
| `/tienda` | `/es/flight-experiences` | Revisar tráfico/conversión |
| `/en/tienda` | `/en/flight-experiences` | Revisar tráfico/conversión |

## URLs que requieren decisión, no redirect automático

### Servicios o contenidos sin equivalente nuevo

- `/helicopteros` y `/en/helicopteros`;
- `/restaurante-la-canasta` y su versión inglesa;
- `/globos-aerostaticos-en-san-miguel-de-allende` y su versión inglesa;
- `/embajadores-del-aire` y su versión inglesa;
- `/concurso-20-years-bases`;
- `/blog`.

Si el servicio o tema sigue vigente, se debe conservar o recrear una página equivalente. Si dejó de existir y no hay sustituto real, debe responder `410 Gone` o `404`, no redirigir a la portada.

### URLs transaccionales antiguas

- `/carrito`;
- `/finalizar-compra`;
- `/mi-cuenta`;
- categorías de WooCommerce;
- URLs con `?add-to-cart=`.

No deben enviarse en masa a la portada. Hay que revisar si reciben tráfico o enlaces y decidir entre una explicación útil, el nuevo flujo de reserva o un `410`.

### URLs internas de Elementor

Las 81 URLs con `?elementor_library=` parecen plantillas internas, no páginas editoriales. Deben excluirse de los sitemaps, quedar fuera del índice y devolver una respuesta limpia. No deben convertirse en 81 redirects hacia la home porque podrían producir señales de *soft 404*.

## Condiciones de una migración segura

### Antes del lanzamiento

- Exportar Search Console y GA4 por URL.
- Completar y aprobar el mapa URL por URL.
- Crear la nueva página de vuelo privado en ambos idiomas.
- Mantener contenido equivalente en las páginas que ya reciben tráfico.
- Implementar redirects 301/308 de servidor directamente al destino final.
- Probar variantes `http`, `https`, `www` y sin `www` del dominio anterior.
- Mantener activos el dominio anterior y su certificado HTTPS.
- Verificar los dominios antiguo y nuevo en Search Console.
- Asegurar canonical autorreferente y hreflang con las URLs nuevas.
- Actualizar enlaces internos, imágenes importantes, perfiles externos y campañas.

### Durante el cambio

- Publicar todos los redirects al mismo tiempo que el sitio nuevo.
- Subir el sitemap nuevo con sólo URLs canónicas.
- Usar Change of Address en Search Console si cambia el dominio.
- Inspeccionar manualmente las URLs con más clics, impresiones, enlaces y ventas.
- No bloquear el sitio ni los recursos con robots o `noindex`.

### Después del lanzamiento

- Mantener redirects por al menos un año; idealmente mientras existan enlaces externos.
- Revisar diariamente durante dos semanas: 404, 5xx, canonicals, indexación y conversiones.
- Revisar semanalmente durante tres meses: tráfico por URL, consultas, backlinks y reservas.
- Corregir redirects que terminen en 404, cadenas, loops o destinos irrelevantes.
- Mantener una alerta para solicitudes al dominio anterior sin regla conocida.

## Pruebas obligatorias

Para cada URL prioritaria:

```text
URL antigua
→ una sola respuesta 301/308
→ destino final con 200
→ canonical autorreferente
→ idioma correcto
→ contenido equivalente
→ presente en enlaces internos y sitemap nuevo
```

El QA masivo debe comprobar:

- cero cadenas y loops;
- cero destinos 404 o 5xx;
- cero redirects masivos a una página irrelevante;
- precio e intención conservados;
- canonicals y hreflang correctos;
- variantes con y sin barra final;
- parámetros importantes y campañas conocidas.

## Criterio de salida

La migración no está lista si ocurre cualquiera de estas condiciones:

- una URL con tráfico o backlinks no tiene destino aprobado;
- la página de vuelo privado no tiene equivalente nuevo;
- el redirect general conserva paths que no existen;
- el dominio anterior no está controlado en hosting/DNS/HTTPS;
- no se tiene acceso a Search Console de ambos dominios;
- la reserva o medición no puede atribuir conversiones a la nueva URL;
- robots, canonical o `noindex` contradicen la migración.

## Referencia principal

[Google Search Central: migraciones con cambios de URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)

Google recomienda crear un mapa de URLs, utilizar redirects permanentes de servidor al destino final, evitar redirects irrelevantes a la portada, enviar Change of Address cuando cambia el dominio y mantener los redirects por lo menos un año.
