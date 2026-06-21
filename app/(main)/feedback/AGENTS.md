# Dominio: Feedback

## Contexto

Canal de feedback cualitativo para la observabilidad agentica de Basket Places. Permite que usuarios autenticados reporten bugs, soliciten features o sugieran mejoras desde la app.

El roadmap público queda fuera de alcance por ahora; el feedback se almacena en Supabase para que humanos y agentes puedan triagear necesidades reales de usuarios.

## Stack Tecnológico

- **Supabase/Postgres**: Tabla `public.feedback_reports` con RLS.
- **Next.js Server Actions**: Inserción segura desde `createFeedbackReport`.
- **Zod**: Validación de tipo y descripción.
- **Sonner**: Toasts de éxito/error.
- **Umami**: Evento `feedback_submitted` tras envío exitoso.

## Estructura

```txt
app/(main)/feedback/
├── AGENTS.md
├── page.tsx                         # Página protegida /feedback
├── types.ts                         # Tipos del formulario y enums TS
├── actions/
│   ├── create-feedback-report.ts    # Server Action principal
│   └── index.ts
├── components/
│   └── FeedbackForm.tsx             # Formulario cliente
├── db/
│   └── queries.ts                   # Insert en Supabase
└── schemas/
    └── feedbackSchema.ts            # Validación Zod
```

Archivos relacionados:

```txt
supabase/migrations/008_create_feedback_reports.sql
supabase/tests/07_feedback_reports_rls_test.sql
app/(shared)/GlobalMenu/...
middleware.ts
lib/analytics/AGENTS.md
```

## Patrones Importantes

### Server Action

Usar `createFeedbackReport()` desde componentes cliente. La action:

1. Verifica usuario autenticado con `getCurrentUser()`.
2. Valida payload con `feedbackFormSchema`.
3. Inserta `user_id` desde sesión, nunca desde el cliente.
4. Devuelve `Result<{ id: string }>`.
5. Maneja errores con `handleServiceError()`.

### RLS

La tabla `feedback_reports` debe mantenerse con RLS activo:

- `authenticated` puede insertar solo filas propias (`user_id = auth.uid()`).
- `authenticated` puede leer solo feedback propio.
- No hay `UPDATE`/`DELETE` para clientes authenticated.
- Triage/status queda reservado a tooling confiable con `service_role` o herramientas internas futuras.
- `anon` no tiene privilegios sobre la tabla.

### Analytics

Tras insert exitoso, el formulario dispara:

```tsx
trackAnalyticsEvent('feedback_submitted', {
  feedback_id: result.data.id,
  feedback_type: formData.type,
});
```

No enviar título ni descripción a Umami.

## Reglas Específicas

1. Solo usuarios autenticados pueden enviar feedback.
2. Nunca aceptar `user_id` desde el cliente.
3. No enviar el texto del feedback a servicios de analytics.
4. Mantener `description` validada en cliente y servidor.
5. Si se agregan estados/admin triage, hacerlo en una migración separada y revisar RLS.
6. Validar con:

```bash
npm run typecheck
npm run build
npm run lint
npm run test:db
```

Si `npm run test:db` falla por Docker inactivo, documentar el bloqueo y no asumir que RLS está validado localmente.

## Auto-invoke Skills

| Acción                              | Skill                                              |
| ----------------------------------- | -------------------------------------------------- |
| Cambios de DB/RLS                   | `supabase-use`, `supabase-postgres-best-practices` |
| Cambios de formulario visual        | `ui-creation`                                      |
| Toasts de éxito/error               | `notificacion-use`                                 |
| Manejo de errores en Server Actions | `error-use`                                        |
| Documentación                       | `docs-creation`                                    |

## Referencias

- `app/(main)/feedback/actions/create-feedback-report.ts`
- `app/(main)/feedback/components/FeedbackForm.tsx`
- `supabase/migrations/008_create_feedback_reports.sql`
- `supabase/tests/07_feedback_reports_rls_test.sql`
