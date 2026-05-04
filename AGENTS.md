# Basket Places - GUIDELINES

## Cómo usar este AGENTS.md

1. **Start here** para normas transversales
2. Cada dominio tiene su propio `AGENTS.md` (ej: `app/(main)/map/AGENTS.md`)
3. Las skills específicas del dominio **sobreescriben** las genéricas cuando hay conflicto
4. Para documentación de base de datos y Supabase, ver [`lib/supabase/AGENTS.md`](./lib/supabase/AGENTS.md)

## Información General del Proyecto

Basket Places es una aplicación web para descubrir comunidades de basketball locales. Incluye autenticación OTP con Supabase, mapas interactivos con Leaflet, y sistema de reviews.

**Objetivo**: Conectar jugadores de basketball con comunidades locales, permitiendo descubrir, evaluar y contribuir con nuevas.

## Stack Tecnológico

- **Next.js 15**: Framework full-stack con App Router, TypeScript y Turbopack
- **Supabase**: Auth (OTP), PostgreSQL con PostGIS, Storage (buckets de imágenes)
- **TypeScript**: Tipado estricto en todas las interfaces y funciones
- **Tailwind CSS 14**: Estilizado utility-first con configuración personalizada
- **Zustand**: Gestión de estado global (auth, UI state)
- **React Leaflet**: Mapas interactivos con marcadores personalizados
- **Swiper**: Sliders de imágenes para galerías
- **Framer Motion**: Animaciones de transición y micro-interacciones
- **Sonner**: Sistema de notificaciones toast
- **UUID**: Generación de IDs únicos para recursos

## Configuración del Entorno

```bash
# Instalar dependencias
npm install
```

### Variables de Entorno (.env.local)

| Variable | Descripción | donde obtenerla |
|----------|-------------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio (solo server) | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_APP_URL` | URL de la app | Tu dominio o Vercel URL |
| `GEMINI_API_KEY` | API key de Google Gemini | Google AI Studio |
| `RESEND_API_KEY` | API key de Resend (emails) | Resend Dashboard |

```bash
# Ejemplo .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_APP_URL=http://localhost:3000
GEMINI_API_KEY=AIza...
RESEND_API_KEY=re_...
```

### Buckets de Storage

| Bucket | Uso | Path pattern |
|--------|-----|---------------|
| `community-images` | Imágenes de comunidades/canchas | `community-{id}/{filename}` |
| `avatars` | Fotos de perfil de usuarios | `{user_id}/{filename}` |

## Comandos de Desarrollo

```bash
npm run dev      # Servidor de desarrollo con Turbopack (puerto 3000)
npm run build    # Build de producción
npm run lint     # Verificación ESLint
npm run lint:fix # Auto-fix ESLint + Prettier
npm run format   # Formateo con Prettier
```

## Deployment

### Entornos

| Entorno | URL | Trigger |
|---------|-----|---------|
| Local | `http://localhost:3000` | `npm run dev` |
| Preview (Vercel) | `https://*.vercel.app` | Cada PR |
| Production | `https://basket-places.com` | Push a `main` |

### Deploy Automático (Git)

```
main → Production (deploy automático)
feature/* → Preview (PRs)
```

### Deploy Manual

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### Verificación Post-Deploy

Checklist antes de declarar funcional:

- [ ] **Auth**: Login OTP envía emails
- [ ] **Mapa**: Leaflet renderiza correctamente
- [ ] **Communities**: Formulario de contribución funciona
- [ ] **Storage**: Upload de imágenes funciona
- [ ] **AI**: Análisis con Gemini responde
- [ ] **RLS**: Policies de Supabase se aplican

### Rollback

**Dashboard**: Deployments → Seleccionar anterior → "Promote to Production"

**CLI**:
```bash
vercel rollback [deployment-url]
```

### Troubleshooting

**Build Failures**:
1. Revisar logs en Vercel Dashboard → Deployments → [failed] → Build Logs
2. Verificar variables de entorno
3. `npm run build` localmente para verificar

**Runtime Errors**:
1. Revisar **Runtime Logs** en Vercel Dashboard
2. Filtrar por `error` level
3. Verificar Edge Functions

**Auth Issues**:
1. Verificar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Revisar logs de Auth en Supabase Dashboard

**Storage Fails**:
1. Verificar políticas RLS del bucket
2. Verificar límite de tamaño (2MB para Vercel)
3. Revisar logs de Storage en Supabase Dashboard

### Límites de Plataforma

| Recurso | Límite |
|---------|--------|
| Lambda RAM | 1024MB |
| Lambda timeout | 10s (functions), 60s (serverless) |
| Body size | 4.5MB |

## Estructura de Carpetas

```
app/
├── (auth)/           # Rutas de autenticación (login, verify)
│   ├── login/
│   └── verify/
├── (main)/           # Rutas principales protegidas
│   ├── comunidad/    # Detalle de comunidad/cancha
│   │   ├── contribuir/  # Wizard de creación (AGENTS.md propio)
│   │   └── reviews/      # Sistema de reviews (AGENTS.md propio)
│   ├── contribution/ # Formulario para agregar canchas
│   ├── map/          # Vista del mapa con filtros
│   ├── profile/      # Perfil de usuario
│   ├── @panel/       # Interception routes para panels
│   └── page.tsx      # Homepage (mapa)
├── (shared)/        # Componentes compartidos
│   ├── GlobalMenu/   # Menú hamburguesa
│   └── notifications/ # Sistema de toasts
├── components/       # Componentes React
│   └── ui/           # Componentes base (Button, Input, Modal)
│       └── svgs/     # Iconos SVG personalizados

lib/                  # Utilidades y configuraciones
├── hooks/            # Custom hooks
├── types/            # Definiciones TypeScript globales
├── supabase/         # Clientes y helpers (AGENTS.md propio)
├── store/            # Stores de Zustand
├── errors/           # Servicio de error handling
├── services/         # Servicios de integraciones
│   └── ai/           # Integración con AI
└── utils/            # Funciones utilitarias

skills/               # Skills disponibles para agentes
└── *.md              # Archivos SKILL.md
```

## CONVENCIONES DEL PROYECTO

### Naming

- **Archivos**: `kebab-case` (ej: `user-profile.tsx`)
- **Funciones**: `camelCase` (ej: `getUserData()`)
- **Componentes**: `PascalCase` (ej: `UserProfile`)
- **Hooks**: `camelCase` con prefijo `use` (ej: `useAuth`)
- **Constantes**: `SCREAMING_SNAKE_CASE` (ej: `MAX_UPLOAD_SIZE`)
- **Tipos/Interfaces**: `PascalCase` con sufijo opcional (ej: `UserData`, `AuthProps`)

## Auto-invoke Skills

Cuando realices estas acciones, **SIEMPRE** invoca la skill correspondiente:

| Acción                     | Skill                                                  |
| -------------------------- | ------------------------------------------------------ |
| Operaciones con Git         | [`git-workflow`](./skills/git-workflow.md)             |
| Crear commits              | [`git-workflow`](./skills/git-workflow.md)             |
| Crear componentes UI       | [`ui-creation`](./skills/ui-creation.md)               |
| Trabajar con Supabase      | [`supabase-use`](./skills/supabase-use.md)             |
| Implementar animaciones    | [`animation-creation`](./skills/animation-creation.md) |
| Manejar errores            | [`error-use`](./skills/error-use.md)                   |
| Crear hooks personalizados | [`hook-creation`](./skills/hook-creation.md)           |
| Trabajar con mapas/Leaflet | `leaflet`                                              |
| Crear modales              | [`modal-use`](./skills/modal-use.md)                   |
| Mostrar notificaciones     | [`notificacion-use`](./skills/notificacion-use.md)     |
| Crear documentación        | [`docs-creation`](./skills/docs-creation.md)           |
| Crear/usar iconos SVG      | [`icon-creation`](./skills/icon-creation.md)           |
| Trabajar con paneles       | [`panel-use`](./skills/panel-use.md)                   |

## Skills Disponibles

### Skills Genéricas (Best Practices)

| Skill        | Descripción                                       | URL      |
| ------------ | ------------------------------------------------- | -------- |
| `typescript` | Tipado estricto, interfaces planas, utility types | SKILL.md |
| `react`      | Server Components, hooks modernos                 | SKILL.md |
| `nextjs`     | App Router, Server Actions, streaming             | SKILL.md |
| `tailwind`   | Utility-first, cn() utility                       | SKILL.md |
| `motion`     | Animaciones fluidas con Framer Motion             | SKILL.md |
| `leaflet`    | Mapas interactivos con React Leaflet              | SKILL.md |

### Skills Específicas de Basket Places

| Skill                | Descripción                               | URL                                        |
| -------------------- | ----------------------------------------- | ------------------------------------------ |
| `git-workflow`       | Ramas, commits, merges, PRs               | [SKILL.md](./skills/git-workflow.md)       |
| `ui-creation`        | Componentes base, estilos, patrones UI    | [SKILL.md](./skills/ui-creation.md)        |
| `hook-creation`      | Patrones para hooks personalizados        | [SKILL.md](./skills/hook-creation.md)      |
| `icon-creation`      | Creación y uso de iconos SVG              | [SKILL.md](./skills/icon-creation.md)      |
| `animation-creation` | Principios de animación con Framer Motion | [SKILL.md](./skills/animation-creation.md) |
| `notificacion-use`   | Sistema Sonner para notificaciones        | [SKILL.md](./skills/notificacion-use.md)   |
| `error-use`          | Manejo de errores y mensajes              | [SKILL.md](./skills/error-use.md)          |
| `supabase-use`       | Estructura DB, buckets, clientes          | [SKILL.md](./skills/supabase-use.md)       |
| `panel-use`          | Panel deslizable de información           | [SKILL.md](./skills/panel-use.md)          |
| `modal-use`          | Sistema de modales y diálogos             | [SKILL.md](./skills/modal-use.md)          |
| `docs-creation`      | Creación de documentación                 | [SKILL.md](./skills/docs-creation.md)      |

## Componentes/Dominios principales

Cada dominio funcional tiene su propio `AGENTS.md` con contexto específico. **Lee primero el AGENTS.md del dominio** antes de trabajar en él.

| Componente/Dominio | Ubicación                     | Descripción                                                   |
| ------------------ | ----------------------------- | ------------------------------------------------------------- |
| Mapas              | `app/(main)/map/`             | React Leaflet, marcadores, geolocalización                    |
| Autenticación      | `app/(auth)/`                 | Flujo OTP, middleware, sesiones                               |
| Comunidades        | `app/(main)/comunidad/`       | Gestión de comunidades/canchas, reviews                       |
| Contribuir         | `app/(main)/comunidad/contribuir/` | Wizard de creación y edición de comunidades              |
| Reviews            | `app/(main)/comunidad/reviews/` | Sistema de reseñas y ratings                              |
| Panel              | `app/(main)/@panel/`          | Interception routes para mostrar páginas sobre el mapa (home) |
| Perfil             | `app/(main)/perfil/`          | Gestión de información del usuario logueado                   |
| Menú Global        | `app/(shared)/GlobalMenu/`    | Arquitectura y funcionamiento del menú global                 |
| Modal              | `app/components/ui/Modal`     | Sistema para mostrar información o componentes en modal       |
| Notificaciones     | `app/(shared)/notifications/` | Servicio de notificaciones construido sobre Sonner            |
| Error Handling     | `lib/errors/`                 | Servicio de error handling                                    |
| AI Integration     | `lib/services/ai/`            | Arquitectura de integración con AI                            |
| Supabase/DB        | `lib/supabase/`               | Clientes, schema de DB, storage, RLS                         |

> **Nota**: Si trabajas en un dominio específico, lee primero su `AGENTS.md` local antes de este archivo general.