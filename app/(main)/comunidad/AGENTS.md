# Dominio: Comunidades

## Contexto

Gestión de comunidades/canchas de basketball: creación, edición, visualización, reviews y búsqueda. Es el feature principal de la aplicación.

## Stack Tecnológico

- **Supabase**: Database (PostgreSQL + PostGIS)
- **Storage**: Imágenes de comunidades
- **AI**: Análisis de imágenes y comentarios (Gemini)
- **Zustand**: Estado local
- **Zod**: Validación de schemas

## Estructura

```
app/(main)/comunidad/
├── components/                    # Componentes de UI
│   ├── CardCommunity.tsx
│   ├── HeaderCommunity.tsx
│   ├── ContentCommunity.tsx
│   ├── DeleteCommunityBtn.tsx
│   ├── ProfileCommunities.tsx
│   ├── ShareButton.tsx
│   ├── OpenInMaps.tsx
│   ├── CommunitiesScrollList.tsx
│   ├── sections/                 # Secciones de detalle
│   │   ├── ViewSwitcher.tsx
│   │   ├── Details.tsx
│   │   ├── Description.tsx
│   │   ├── Location.tsx
│   │   ├── Schedule.tsx
│   │   └── SectionWrapper.tsx
│   └── CategoriesClubList/
├── contribuir/                   # Formulario de contribución
│   ├── page.tsx
│   ├── editar/[id]/page.tsx
│   ├── action/
│   │   ├── registerCommunity.ts
│   │   └── updateCommunity.ts
│   ├── components/
│   │   └── ContributionForm/
│   │       ├── index.tsx
│   │       ├── components/
│   │       │   ├── StepIndicator.tsx
│   │       │   ├── NavigationControls.tsx
│   │       │   ├── StepRenderer.tsx
│   │       │   └── steps/
│   │       │       ├── TypeStep.tsx
│   │       │       ├── BasicInfoStep.tsx
│   │       │       ├── LocationStep.tsx
│   │       │       ├── ImagesStep/
│   │       │       ├── ScheduleStep/
│   │       │       └── ...
│   │       └── hooks/
│   │           └── useContributionForm.ts
│   ├── schemas/
│   │   ├── baseSchema.ts
│   │   ├── registerCommunitySchema.ts
│   │   └── updateCommunitySchema.ts
│   └── services/
│       ├── createCommunity.ts
│       ├── modifyCommunity.ts
│       ├── uploadCommunityImages.ts
│       └── analyzeCommunity/
├── reviews/                      # Sistema de reviews
│   ├── components/
│   │   ├── ReviewsSection.tsx
│   │   ├── ReviewItem.tsx
│   │   └── ReviewForm.tsx
│   ├── actions/
│   │   ├── get-community-reviews.ts
│   │   ├── create-community-review.ts
│   │   └── remove-community-review.ts
│   ├── services/
│   │   └── analyzeComment/       # AI para análisis
│   └── schemas/
│       └── reviewSchema.ts
├── ver/[id]/page.tsx             # Página de detalle
├── action/                       # Server Actions
│   ├── get-communities-for-map.ts
│   ├── get-profile-communities.ts
│   └── delete-community.ts
├── dbQueries.ts                  # Database queries
├── types.ts                      # Tipos TypeScript
└── transformers.ts               # Transformación de datos
```

## Patrones Importantes

### Contribución (Wizard)

Formulario multi-paso para crear/editar comunidades:

1. **TypeStep**: Tipo de comunidad (club, retas)
2. **BasicInfoStep**: Nombre, descripción
3. **LocationStep**: Ubicación en mapa
4. **ImagesStep**: Subir imágenes
5. **ScheduleStep**: Horarios
6. **ServicesStep**: Servicios disponibles
7. **AIAnalysisStep**: Análisis con IA

```tsx
// Hook principal del formulario
const {
  currentStep,
  steps,
  formData,
  updateFormData,
  nextStep,
  prevStep,
  submit,
} = useContributionForm();
```

### Schemas de Validación

Usar Zod con `validateOrThrow`:

```tsx
import { validateOrThrow } from '@/lib/errors/zodHandler';

const validated = validateOrThrow(registerCommunitySchema, formData);
```

### Imágenes

Subir a través de servicio en `contribuir/services/uploadCommunityImages.ts`:

```tsx
const { url, path } = await uploadImage(
  file,
  'COMMUNITIES',
  `community-${id}/${filename}`
);
```

### Reviews

Análisis de sentimiento con AI:

```tsx
const analysis = await analyzeComment(comment);
// Retorna: { sentiment: 'positive' | 'negative' | 'neutral', confidence: number }
```

## Data Flow

1. **Server Actions** → Llaman a Supabase
2. **dbQueries.ts** → Queries raw/typed
3. **transformers.ts** → Transforman respuestas
4. **Stores (Zustand)** → Estado local
5. **Components** → UI

## Reglas Específicas

1. **Siempre usar** `validateOrThrow` para validar formularios
2. **Manejar errores** con `handleServiceError` en Server Actions
3. **Imágenes**: Usar servicio de storage, no subir directamente
4. **Reviews**: Verificar que usuario no haya reviewado antes
5. **Eliminar**: Confirmar con modal antes de action

## Auto-invoke Skills

| Acción                 | Skill                           |
| ---------------------- | ------------------------------- |
| Crear/editar comunidad | `ui-creation`, `supabase-use`   |
| Subir imágenes         | `supabase-use` (storage)        |
| Validar formularios    | `error-use` (Zod)               |
| Mostrar notificaciones | `notificacion-use`              |
| Análisis AI            | Ver `lib/services/ai/AGENTS.md` |
| Crear reviews          | `ui-creation`, `supabase-use`   |

## Referencias

- `contribuir/schemas/` - Validaciones Zod
- `contribuir/services/` - Lógica de negocio
- `dbQueries.ts` - Database queries
- `types.ts` - Tipos TypeScript
