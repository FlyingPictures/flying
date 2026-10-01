# Flying Pictures · Landing temporal

El ZIP contiene un sitio estático completo, en español e inglés. No requiere WordPress, PHP, plugins, una base de datos ni instalar software en el servidor. Incluye las fotos y tipografías.

## Instalación

1. En cPanel, abre **Administrador de archivos** y activa **Mostrar archivos ocultos** en Configuración. Localiza la carpeta que sirve el dominio de Flying; para el dominio principal normalmente es `public_html`. Confirma la carpeta en la sección Dominios de cPanel antes de subir archivos.
2. Descarga un respaldo del sitio actual, incluidos `index.php`, `index.html` si existe y `.htaccess`. Guarda el respaldo fuera de la carpeta pública. No borres WordPress ni su base de datos.
3. Para verificar primero, crea una carpeta temporal, por ejemplo `preview-flying`, sube el ZIP ahí y extráelo. Abre `https://TU-DOMINIO/preview-flying/index.html`. Todos los enlaces internos funcionan también en una subcarpeta.
4. Una vez revisada la vista previa, sube y extrae el ZIP en la carpeta del dominio. `index.html`, `en`, `packages`, `assets` y `.htaccess` deben quedar directamente en esa carpeta, no dentro de una carpeta adicional. Si ya existen carpetas con esos nombres, respáldalas y comprueba que no contienen archivos de otro sitio antes de combinar o reemplazar.
5. Sustituye el `.htaccess` antiguo por el incluido, después de respaldarlo. El nuevo indica `DirectoryIndex index.html` y no contiene reglas de WordPress. No agregues estas líneas al bloque viejo: una regla o manejador heredado podría volver a enviar las visitas a PHP. Si el hosting exige algún ajuste propio, su soporte puede conservar únicamente ese ajuste sin restaurar la redirección a WordPress.
6. El `index.php` anterior puede conservarse: la nueva página de inicio será `index.html`. Purga la caché de HostGator o de cualquier CDN si está activa.
7. Abre el dominio con HTTPS en una ventana privada. Revisa la portada, ES/EN, filtros, detalles de los siete paquetes, extras, WhatsApp y teléfono; repite en celular. Prueba también `/en/index.html` y `/packages/essential.html` directamente.

## Reservas y condiciones

Actualmente cada paquete abre WhatsApp **+52 55 1048 4758** con su nombre y un mensaje en el idioma elegido. No se cobran pagos en esta landing. Las tarifas y servicios proceden de la hoja **Paquetes** del Excel del 9 de septiembre de 2026.

Los precios por paquete se muestran como tales. En los casos donde el Excel no determina de forma consistente cuántas personas están incluidas, se pide confirmar el total del grupo con el equipo. No se han reutilizado enlaces de compra de la oferta anterior.

## Qué conserva y qué no sustituye

Esta entrega sustituye la portada y ofrece catorce páginas de paquetes (siete por idioma). No replica todas las rutas históricas de WordPress. No configures una redirección general de todos los enlaces antiguos hacia la portada: las rutas importantes se pueden mapear por separado a las experiencias correspondientes.

## Volver al sitio anterior

Restaura el respaldo de `.htaccess` y de cualquier archivo reemplazado. Retira o renombra el `index.html` de la landing y restaura el anterior si existía. Reactiva el WordPress únicamente cuando su incompatibilidad con PHP se haya resuelto.

## Entrega

- `FlyingPictures-Landing-HostGator.zip`: contenido que se sube al hosting.
- Este documento: instrucciones para quien lo instala.

No hace falta subir carpetas de código fuente, comprobaciones ni el archivo Excel.
