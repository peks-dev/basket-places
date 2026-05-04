# Dominio: Reviews (Sistema de Valoraciones)

## Contexto

Sistema de reviews/ratings para comunidades/canchas de basketball. Permite a usuarios autenticados dejar valoraciones (1-5 estrellas) con comentarios opcionales. Incluye análisis de IA para detectar contenido inapropiado.

## Stack Tecnológico

- **Supabase**: Database para reviews
- **AI (Gemini)**: Análisis de sentimiento y contenido inapropiado en comentarios
- **Zustand**: Estado local del formulario
- **Zod**: Validación de schemas

## Estructura

```
app/(main)/comunidad/reviews/
├── actions/
│   ├── create-community-review.ts   # Crear review
│   ├── get-community-reviews.ts     # Obtener reviews de una comunidad
│   ├── remove-community-review.ts   # Eliminar review propia
│   └── index.ts                     # Exports
├── components/
│   ├── ReviewForm.tsx               # Formulario para crear review
│   ├── ReviewItem.tsx               # Item individual de review
│   ├── ReviewsSection.tsx           # Sección que agrupa todos los reviews
│   └── SectionWrapper.tsx           # Wrapper visual
├── dbQueries.ts                     # Queries a Supabase
├── hooks/                           # (vacío o usar de lib)
├── schemas/
│   └── reviewSchema.ts              # Validación Zod
├── services/
│   ├── analyzeComment/              # AI para análisis de comentarios
│   │   ├── index.ts                 # analyzeUserComment()
│   │   ├── prompts.ts               # Prompts para IA
│   │   ├── types.ts                 # Tipos de análisis
│   │   └── validators.ts            # Validadores de respuesta IA
│   ├── check-existing-review.ts    # Verificar si usuario ya hizo review
│   ├── deleteUserReview.ts          # Eliminar review (con ownership check)
│   └── index.ts
├── stores/
│   └── useReviewStore.ts             # Estado del formulario
├── types.ts                         # Tipos TypeScript
└── AGENTS.md                        # Este archivo
```

---

## Entities

### Reviews Table

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | PK |
| community_id | UUID | FK a communities |
| user_id | UUID | FK a auth.users |
| rating | INTEGER (1-5) | Rating obligatorio |
| comment | TEXT (máx 500) | Comentario opcional |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |

**Constraint único**: `(community_id, user_id)` - Un usuario solo puede hacer una review por comunidad.

---

## Data Types

```typescript
// Tipos desde Supabase (con join a profiles)
interface ReviewDatabase {
  id: string;
  community_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  profiles: {
    name: string;
    avatar_url: string | null;
  };
}

// Datos del formulario
interface ReviewFormData {
  community_id: string;
  rating: number;
  comment: string;
}

// Datos para enviar a DB (con ID generado)
interface ReviewToSend extends ReviewFormData {
  id: string;
  user_id: string;
}

// Respuesta de análisis IA
interface CommentAnalysisResponse {
  isSafe: boolean;
  success: boolean;
  // otros campos del análisis
}
```

---

## Schema de Validación (Zod)

```typescript
// schemas/reviewSchema.ts
export const reviewForm = z.object({
  rating: z
    .number()
    .min(1, 'debes de seleccionar un puntaje')
    .max(5, 'no puede darle más de 5'),
  comment: z
    .string()
    .min(8, 'el comentario debe tener al menos 8 caracteres')
    .max(250, 'el comentario es muy largo'),
  community_id: z.string().min(10).max(36),
});
```

---

## Server Actions

### createCommunityReview

```typescript
// actions/create-community-review.ts
'use server';

export async function createCommunityReview(
  review: ReviewFormData
): Promise<Result<null>> {
  try {
    // 1. Auth - getCurrentUser()
    const user = await getCurrentUser();
    if (!user) return fail(AUTH_ERROR, 'Debes iniciar sesión');

    // 2. Validar con Zod (validateOrThrow)
    validateOrThrow(reviewForm, review);

    // 3. checkExistingReview() - Verificar que no existe review previa
    await checkExistingReview(user.id, review.community_id);

    // 4. analyzeUserComment() - IA valida contenido
    await analyzeUserComment(review.comment);

    // 5. Generar UUID e insertar en DB
    const dataToSend: ReviewToSend = {
      ...review,
      id: uuidv4(),
      user_id: user.id,
    };
    await insertCommunityReview(dataToSend);

    return ok(null);
  } catch (error) {
    return handleServiceError(error);
  }
}
```

**Flujo de errores posibles**:
- `AUTH_ERROR`: Usuario no logueado
- `VALIDATION_ERROR`: Datos inválidos
- `REVIEW_ALREADY_EXISTS`: Ya hizo review de esta comunidad
- `INAPPROPRIATE_CONTENT`: IA detectó contenido no apropiado
- `DATABASE_ERROR`: Error de Supabase

### getCommunityReviews

```typescript
// actions/get-community-reviews.ts
export async function getCommunityReviews(
  communityId: string
): Promise<Result<ReviewDatabase[]>> {
  try {
    const reviews = await fetchCommunityReviews(communityId);
    return ok(reviews);
  } catch (error) {
    return handleServiceError(error);
  }
}
```

### removeCommunityReview

```typescript
// actions/remove-community-review.ts
export async function removeCommunityReview(
  reviewId: string
): Promise<Result<null>> {
  try {
    // 1. Auth
    const user = await getCurrentUser();
    if (!user) return fail(AUTH_ERROR, 'Debes iniciar sesión');

    // 2. Fetch review y verificar existencia
    const review = await fetchReviewById(reviewId);
    if (!review) return fail(NOT_FOUND, 'Reseña no encontrada');

    // 3. deleteUserReview() - Verifica ownership internamente
    await deleteUserReview(review, user.id);

    return ok(null);
  } catch (error) {
    return handleServiceError(error);
  }
}
```

---

## AI Analysis: analyzeUserComment

```typescript
// services/analyzeComment/index.ts
export async function analyzeUserComment(
  commentText: string
): Promise<CommentAnalysisResponse> {
  // 1. Llama al textAnalyzer global con prompts específicos
  const result = await analyzeText<CommentAnalysisRaw, CommentAnalysisResult>(
    {
      prompt: COMMENT_ANALYSIS_PROMPT,
      texts: { comment: commentText },
    },
    parseJSONResponse,
    validateCommentAnalysis
  );

  // 2. Si no es seguro, lanza AIServiceError
  if (!result.isSafe) {
    throw new AIServiceError(
      ErrorCodes.INAPPROPRIATE_CONTENT,
      'Tu reseña tiene contenido inapropiado'
    );
  }

  return result;
}
```

**Flujo**:
- Envía el comentario a Gemini para análisis
- Parser extrae la respuesta JSON
- Validator valida estructura y valores
- Si `isSafe = false`, lanza error que el action convierte a `Result<null>` con mensaje de contenido inapropiado

---

## Componentes de UI

### ReviewForm

```tsx
// components/ReviewForm.tsx
export default function ReviewForm() {
  const { comment, setComment, setRating, reset } = useReviewFormStore();
  const ratingOptions = [
    { value: 1, label: '1 estrella' },
    // ...
  ];

  // Cleanup al desmontar
  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <form>
      <InputSelector options={ratingOptions} onChange={(v) => setRating(Number(v))} />
      <Textarea placeholder="Comparte anécdotas..." maxLength={250} />
    </form>
  );
}
```

### ReviewItem

```tsx
// components/ReviewItem.tsx
interface ReviewItemProps {
  data: ReviewDatabase;
  user: User | null;
  onDelete: (reviewId: string) => void;
}

// Uso de memo con custom comparison
export default memo(ReviewItem, (prevProps, nextProps) => {
  return (
    prevProps.data.id === nextProps.data.id &&
    prevProps.data.comment === nextProps.data.comment &&
    prevProps.data.profiles.name === nextProps.data.profiles.name &&
    prevProps.data.profiles.avatar_url === nextProps.data.profiles.avatar_url &&
    prevProps.user?.id === nextProps.user?.id
  );
});
```

### ReviewsSection

```tsx
// components/ReviewsSection.tsx
// Componente que:
1. Obtiene reviews con getCommunityReviews()
2. Obtiene usuario actual
3. Mapea ReviewItem para cada review
4. Incluye ReviewForm para crear nueva review
```

---

## Stores

### useReviewFormStore

```typescript
interface ReviewFormState {
  rating: number;
  comment: string;
  // Métodos
  setRating: (rating: number) => void;
  setComment: (comment: string) => void;
  reset: () => void;
}
```

---

## Data Flow Completo

### Crear Review

```
1. Usuario llena ReviewForm (rating + comment)
        ↓
2. ReviewsSection llama createCommunityReview(formData)
        ↓
3. Server Action: getCurrentUser() → fail si no auth
        ↓
4. validateOrThrow(reviewForm, data) → ValidationError si falla
        ↓
5. checkExistingReview(userId, communityId) → REVIEW_ALREADY_EXISTS si existe
        ↓
6. analyzeUserComment(comment) → INAPPROPRIATE_CONTENT si IA lo rechaza
        ↓
7. insertCommunityReview(dataToSend)
        ↓
8. ok(null) → ReviewsSection muestra toast de éxito
```

### Eliminar Review

```
1. Usuario hace click en delete de ReviewItem (solo si isOwner)
        ↓
2. ReviewsSection llama removeCommunityReview(reviewId)
        ↓
3. Server Action: getCurrentUser() → fail si no auth
        ↓
4. fetchReviewById(reviewId) → NOT_FOUND si no existe
        ↓
5. deleteUserReview(review, userId) → valida ownership, elimina
        ↓
6. ok(null) → ReviewsSection actualiza lista
```

---

## Reglas Específicas

1. **Un review por usuario por comunidad**: Constraint único en DB + check en service
2. **Solo dueño puede eliminar**: Verificado en `deleteUserReview()`
3. **Validación de contenido IA**: Todo comentario pasa por `analyzeUserComment()`
4. **Cleanup del store**: `reset()` se llama al desmontar ReviewForm
5. **Optimización de re-renders**: ReviewItem usa `memo` con comparación custom

---

## Errores Comunes

❌ **Intentar crear más de un review**: Devuelve `REVIEW_ALREADY_EXISTS`

❌ **评论包含不当内容**: Devuelve `INAPPROPRIATE_CONTENT` de IA

❌ **Eliminar review de otro usuario**: `deleteUserReview` lanza error de ownership

❌ **Enviar rating fuera de rango**: Zod validation falla

---

## Auto-invoke Skills

| Acción | Skill |
|--------|-------|
| Validación de formularios | `error-use` (Zod) |
| Análisis de texto con IA | `supabase-use` |
| Notificaciones toast | `notificacion-use` |
| Componentes UI | `ui-creation` |
| Modales de confirmación | `modal-use` |

---

## Referencias

- `actions/create-community-review.ts` - Crear review
- `actions/get-community-reviews.ts` - Obtener reviews
- `actions/remove-community-review.ts` - Eliminar review
- `services/analyzeComment/index.ts` - Análisis IA
- `schemas/reviewSchema.ts` - Validación
- `components/ReviewForm.tsx` - Formulario UI
- `components/ReviewItem.tsx` - Item individual
- `components/ReviewsSection.tsx` - Sección agrupadora