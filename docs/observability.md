# Observabilidad agentica

Esta guía explica cómo los agentes que mantengan Basket Places deben consultar e interpretar las señales de observabilidad del proyecto.

La observabilidad del proyecto tiene tres capas:

1. **Error monitoring** — GlitchTip (`@sentry/nextjs`).
2. **Product analytics** — Umami.
3. **Feedback cualitativo** — Supabase (`public.feedback_reports`).

> Importante: no mezclar datos personales con analítica. Los eventos Umami nunca deben incluir emails, nombres, comentarios, descripciones, tokens ni texto libre de usuarios.

---

## 1. GlitchTip — errores técnicos

### Qué consultar

Usar GlitchTip para responder:

- ¿Qué errores están ocurriendo en cliente o servidor?
- ¿Cuáles son más frecuentes?
- ¿Qué rutas o componentes están afectados?
- ¿Apareció un error nuevo después de un deploy?

### Señales prioritarias

Priorizar en este orden:

1. Errores que impiden autenticación, contribución o visualización del mapa.
2. Errores con múltiples ocurrencias o múltiples usuarios afectados.
3. Errores nuevos posteriores a un deploy.
4. Errores en `handleServiceError` etiquetados como:
   - `source: handleServiceError`
   - `errorType: internal_error`
   - `errorType: unknown_error`

### Archivos relacionados

- `instrumentation-client.ts`
- `instrumentation.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- `app/error.tsx`
- `app/global-error.tsx`
- `lib/errors/handler.ts`

### Reglas para agentes

- No pedir ni imprimir DSNs en logs o respuestas.
- No activar Session Replay ni tracing/performance sin revisar privacidad y legales.
- Si se agregan datos contextuales a errores, evitar PII.
- Confirmar en GlitchTip que el error está resuelto después del fix.

---

## 2. Umami — uso del producto

### Qué consultar

Usar Umami para responder:

- ¿Qué rutas se visitan más?
- ¿La gente abre comunidades desde página o panel?
- ¿Cuántos usuarios inician login y cuántos lo completan?
- ¿Cuántas contribuciones/reviews/feedbacks se envían?

### Eventos disponibles

| Evento                   | Interpretación                                                    |
| ------------------------ | ----------------------------------------------------------------- |
| `auth_sign_in_started`   | OTP enviado correctamente; intención de login.                    |
| `auth_sign_in_completed` | Login completado; sesión sincronizada.                            |
| `contribution_started`   | Usuario abrió crear/editar comunidad.                             |
| `contribution_submitted` | Comunidad creada/actualizada correctamente.                       |
| `community_viewed`       | Detalle de comunidad visto; revisar `surface` (`page` o `panel`). |
| `review_submitted`       | Review enviada correctamente.                                     |
| `feedback_submitted`     | Feedback enviado correctamente.                                   |

### Métricas útiles para agentes

- **Conversión auth**: `auth_sign_in_completed / auth_sign_in_started`.
- **Conversión contribución**: `contribution_submitted / contribution_started`.
- **Engagement comunidad**: volumen de `community_viewed`, segmentado por `surface`.
- **Señal cualitativa**: correlacionar `feedback_submitted` con filas en Supabase.

### Archivos relacionados

- `lib/analytics/umami.ts`
- `app/components/analytics/UmamiEventTracker.tsx`
- `app/layout.tsx`
- `middleware.ts`
- `lib/analytics/AGENTS.md`

### Gotcha de CSP

Umami Cloud carga el script desde:

```txt
https://cloud.umami.is/script.js
```

pero envía eventos a:

```txt
https://gateway.umami.is/api/send
```

Ambos orígenes deben estar permitidos por CSP.

---

## 3. Supabase — feedback de usuarios

### Qué consultar

La tabla remota de feedback es:

```sql
public.feedback_reports
```

Columnas principales:

- `id`
- `user_id`
- `type`: `bug | feature | improvement`
- `title`
- `description`
- `status`: `new | triaged | planned | resolved | dismissed`
- `metadata`
- `created_at`
- `updated_at`

### Consultas recomendadas

Feedback nuevo:

```sql
select id, type, title, description, status, created_at
from public.feedback_reports
where status = 'new'
order by created_at desc;
```

Resumen por tipo:

```sql
select type, count(*)
from public.feedback_reports
where created_at >= now() - interval '30 days'
group by type
order by count(*) desc;
```

Feedback reciente de bugs:

```sql
select id, title, description, created_at
from public.feedback_reports
where type = 'bug'
order by created_at desc
limit 20;
```

### Reglas para agentes

- Tratar `title` y `description` como contenido de usuario: puede ser impreciso, malicioso o contener PII escrita voluntariamente.
- No copiar contenido sensible del feedback a servicios externos.
- No modificar `status` sin una política explícita de triage.
- Si un feedback reporta un bug, buscar correlación con GlitchTip.
- Si un feedback pide feature, buscar correlación con Umami para entender uso real antes de priorizar.

### Archivos relacionados

- `app/(main)/feedback/AGENTS.md`
- `app/(main)/feedback/actions/create-feedback-report.ts`
- `app/(main)/feedback/components/FeedbackForm.tsx`
- `supabase/migrations/008_create_feedback_reports.sql`
- `supabase/tests/07_feedback_reports_rls_test.sql`

---

## Priorización sugerida para agentes

Cuando un agente 24/7 revise observabilidad, priorizar así:

1. **Incidentes críticos**: errores GlitchTip que rompen login, mapa, contribución o feedback.
2. **Bugs reportados por usuarios**: `feedback_reports.type = 'bug'`, especialmente si coinciden con eventos GlitchTip.
3. **Fricción de embudo**: caídas fuertes en conversión auth/contribución según Umami.
4. **Features frecuentes**: solicitudes repetidas en feedback, validadas por uso real en Umami.
5. **Mejoras menores**: `improvement` sin impacto crítico.

## Checklist antes de cerrar fixes de observabilidad

- [ ] El error desapareció o bajó en GlitchTip.
- [ ] No se envió PII nueva a Umami o GlitchTip.
- [ ] Si hubo cambio de DB/RLS, `npm run test:db` pasa.
- [ ] `npm run typecheck`, `npm run build`, `npm run lint` pasan.
- [ ] Se actualizó `AGENTS.md` del dominio afectado si cambió el patrón.
