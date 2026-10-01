# Plan de lanzamiento SEO, GEO y AEO

**Flying Pictures México**  
**Fecha del diagnóstico:** 14 de agosto de 2026  
**Competidor analizado:** [WeFly](https://wefly.com.mx/sitemap.xml)

## Resumen ejecutivo

WeFly está construyendo visibilidad con una arquitectura de cobertura: una página por intención comercial, logística y pregunta frecuente, en español e inglés. Sus mejores páginas no se limitan a repetir palabras clave. Entregan una respuesta corta al inicio, tablas, cifras, preguntas frecuentes, fuentes, fecha de actualización, enlaces internos y una ruta clara hacia la reserva.

Flying Pictures parte con una ventaja de marca más difícil de copiar: décadas de experiencia internacional, operación aeronáutica, flota Cameron Balloons, canastillas compartimentadas, disciplina meteorológica y una propuesta premium. El problema actual no es la calidad de esa historia; es que la información está concentrada en pocas URLs, varios títulos son demasiado editoriales para capturar demanda y las páginas comerciales no exponen suficientes datos estructurados ni respuestas independientes.

La recomendación es lanzar en dos capas:

1. **Una base indexable impecable:** arquitectura bilingüe, URLs descriptivas, sitemap y robots correctos, entidades y ofertas conectadas mediante datos estructurados, consistencia de precios y pruebas de autoridad.
2. **Un centro de respuestas original:** páginas creadas con experiencia real de Flying Pictures, no artículos genéricos. Cada guía debe responder una decisión concreta del viajero y enlazar a la experiencia apropiada.

No existe un marcado especial que garantice aparecer en respuestas generativas. Google confirma que sus funciones de IA utilizan los fundamentos de Search y favorecen contenido original, accesible e indexable. El objetivo, por tanto, es ser la fuente más clara, verificable y útil del tema, no aplicar “trucos GEO”.

## Qué está haciendo bien WeFly

### 1. Cubre el recorrido completo de búsqueda

Su sitemap separa, entre otras, estas intenciones:

- vuelo compartido entre semana;
- vuelo compartido de fin de semana;
- vuelo todo incluido;
- vuelo privado, cumpleaños, aniversario y propuesta;
- transporte desde CDMX;
- precios y horarios;
- cómo llegar, qué llevar y mejor época;
- seguridad y preguntas frecuentes;
- Teotihuacán, Pirámide del Sol, Pirámide de la Luna y Calzada de los Muertos;
- comparativa de empresas;
- testimonios, nosotros y agencias.

Esto les da más puntos de entrada para búsquedas largas y para la técnica de *query fan-out* que usan las experiencias generativas: una pregunta compleja se descompone en búsquedas menores sobre precio, clima, traslado, seguridad y disponibilidad.

### 2. Escribe para extracción de respuestas

Las guías analizadas usan bloques como “Resumen estructurado”, respuestas directas, tablas comparativas, listas, coordenadas GPS, preguntas frecuentes, fuentes y fecha de actualización. La guía sobre cómo llegar tiene cerca de 3,000 palabras; la de mejor época, alrededor de 2,300. La extensión no es la ventaja por sí sola: la ventaja es que cada bloque resuelve una subpregunta independiente.

### 3. Conecta información con transacción

Las páginas informativas enlazan a paquetes relevantes; las páginas de tours incluyen precio, itinerario, inclusiones, seguridad, testimonios y FAQ. El usuario y el buscador pueden pasar de “¿cómo llego?” a “reservar con transporte” sin cambiar de tema.

### 4. Multiplica señales de entidad y confianza

Muestra dirección, reseñas, calificación, volumen de pasajeros, certificación, pilotos, políticas y enlaces hacia perfiles externos. También dedica páginas completas a testimonios, equipo y motivos para elegir la empresa.

### 5. Mantiene paridad lingüística

Su arquitectura contempla equivalentes en español e inglés para páginas comerciales y buena parte de las guías. Esto responde tanto al mercado nacional como a turistas que planean desde el extranjero.

## Dónde se puede superar a WeFly

WeFly ejecuta bien la cobertura, pero presenta debilidades que Flying Pictures no debe copiar:

- **Cifras inconsistentes:** en páginas distintas aparecen 7,374, 7,900, 12,845 y 13,007 reseñas o historias, además de más de 50,000 pasajeros. Sin una definición visible, la confianza se diluye.
- **Precios inconsistentes:** el paquete de fotos y desayuno aparece en páginas distintas a $2,690 y $2,890 MXN.
- **Afirmaciones absolutas:** “líder”, “datos que ninguna otra guía tiene” y otros superlativos necesitan metodología y evidencia.
- **Contenido sobreoptimizado:** algunas guías repiten el año, la localidad y la oferta más de lo necesario.
- **Calidad editorial irregular:** la portada contiene errores de redacción y mensajes menos precisos que las nuevas guías.
- **Comparativa interesada:** una empresa que se declara ganadora en su propia comparación puede servir al usuario, pero necesita criterios, fecha, fuentes y metodología transparentes para ser creíble.

Flying Pictures puede ganar con menos páginas, siempre que cada una tenga autor identificable, evidencia verificable, datos consistentes y una perspectiva que sólo un operador con décadas de experiencia podría escribir.

## Diagnóstico del sitio actual

### Fortalezas existentes

- Sitio bilingüe con `hreflang`, canonical y `x-default`.
- Metadatos y Open Graph en las rutas principales.
- Sitemap automático con las páginas y los nueve productos en ambos idiomas.
- Datos estructurados base de Organization, WebSite y TravelAgency.
- Contenido visible y renderizado en servidor.
- Un H1 claro en páginas principales y productos.
- Experiencias con precio, itinerario e inclusiones.
- Contenido propio sobre flota, seguridad, clima e historia.
- Opiniones de Tripadvisor enlazadas a su fuente.
- Compilación de producción, validación bilingüe y lint correctos al 14 de agosto de 2026.

### Brechas prioritarias

#### P0 — antes de indexar

1. **Conservar `flyingpictures.mx` y corregir la configuración antes de lanzar.** La decisión de dominio está confirmada. Deben retirarse los redirects hacia `www.flyingpicturesmexico.mx`, cambiar `SITE_URL`, conservar la portada española en `/` y mapear individualmente las rutas antiguas. No se utilizará Change of Address. Ver el [plan de migración SEO](./migracion-seo-preservar-posicionamiento.md) y el [plan de lanzamiento semanal](./plan-lanzamiento-semana-2026-08-17.md).
2. **Crear un equivalente para el vuelo privado antes de migrar.** Las páginas antiguas de vuelo privado existen en español e inglés y no tienen un producto equivalente en el sitio nuevo. No deben enviarse a propuesta, VIP o catálogo si no responden la misma intención.
3. **Robots bloquea `/_next/`.** Esto puede impedir que crawlers accedan a imágenes optimizadas y otros recursos necesarios para renderizar la página como un usuario. Debe retirarse ese bloqueo y verificarse el HTML renderizado con Google y Bing.
4. **El sitemap declara `lastModified: new Date()` para todas las URLs.** Cada solicitud hace parecer que todo el sitio cambió. Debe usar fechas reales de publicación o modificación. Google ignora `priority` y `changefreq`, pero sí puede usar un `lastmod` confiable.
5. **URLs comerciales demasiado genéricas:** `/es/product/classic`, `/product/journey` o `/product/open` no describen la intención. Antes del lanzamiento conviene decidir si se conservan por estabilidad o se migran una sola vez a slugs localizados y descriptivos. No se deben encadenar redirects desde la URL antigua hacia una ruta temporal y luego a otra definitiva.
4. **Títulos comerciales demasiado editoriales:** “Tradicional” o “El horizonte te espera” comunican marca, pero no siempre explican qué compra el usuario. El título SEO y el H1 pueden mantener personalidad sin ocultar “vuelo en globo en Teotihuacán”, modalidad, precio o transporte.
5. **No hay datos estructurados por experiencia.** Las páginas de producto necesitan una entidad `Product` o `Service` con `Offer`, precio visible, moneda, disponibilidad cuando sea verificable, proveedor, imagen y URL canónica. Deben conectarse por `@id` con una sola entidad Organization/TravelAgency.
6. **No hay BreadcrumbList en las páginas internas**, aunque ya existe una función para generarlo.
7. **Hay varias entidades de organización no conectadas.** Organization y TravelAgency deben compartir un identificador estable, dirección completa, teléfono, logo, perfiles oficiales y datos coherentes.
8. **Consistencia comercial:** precios, duración, edades, peso, cancelación, transporte e inclusiones deben proceder de una fuente única y coincidir en tarjetas, producto, FAQ, schema y motor de reservas.

#### P1 — para el lanzamiento

1. Crear páginas independientes de **precios**, **horarios**, **FAQ**, **cómo llegar**, **qué llevar** y **mejor época para volar**.
2. Añadir una página de **equipo y pilotos** con nombre, cargo, trayectoria verificable, licencias/certificaciones que legalmente puedan publicarse y fotos propias.
3. Convertir “Seguridad y legado” en un centro de evidencia: flota, mantenimiento, criterios de decisión meteorológica, seguro, permisos y responsabilidades del pasajero.
4. Añadir en cada experiencia un bloque de respuesta rápida: precio, duración, hora de encuentro, qué incluye, para quién es y política por clima.
5. Implementar breadcrumbs visibles y enlaces internos contextuales, no sólo navegación global.
6. Garantizar paridad real ES/EN. Cada página indexable en un idioma debe tener equivalente útil en el otro o un `hreflang` que no apunte a contenido incompleto.
7. Elegir deliberadamente el `x-default`: página neutral de selección o el idioma principal de negocio. No debe ser una decisión accidental del framework.
8. Validar que Googlebot, Bingbot y OAI-SearchBot no sean bloqueados por robots, hosting, CDN o protección anti-bots.

#### P2 — primeras 6 a 12 semanas

1. Publicar guías originales basadas en registros de operación y preguntas reales de clientes.
2. Crear activos citables: tabla climática propia, glosario de seguridad, mapa de llegada, checklist descargable y metodología de decisión de vuelo.
3. Conseguir menciones externas coherentes: Google Business Profile, Tripadvisor, asociaciones, medios de viajes, hoteles y operadores turísticos.
4. Implementar IndexNow para comunicar altas y cambios a Bing y sus experiencias de grounding.
5. Medir consultas y menciones de marca en Google, Bing/Copilot y ChatGPT con un conjunto estable de preguntas de prueba.

## Arquitectura recomendada

Los nombres finales deben validarse con demanda real en Search Console, Keyword Planner y datos de ventas. Esta es la estructura inicial recomendada.

### Español

```text
/es/
/es/vuelos-en-globo-teotihuacan/
/es/vuelos/vuelo-compartido-teotihuacan/
/es/vuelos/vuelo-con-transporte-desde-cdmx/
/es/vuelos/vuelo-todo-incluido-teotihuacan/
/es/vuelos/vuelo-privado-teotihuacan/
/es/vuelos/propuesta-de-matrimonio-en-globo/
/es/vuelos/aniversario-en-globo/
/es/vuelos/cumpleanos-en-globo/
/es/vuelos/vuelo-vip-teotihuacan/
/es/vuelos/grupos-y-empresas/
/es/precios-vuelo-en-globo-teotihuacan/
/es/horarios-vuelo-en-globo-teotihuacan/
/es/planear-visita/
/es/guias/como-llegar-a-teotihuacan-desde-cdmx/
/es/guias/que-llevar-a-un-vuelo-en-globo/
/es/guias/mejor-epoca-para-volar-en-globo-en-teotihuacan/
/es/guias/es-seguro-volar-en-globo/
/es/preguntas-frecuentes/
/es/seguridad/
/es/flota-cameron-balloons/
/es/pilotos-y-equipo/
/es/historia/
/es/opiniones/
/es/contacto/
```

### Inglés

Debe existir el equivalente localizado, no una traducción literal de slug cuando la forma de búsqueda sea distinta:

```text
/en/
/en/teotihuacan-hot-air-balloon-rides/
/en/flights/shared-hot-air-balloon-teotihuacan/
/en/flights/hot-air-balloon-from-mexico-city/
/en/flights/all-inclusive-teotihuacan-balloon-tour/
/en/flights/private-hot-air-balloon-teotihuacan/
/en/prices/
/en/schedule/
/en/plan-your-visit/
/en/guides/how-to-get-to-teotihuacan-from-mexico-city/
/en/guides/what-to-wear-hot-air-balloon-ride/
/en/guides/best-time-for-teotihuacan-balloon-flight/
/en/guides/are-hot-air-balloon-rides-safe/
/en/faq/
/en/safety/
/en/pilots-and-team/
/en/reviews/
/en/contact/
```

### Qué no publicar todavía

- Páginas sobre las pirámides o restaurantes sin una experiencia o fuente propia que las diferencie de cientos de guías turísticas.
- Comparaciones de empresas sin metodología pública, fecha, fuentes y revisión legal.
- Estadísticas inventadas o estimadas presentadas como datos operativos.
- Decenas de artículos generados sólo para variar una palabra clave.
- `llms.txt` como sustituto de crawlability, arquitectura o contenido. Puede mantenerse si otra plataforma lo usa, pero Google declara que no mejora ni perjudica su visibilidad.

## Plantilla de página comercial

Cada experiencia debe responder, en texto visible y antes de bloques decorativos:

1. **H1 descriptivo:** modalidad + Teotihuacán + diferenciador.
2. **Respuesta rápida:** precio desde, duración, hora, punto de encuentro y disponibilidad.
3. **Para quién es:** decisión sencilla frente a otras opciones.
4. **Qué incluye y qué no incluye:** tabla o lista explícita.
5. **Itinerario:** horas y variaciones por clima.
6. **Seguridad aplicable:** equipo, piloto, seguro y condiciones específicas.
7. **Prueba:** reseñas verificables de esa experiencia, no testimonios genéricos.
8. **Preguntas de compra:** edad, peso, embarazo, ropa, clima, cancelación y transporte.
9. **Alternativas:** “elige esta opción si…” con enlaces a dos experiencias cercanas.
10. **CTA:** disponibilidad y reserva, con el precio coherente con el contenido.

### Ejemplo de título y respuesta inicial

**Title:** Vuelo compartido en globo en Teotihuacán | Desde $X  
**H1:** Vuelo compartido en globo sobre Teotihuacán  
**Respuesta inicial:** “El vuelo compartido de Flying Pictures dura aproximadamente X minutos y sale al amanecer desde nuestro punto de despegue en Teotihuacán. Cuesta desde $X MXN por adulto e incluye […]. Es la opción recomendada para […].”

Las cifras deben conectarse a la fuente comercial única; el ejemplo no debe publicarse con valores sin validar.

## Plantilla de guía AEO/GEO

Cada guía debe tener una sola intención principal y estos componentes:

- respuesta de 40 a 70 palabras bajo el H1;
- “en breve” con 4 a 6 datos verificables;
- tabla o pasos cuando ayuden a tomar una decisión;
- experiencia propia identificada: quién aporta el dato y cómo se obtuvo;
- fuentes externas primarias para clima, carreteras, patrimonio o regulación;
- fecha de publicación, fecha de revisión y changelog sustantivo;
- autor y revisor con biografía relevante;
- imágenes o video propios con alt descriptivo y contexto textual;
- preguntas relacionadas contestadas sin relleno;
- enlaces a la página comercial pertinente y a dos guías relacionadas;
- limitaciones explícitas: el viento determina ruta, duración y posibilidad de sobrevolar las pirámides.

## Datos propios que sí pueden crear una ventaja GEO

La mejor defensa frente a contenido genérico es publicar conocimiento operativo agregado y revisado. Sólo debe hacerse con autorización, privacidad y metodología.

- porcentaje de vuelos reprogramados por clima por mes;
- rango real de duración de vuelos por temporada;
- temperatura media al registro y al aterrizaje;
- dudas más frecuentes recibidas por WhatsApp y teléfono;
- zonas de CDMX con recogida y tiempos reales de traslado;
- distribución de celebraciones por tipo;
- años de servicio, horas de vuelo o vuelos acumulados por piloto, si son verificables;
- historial y características técnicas de la flota;
- checklist de decisión meteorológica explicado por un responsable operativo.

Cada cifra debe incluir periodo, tamaño de muestra, definición y fecha de actualización. “Datos de Flying Pictures, n=X vuelos entre [fecha] y [fecha]” es mucho más citable que “somos los más seguros”.

## Plan de datos estructurados

### En todo el sitio

- Un grafo único `Organization`/`TravelAgency` con `@id` estable.
- `WebSite` conectado a la organización.
- nombre, URL, logo, dirección completa, teléfono y perfiles oficiales consistentes.
- `BreadcrumbList` por página interna.

### En experiencias

- `Product` o `Service`, según cómo se venda y presente la experiencia.
- `Offer` con precio, `priceCurrency: MXN`, URL, disponibilidad real y vigencia cuando corresponda.
- proveedor conectado al `@id` de Flying Pictures.
- imagen, descripción y nombre idénticos a lo visible.
- `AggregateRating` sólo si la calificación corresponde claramente al objeto marcado, es visible y cumple las políticas; no reutilizar una calificación global como si fuera de cada producto.

### En contenido editorial

- `Article` con autor, revisor cuando aplique, fechas reales y organización editora.
- `VideoObject` cuando exista video principal indexable con miniatura, duración y fecha.
- Las preguntas frecuentes deben seguir en HTML por utilidad y extracción. Desde mayo de 2026 Google dejó de mostrar el resultado enriquecido FAQ, así que `FAQPage` ya no debe tratarse como una prioridad de lanzamiento.

Todo el marcado debe corresponder al contenido visible y validarse antes de publicar.

## Plan de ejecución

### Fase 0 — decisión y fuente única (2–3 días)

- Designar propietario de precios, políticas, seguridad, reputación y contenido.
- Congelar catálogo, nombres, inclusiones y precios de lanzamiento.
- Resolver qué idioma será `x-default` y cuál mercado se prioriza.
- Crear una matriz de afirmaciones: dato, fuente, responsable, fecha y permiso de publicación.

**Salida:** hoja maestra aprobada y cero contradicciones comerciales.

### Fase 1 — base técnica (3–5 días)

- Configurar `flyingpictures.mx` como dominio canónico definitivo y retirar el dominio descartado de redirects, metadata, schema, sitemap y Open Graph.
- Exportar Search Console, GA4, backlinks y logs para completar el inventario de URLs antiguas.
- Aprobar y probar el mapa individual de redirects, incluyendo HTTP/HTTPS y www/sin www.
- Crear equivalentes para las páginas antiguas que todavía tienen demanda, especialmente vuelo privado.
- Corregir robots y fechas del sitemap.
- Definir y migrar URLs descriptivas con redirects.
- Unificar canonical/hreflang y probar paridad de idiomas.
- Implementar grafo de entidades, breadcrumbs y schema de ofertas.
- Validar status 200, HTML inicial, imágenes, canonicals y datos estructurados.
- Preparar Search Console, Bing Webmaster Tools, GA4 y eventos de conversión.

**Salida:** sitio rastreable, coherente y medible.

### Fase 2 — páginas de dinero (5–8 días)

- Reescribir home, catálogo y nueve productos con respuesta rápida.
- Crear precios y horarios comparables.
- Mejorar enlaces internos y rutas de conversión.
- Añadir prueba específica por producto y equipo responsable.

**Salida:** toda consulta comercial importante tiene una URL y un siguiente paso.

### Fase 3 — autoridad y respuestas (7–12 días)

- Publicar FAQ, cómo llegar, qué llevar, mejor época y seguridad.
- Publicar pilotos/equipo, flota e historia con fuentes y fechas.
- Añadir autoría, revisión, metodología y changelog.
- Crear al menos un activo original citable.

**Salida:** clúster inicial de 8–10 recursos con experiencia propia.

### Fase 4 — lanzamiento e indexación (1–2 días)

- QA de contenido, enlaces, schema, móvil y rendimiento.
- Enviar sitemap en Google Search Console y Bing Webmaster Tools.
- Inspeccionar manualmente home, catálogo, dos productos y dos guías por idioma.
- Activar IndexNow para cambios posteriores.
- Confirmar acceso de Googlebot, Bingbot y OAI-SearchBot.
- Revisar Google Business Profile, Tripadvisor y perfiles sociales para consistencia NAP y enlaces.

### Fase 5 — aprendizaje (semanal por 12 semanas)

- Revisar indexación, consultas, páginas de entrada, conversiones y menciones.
- Actualizar sólo cuando cambien datos importantes.
- Expandir páginas que ya obtienen impresiones antes de abrir nuevos temas.
- Entrevistar ventas/operaciones cada mes para descubrir preguntas reales.
- Ejecutar un set fijo de consultas en Google, Bing/Copilot y ChatGPT y registrar fuente citada, posición de marca y exactitud.

## Backlog editorial inicial

| Prioridad | Página | Intención | Evidencia que necesita |
|---|---|---|---|
| 1 | Precios de vuelos en globo en Teotihuacán | Comercial | Catálogo y precios aprobados |
| 1 | Horarios y duración | Comercial/logística | Operación y estacionalidad |
| 1 | Cómo llegar desde CDMX | Logística | Rutas, puntos, tiempos y mapa |
| 1 | ¿Es seguro volar en globo? | Confianza | Responsable de seguridad, permisos y proceso |
| 1 | Qué llevar y cómo vestirse | Preparación | Recomendaciones de pilotos/operación |
| 1 | Mejor época para volar | Planificación | Datos climáticos primarios + experiencia propia |
| 2 | Vuelo compartido vs. privado | Comparación | Capacidad, privacidad, precio y casos de uso |
| 2 | Vuelo con transporte vs. llegar por cuenta propia | Comparación | Costos y tiempos reales |
| 2 | Qué pasa si hay mal clima | Riesgo | Política aprobada y flujo de notificación |
| 2 | Volar con niños y adultos mayores | Accesibilidad | Reglas, limitaciones y revisión operativa |
| 3 | Cómo funciona un globo al amanecer | Informativa | Piloto/ingeniero y fuentes técnicas |
| 3 | Guía visual de la flota Cameron Balloons | Autoridad | Fichas de aeronaves e imágenes propias |

## Indicadores de éxito

### Salud técnica

- 100% de URLs estratégicas indexables con status 200.
- 0 canonicals, hreflang o redirects contradictorios.
- 100% de precios visibles coinciden con datos estructurados y reserva.
- Sitemap con sólo canonicals y `lastmod` verificable.
- 0 errores críticos de datos estructurados.

### Descubrimiento

- porcentaje de páginas enviadas que quedan indexadas;
- consultas no de marca por clúster e idioma;
- impresiones en funciones generativas de Google cuando el reporte esté disponible;
- URLs recibidas/crawleadas mediante IndexNow;
- menciones y citas correctas en el set de pruebas de ChatGPT y Copilot.

### Negocio

- clic de búsqueda a disponibilidad/reserva;
- clic a WhatsApp y llamada por landing page;
- tasa de reserva por página de entrada;
- ingreso orgánico por experiencia e idioma;
- preguntas repetidas que el contenido todavía no resuelve.

No fijar metas de ranking o tráfico sin una línea base de Search Console, GA4 y ventas. Los primeros 30 días deben establecer esa línea base; las metas de crecimiento se fijan después.

## Checklist de salida

- [x] Decisión de dominio aprobada: se conserva `flyingpictures.mx`.
- [ ] Inventario de URLs completado con Search Console, GA4, backlinks y logs.
- [ ] Cada URL antigua importante tiene un destino equivalente y un redirect directo.
- [ ] La nueva página de vuelo privado existe en español e inglés.
- [ ] Dominio anterior, DNS y certificado HTTPS permanecerán activos al menos un año.
- [ ] Propiedades antigua y nueva verificadas en Search Console y Change of Address preparado si aplica.
- [ ] Catálogo, precios, inclusiones y políticas aprobados.
- [ ] Robots permite contenido y recursos de renderizado.
- [ ] Sitemap usa fechas reales y sólo URLs canónicas.
- [ ] URLs y redirects definitivos probados.
- [ ] Canonical, hreflang y `x-default` validados.
- [ ] Títulos, H1 y meta descriptions descriptivos en ambos idiomas.
- [ ] Organización, ofertas y breadcrumbs validados.
- [ ] Contenido principal disponible en HTML inicial.
- [ ] Páginas de precios, horarios, FAQ y planificación publicadas.
- [ ] Autoría, equipo, fuentes y fechas visibles.
- [ ] Google Business Profile, Tripadvisor y redes consistentes.
- [ ] Search Console, Bing Webmaster Tools, GA4 y conversiones configurados.
- [ ] Googlebot, Bingbot y OAI-SearchBot pueden acceder.
- [ ] Pruebas de reserva, WhatsApp y teléfono completadas en móvil.
- [ ] Plan de revisión semanal con responsables asignados.

## Fuentes de referencia

- [Google: Optimizar para funciones generativas de Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: Funciones de IA y tu sitio](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Crear y enviar un sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: Directrices generales de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google: retiro del resultado enriquecido FAQ](https://developers.google.com/search/updates#removing-faq-rich-result)
- [Bing: Webmaster Guidelines para Search, Copilot y grounding](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [Bing: IndexNow](https://www.bing.com/webmasters/help/indexnow-0z209wby)
- [OpenAI: crawlers y OAI-SearchBot](https://developers.openai.com/api/docs/bots)

## Alcance y limitaciones

El diagnóstico combina el sitemap y páginas públicas de WeFly con una revisión del código y contenido local de Flying Pictures. No incluye datos privados de Search Console, GA4, Google Business Profile, reservas, backlinks ni volúmenes de keyword. Por eso identifica arquitectura, calidad, riesgos y prioridades, pero no atribuye rankings o visibilidad real a una táctica concreta sin datos de desempeño.
