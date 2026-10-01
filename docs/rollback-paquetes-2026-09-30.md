# Control de versiones y rollback de paquetes

Fecha: 30 de septiembre de 2026.

## Estado previo preservado

- Rama original: `main`, commit `21c0883`.
- Rama de la migración: `codex/new-packages-2026-09-30`.
- Snapshot del estado de trabajo anterior a esta migración: `2f5dfe6c5479854d627b57f6a6823956fd786151`.
- Tag del snapshot: `fpm-packages-2026-09-30-baseline`.

El snapshot incluye el ajuste móvil ya existente en `floating-bar.tsx`, la landing de emergencia, documentos y auditorías que aún no estaban guardados en Git. Recuperar solo `main` perdería esos cambios en la versión reconstruida; la referencia correcta para volver al estado de trabajo previo es el tag `baseline`.

El snapshot incluye todos los archivos no ignorados que figuraban pendientes antes de comenzar. Los archivos ignorados por Git —dependencias, compilaciones, configuración del entorno y otros definidos en `.gitignore`— no forman parte del snapshot y no se eliminarán durante esta migración. El Excel original está fuera del repositorio: M1 guardará una extracción de sus datos y su huella SHA-256, sin editarlo.

## Convención para los milestones

- Un commit de organización M0 y un commit separado por cada milestone, o más de uno si una revisión posterior requiere corregirlo.
- Tags de cierre: `fpm-packages-2026-09-30-m0`, `...-m1`, hasta `...-m7`.
- Entregas con decisiones abiertas: `...-m1-review`, sin tag de cierre M1 hasta resolver su criterio comercial.
- Registrar evidencias y estado en el plan. La preparación documental no equivale a validación del sitio ni aprobación comercial.
- Mantener commits y tags locales durante esta preparación. No se ha enviado esta rama al remoto ni publicado el sitio.

## Checkpoints registrados

| Referencia | Estado que recupera | Evidencia |
| --- | --- | --- |
| `fpm-packages-2026-09-30-baseline` | Trabajo previo completo, antes de la migración | Commit `2f5dfe6c5479854d627b57f6a6823956fd786151` |
| `fpm-packages-2026-09-30-m0` | Milestones definidos y procedimiento de rollback | Commit `a39bcca7c7ab18dc54f463f66f99c7abb2cf771d` |
| `fpm-packages-2026-09-30-m1-review` | Matriz preparada y verificada; confirmaciones comerciales abiertas | Tag de revisión asociado a esta entrega; no es el cierre comercial de M1 |
| `fpm-packages-2026-09-30-m2` | Modelo de precios y presentación común preparados; catálogo anterior aún activo | Comprobaciones y alcance en `milestone-2-precios-2026-09-30.md` |

## Revisar o recuperar una versión anterior sin borrar trabajo

Primero comprobar si hay trabajo pendiente:

```sh
git status --short
git log --oneline --decorate -10
```

Si hay cambios nuevos sin guardar, conservarlos en un commit de respaldo antes de cambiar de versión. No usar `reset --hard`, `clean` ni sobrescribir archivos pendientes.

Para preparar una rama de recuperación desde el estado previo, con un nombre libre:

```sh
git switch -c codex/rollback-packages-2026-09-30 fpm-packages-2026-09-30-baseline
```

Esto crea otra rama; no elimina la rama de migración ni su historial. Para recuperar un milestone, usar su tag como punto de partida y un nombre nuevo para la rama de recuperación. No se ha ejecutado ningún rollback: estas son instrucciones para cuando sea necesario.

Si se necesita deshacer un milestone manteniendo la historia en la rama de migración, identificar sus commits y crear commits inversos con `git revert`, del más reciente al más antiguo. Verificar el alcance antes de revertir: no revertir el snapshot inicial si lo que se pretende es conservar los cambios anteriores a la migración.

## Verificar un rollback

1. Comparar los archivos reconstruidos con el tag elegido.
2. Para versiones que modifican la aplicación, ejecutar las comprobaciones de datos, revisión de código y compilación correspondientes a esa versión.
3. Revisar las fichas, precios, enlaces y navegación en ambos idiomas antes de volver a publicar.

El checkpoint inicial es una copia del estado existente, no una afirmación de que esa versión ya pasó todas las pruebas.

## Publicación y reservas

Git permite recuperar los archivos del proyecto. No recupera automáticamente el contenido de HostGator, un despliegue externo ni los productos de Peek.

Antes de M7 se debe registrar el destino y la versión anterior del despliegue. Si se utiliza la landing estática, respaldar los archivos públicos y `.htaccess` del servidor antes de sustituirlos. Si se usa un proveedor con despliegues versionados, identificar el despliegue previo y cómo volver a él.

No se modificará Peek como parte de un rollback de código. Cualquier restauración de la oferta publicada debe coordinarse con las tarifas y disponibilidad vigentes en reservas.
