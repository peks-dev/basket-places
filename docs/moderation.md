# Moderación de contenido (manual)

Guía para mantenedores sobre cómo responder a contenido inapropiado, abusivo o
incorrecto mientras no exista un panel de administración dedicado.

> **Estado actual:** la moderación es **manual** vía el dashboard de Supabase.
> No hay rol de administrador ni _soft-delete_ (ocultar sin borrar). Todo borrado
> es permanente. Ver [Mejoras futuras](#mejoras-futuras).

---

## Qué puede moderarse

| Contenido               | Tabla / recurso                  | Relación                                                   |
| ----------------------- | -------------------------------- | ---------------------------------------------------------- |
| Comunidad (cancha/club) | `public.communities`             | dueño = `user_id`                                          |
| Reseña                  | `public.reviews`                 | dueño = `user_id`; FK a `communities`                      |
| Imágenes                | bucket `community-images`        | ruta `community-images/{user_id}/{community_id}/{archivo}` |
| Perfil / cuenta         | `public.profiles` + `auth.users` | dueño = `user_id`                                          |

Las eliminaciones se propagan en cascada:

- Borrar una **comunidad** borra sus **reseñas** (`ON DELETE CASCADE`), pero **no**
  sus imágenes en storage — esas se limpian aparte (ver abajo).
- Borrar un **usuario** (`auth.users`) borra su perfil, comunidades y reseñas en cascada.

---

## Procedimientos

Todo se hace desde el **Supabase Dashboard** del proyecto (Table Editor o SQL Editor).

### 1. Eliminar una comunidad inapropiada

1. Localiza la fila en **Table Editor → `communities`** (filtra por `name`, `city` o `id`).
2. Anota el `id` y el `user_id` (los necesitas para limpiar storage).
3. Borra la fila (SQL Editor recomendado para dejar traza):
   ```sql
   delete from public.communities where id = '<community_id>';
   ```
   Esto borra también sus reseñas en cascada.
4. Limpia las imágenes en **Storage → `community-images`**, carpeta
   `{user_id}/{community_id}/` (borra la carpeta completa).

### 2. Eliminar una reseña abusiva

```sql
delete from public.reviews where id = '<review_id>';
```

### 3. Eliminar solo imágenes ofensivas (conservando la comunidad)

En **Storage → `community-images` → `{user_id}/{community_id}/`** borra los objetos
puntuales. Nota: la comunidad exige entre 2 y 4 imágenes; si bajas de 2, el dueño no
podrá editarla hasta volver a subir. Para casos así, prefiere borrar la comunidad completa.

### 4. Eliminar / banear a un usuario reincidente

No hay sistema de baneo. Para retirar todo su contenido, elimina la cuenta en
**Authentication → Users** (borra `auth.users` → cascada a perfil, comunidades y reseñas).
Luego limpia sus carpetas en los buckets `community-images/{user_id}/` y `avatars/{user_id}/`.

---

## Cómo llegan los reportes

Los reportes in-app de comunidades llegan desde el botón **Reportar problema**
en la página de comunidad/cancha. El flujo reutiliza `public.feedback_reports`
con `type = 'report'` y metadata contextual:

- `source = 'community_page'`
- `community_id`
- `community_name`
- `reason = incorrect_data | does_not_exist | duplicate | spam | other`

Reglas aplicadas:

- El creador/owner de la comunidad no puede reportar su propia ficha; debe editarla.
- Cada usuario puede reportar la misma comunidad una vez cada 2 meses.

También pueden llegar reportes por canales manuales:

- Mensajes directos del equipo.
- Feedback general de usuarios.
- Revisión interna del mapa y las reseñas.

Triagea, reproduce el contenido por `id`/URL y aplica el procedimiento correspondiente.

---

## Mejoras futuras

- **Soft-delete / ocultar:** añadir columna `status` (`active` / `hidden` / `removed`)
  a `communities` y `reviews` para ocultar sin borrar y permitir apelaciones.
- **Rol admin + panel:** policy RLS para un rol `admin` que pueda moderar cualquier fila,
  y una UI mínima de moderación.
- **Moderación dedicada:** migrar los reportes de comunidad a una tabla `reports`
  o vista admin si el volumen supera el flujo ligero con `feedback_reports`.
