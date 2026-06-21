# Dominio: Analytics y Observabilidad de Producto

## Contexto

Capa de analítica web basada en Umami. Sirve para medir pageviews y eventos de producto de alto valor sin acoplar componentes directamente al objeto global `window.umami`.

El objetivo es que humanos y agentes AI puedan entender el uso real de la app: autenticación, contribuciones, vistas de comunidades, reviews y feedback futuro.

## Stack Tecnológico

- **Umami Cloud**: Analítica web privacy-friendly.
- **Next.js App Router**: Carga del script con `next/script` desde `app/layout.tsx`.
- **TypeScript**: Eventos tipados en `lib/analytics/umami.ts`.
- **CSP en middleware**: `middleware.ts` permite los orígenes necesarios para cargar y enviar eventos.

## Estructura

```txt
lib/analytics/
├── AGENTS.md      # Esta documentación de dominio
└── umami.ts       # Helper tipado para disparar eventos Umami

app/components/analytics/
└── UmamiEventTracker.tsx # Componente cliente no visual para eventos al montar páginas server-rendered
```

Archivos relacionados:

```txt
app/layout.tsx     # Carga el script Umami con next/script si hay env vars válidas
middleware.ts      # CSP para script-src/connect-src de Umami
```

## Patrones Importantes

### 1. Nunca llamar `window.umami` directamente desde features

Usar siempre el helper central:

```tsx
import { trackAnalyticsEvent } from '@/lib/analytics/umami';

trackAnalyticsEvent('review_submitted', {
  community_id: communityId,
  rating,
});
```

Esto mantiene los nombres de eventos tipados y evita duplicar lógica defensiva.

### 2. Eventos desde Server Components

Si una página es Server Component y necesita disparar un evento al montarse en el cliente, usar `UmamiEventTracker`:

```tsx
import { UmamiEventTracker } from '@/app/components/analytics/UmamiEventTracker';

<UmamiEventTracker
  eventName="community_viewed"
  data={{
    community_id: community.id,
    community_type: community.type,
    city: community.city,
    surface: 'page',
  }}
/>;
```

### 3. El helper debe ser no-op si Umami no está cargado

`trackAnalyticsEvent()` verifica `typeof window` y usa optional chaining sobre `window.umami`. No debe romper tests, SSR, builds, ni navegadores con bloqueadores.

### 4. Datos permitidos

Enviar solo metadata de producto de bajo riesgo:

- IDs públicos o internos necesarios para agregación (`community_id`).
- Categorías o modos (`community_type`, `mode`, `surface`).
- Métricas no sensibles (`rating`).
- Destinos internos de navegación (`destination`).

No enviar:

- Emails.
- Nombres de usuario.
- Comentarios/reviews en texto libre.
- Descripciones de comunidades.
- Tokens, URLs firmadas, datos de sesión o PII.

## Eventos actuales

| Evento                   | Cuándo se dispara                                    | Datos actuales                                      |
| ------------------------ | ---------------------------------------------------- | --------------------------------------------------- |
| `auth_sign_in_started`   | OTP enviado correctamente                            | `is_resend`                                         |
| `auth_sign_in_completed` | OTP verificado y sesión sincronizada                 | `destination`                                       |
| `contribution_started`   | Usuario abre el formulario de crear/editar comunidad | `mode`, `community_id` en edición                   |
| `contribution_submitted` | Comunidad creada/actualizada correctamente           | `mode`, `community_id`, `community_type`            |
| `community_viewed`       | Detalle de comunidad renderizado como página o panel | `community_id`, `community_type`, `city`, `surface` |
| `review_submitted`       | Review creada correctamente                          | `community_id`, `rating`                            |
| `feedback_submitted`     | Reservado para el futuro formulario de feedback      | Por definir cuando exista feedback                  |

## Configuración de entorno

La integración base se controla desde variables públicas de Next.js:

```env
NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_UMAMI_ALLOWED_DOMAINS=basket-places.com,www.basket-places.com,basket-places.website,www.basket-places.website
```

Opcionales:

```env
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
NEXT_PUBLIC_UMAMI_ENABLED=true
```

Notas:

- Si `NEXT_PUBLIC_UMAMI_WEBSITE_ID` no existe, el script no se renderiza.
- Si `NEXT_PUBLIC_UMAMI_ENABLED=false`, el script no se renderiza.
- Para Umami Cloud, el script carga desde `https://cloud.umami.is/script.js`, pero los eventos se envían a `https://gateway.umami.is/api/send`; ambos deben estar cubiertos por CSP.
- `NEXT_PUBLIC_UMAMI_ALLOWED_DOMAINS` usa hostnames sin protocolo ni puerto. Para probar localmente puede incluir `localhost`.

## Reglas Específicas

1. Agregar nuevos eventos primero al union type `AnalyticsEventName` en `lib/analytics/umami.ts`.
2. Usar nombres en `snake_case`, orientados a acciones de producto (`feedback_submitted`, no `click_button_123`).
3. Mantener eventos de alta señal; evitar instrumentar cada click menor.
4. No enviar PII ni texto libre.
5. Si cambias `NEXT_PUBLIC_UMAMI_SCRIPT_URL`, revisar `middleware.ts` para CSP.
6. Después de agregar eventos, correr:

```bash
npm run typecheck
npm run build
npm run lint
```

## Auto-invoke Skills

| Acción                                       | Skill                                   |
| -------------------------------------------- | --------------------------------------- |
| Cambiar carga de scripts en App Router       | `next-best-practices`                   |
| Crear/editar documentación de observabilidad | `docs-creation`                         |
| Instrumentar formularios UI                  | `ui-creation` si se toca UI visual      |
| Instrumentar Server Actions/errores          | `error-use` si cambia manejo de errores |

## Referencias

- `lib/analytics/umami.ts` — helper tipado.
- `app/components/analytics/UmamiEventTracker.tsx` — tracker no visual para Server Components.
- `app/layout.tsx` — carga del script Umami.
- `middleware.ts` — CSP para Umami.
- Documentación Umami: https://docs.umami.is/docs/tracker-configuration
- Eventos custom Umami: https://docs.umami.is/docs/guides/track-single-page-apps
