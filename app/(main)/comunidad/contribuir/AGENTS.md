# Dominio: Contribuir (Wizard de Creación/Edición de Comunidades)

## Contexto

Sistema de formulario multi-paso (wizard) para crear o editar comunidades/canchas de basketball. Es la forma principal de contribución de contenido nuevo en la plataforma.

## Stack Tecnológico

- **Zustand**: Estado del formulario (`useContributionStore`, `useNavigationStore`)
- **Next.js**: Server Actions para persistencia
- **React Leaflet**: Selector de ubicación en mapa
- **AI (Gemini)**: Análisis de imágenes
- **Zod**: Validación de schemas
- **Supabase Storage**: Almacenamiento de imágenes

## Estructura

```
app/(main)/comunidad/contribuir/
├── page.tsx                      # Página de creación
├── editar/[id]/page.tsx          # Página de edición
├── hooks/
│   └── useContributionForm.ts   # Hook principal del wizard
├── stores/
│   ├── useContributionStore.ts   # Estado del formulario
│   └── useNavigationStore.ts     # Navegación entre steps
├── components/
│   └── ContributionForm/
│       ├── index.tsx             # Componente principal del form
│       ├── components/
│       │   ├── StepIndicator.tsx  # Indicador de progreso
│       │   ├── NavigationControls.tsx # Botones prev/next
│       │   ├── StepRenderer.tsx  # Renderiza el step activo
│       │   └── steps/            # Los 10 steps del wizard
│       └── hooks/
├── schemas/
│   ├── baseSchema.ts             # Schema base compartido
│   ├── registerCommunitySchema.ts # Validación para crear
│   └── updateCommunitySchema.ts   # Validación para editar
├── services/
│   ├── createCommunity.ts        # Lógica de creación
│   ├── modifyCommunity.ts         # Lógica de edición
│   ├── uploadCommunityImages.ts  # Upload a Storage
│   └── analyzeCommunity/          # AI para validar imágenes
├── action/
│   ├── registerCommunity.ts      # Server Action crear
│   └── updateCommunity.ts        # Server Action editar
├── transformers.ts                # Transformación de datos
└── utils/
    └── [utilities]
```

---

## Los 10 Steps del Wizard

El formulario tiene 10 steps que se muestran condicionalmente según el tipo de comunidad (`pickup` vs `club`):

| # | Step | Pickup | Club | Descripción |
|---|------|--------|------|-------------|
| 1 | `OnboardingStep` | ✅ | ✅ | Bienvenida/intro (actualmente placeholder) |
| 2 | `TypeStep` | ✅ | ✅ | Selector pickup vs club |
| 3 | `BasicInfoStep` | ✅ | ✅ | Nombre y descripción |
| 4 | `LocationStep` | ✅ | ✅ | Mapa con marcador draggable |
| 5 | `ImagesStep` | ✅ | ✅ | Upload de 2-4 imágenes horizontales |
| 6 | `ScheduleStep` | ✅ | ✅ | Constructor de horarios |
| 7 | `ServicesStep` | ✅ | ✅ | Toggle: transporte, tienda, wifi, baño |
| 8 | `ConditionalStep` | ✅ | ❌ | AgeGroup para pickups (NULL para clubs) |
| 9 | `AIAnalysisStep` | ✅ | ✅ | Análisis AI de imágenes (placeholder) |
| 10 | `RedirectionStep` | ✅ | ✅ | Éxito y redirección |

### Step 1: OnboardingStep

```tsx
// Placeholder actual - sin implementación real
export default function OnboartingStep() {
  return <div>onboarginStep</div>;
}
```

### Step 2: TypeStep

```tsx
// Selección entre pickup (retas) y club
const options = [
  { value: 'pickup' as CommunityType, label: 'Reta', Icon: RetasIcon },
  { value: 'club' as CommunityType, label: 'Club', Icon: ClubIcon },
];
```

**Campos**: `type` (CommunityType)

### Step 3: BasicInfoStep

```tsx
// Campos de texto libre
<Input placeholder="Nombre de la cancha" value={name} />
<Textarea placeholder="Descripción..." maxLength={500} value={description} />
```

**Campos**: `name` (string, máx 100), `description` (string, máx 500)

### Step 4: LocationStep

```tsx
// Mapa con marcador draggable
<BaseMap center={[lat, lng]} zoom={11}>
  <BaseDraggableMarker initialPosition={coords} onDragEnd={handler} />
</BaseMap>
```

**Campos**: `location` ({ lat, lng }) - Se guarda cuando el usuario deja de arrastrar (debounce 750ms)

**Ubicación por defecto**: `{ lat: 20.9674, lng: -89.5926 }` (Yucatán, México)

### Step 5: ImagesStep

```tsx
// Upload de imágenes horizontales (2-4)
const MAX_IMAGES = 4;
const MIN_IMAGES = 2;

// Validación: solo imágenes horizontales (width > height)
// Si son verticales → error toast "La imagen debe ser horizontal"
```

**Campos**: `images` (File[] | string[]) - Puede tener URLs existentes (en edición)

**Validaciones**:
- Mínimo 2 imágenes
- Máximo 4 imágenes
- Solo horizontales
- Límite 2MB por imagen (compresión automática en submit)

### Step 6: ScheduleStep

```tsx
// Constructor de horarios con días y franjas horarias
<ScheduleConstructor />      // Vista de construcción
<ScheduleItem data={item} /> // Vista de visualización/edit
```

**Estructura del schedule**:
```typescript
interface Schedule {
  days: string[];        // ['monday', 'wednesday', 'friday']
  time: {
    start: string;       // '18:00'
    end: string;         // '20:00'
  };
}
```

**Campo**: `schedule` (Schedule[])

### Step 7: ServicesStep

```tsx
// Toggles para servicios disponibles
const serviceLabels = {
  transport: 'Transporte',
  store: 'Tienda',
  wifi: 'Internet',
  bathroom: 'Baño',
};
```

**Campo**: `services` ({ transport: boolean, store: boolean, wifi: boolean, bathroom: boolean })

### Step 8: ConditionalStep (Solo Pickup)

```tsx
// Solo se muestra si type === 'pickup'
// Para clubs este step se salta
```

**Campo**: `age_group` (AgeGroup) - `'teens' | 'young_adults' | 'veterans' | 'mixed'`

**Regla de negocio**: Si `type = 'club'`, `age_group` debe ser NULL

### Step 9: AIAnalysisStep

```tsx
// Placeholder - aún no implementado
export default function AnalysisStep() {
  return <div>AnalysisStep</div>;
}
```

### Step 10: RedirectionStep

```tsx
// Muestra icono de éxito y redirige automáticamente
<SuccessIcon />
// navigate(`/comunidad/ver/${result.data.id}`);
```

---

## hooks/useContributionForm

Hook principal que maneja el flujo completo:

```typescript
const {
  isLoading,      // Estado de carga durante submit
  isSuccess,      // true después de éxito
  currentStep,    // Step actual para indicadores
  handleSubmit,   // Handler del formulario
  nextStep,       // Avanzar al siguiente step
  prevStep,       // Retroceder
} = useContributionForm({ initialData? });
```

### Flujo de Submit

```typescript
async function handleSubmit(e: React.FormEvent) {
  // 1. Obtener datos del store
  const formData = getFormData();

  // 2. Comprimir imágenes (obligatorio - límite 2MB de Next.js)
  const fileImages = formData.images.filter(img => img instanceof File);
  const compressedImages = await Promise.all(fileImages.map(compressImage));

  // 3. Llamar Server Action (register o update según presencia de id)
  const result = formData.id
    ? await updateCommunity(formData)
    : await registerCommunity(formData);

  // 4. Manejar resultado
  if (!result.success) {
    showErrorToast(result.error.message);
    return;
  }

  // 5. Actualizar stores
  addCommunity(result.data);

  // 6. Notificar y navegar
  showSuccessToast('Comunidad registrada con éxito');
  navigate(`/comunidad/ver/${result.data.id}`);
}
```

---

## Stores de Estado

### useContributionStore

```typescript
interface CommunityFormData {
  id: string | null;           // null = crear, string = editar
  type: CommunityType | null;
  name: string;
  description: string;
  location: Coordinates | null;
  images: (File | string)[];  // File = nuevo, string = URL existente
  floor_type: FloorType | null;
  is_covered: boolean;
  schedule: Schedule[];
  services: Service;
  age_group: AgeGroup | null;   // Solo para pickup
  categories: Category[] | null; // Solo para club
}
```

### useNavigationStore

```typescript
// Controla qué step se muestra
const { currentStep, nextStep, prevStep, resetToStart } = useNavigationStore();

// Steps del wizard (10 pasos)
const STEPS = [
  'onboarding',
  'type',
  'basicInfo',
  'location',
  'images',
  'schedule',
  'services',
  'conditional',  // Solo pickup
  'aiAnalysis',
  'redirection',
];
```

---

## Server Actions

### registerCommunity.ts

```typescript
'use server';

export async function registerCommunity(
  formData: FormData | CommunityFormData
): Promise<Result<{ id: string; name: string }>> {
  // 1. Validar con Zod (validateOrThrow)
  // 2. Auth (verificar usuario)
  // 3. Transformar location a formato PostGIS WKT
  // 4. Geocodificar dirección desde coordenadas
  // 5. Upload imágenes a Supabase Storage
  // 6. Insertar en DB
  // 7. Retornar ok() o fail()
}
```

### updateCommunity.ts

```typescript
'use server';

export async function updateCommunity(
  formData: FormData | CommunityFormData
): Promise<Result<{ id: string; name: string }>> {
  // Mismo flujo pero con UPDATE en lugar de INSERT
  // Verificar que el usuario es el dueño
}
```

---

## Validación con Zod

### registerCommunitySchema

```typescript
const registerCommunitySchema = z.object({
  type: z.enum(['pickup', 'club']),
  name: z.string().min(1).max(100),
  description: z.string().max(500),
  location: z.object({ lat: z.number(), lng: z.number() }),
  images: z.array(z.string()).min(2).max(4),
  floor_type: z.enum(['cement', 'parquet', 'asphalt', 'synthetic']),
  is_covered: z.boolean(),
  schedule: z.array(scheduleSchema),
  services: servicesSchema,
  age_group: z.enum(['teens', 'young_adults', 'veterans', 'mixed']).nullable(),
  categories: z.array(categorySchema).nullable(),
}).superRefine((data, ctx) => {
  // Regla: pickup requiere age_group, club requiere categories
  if (data.type === 'pickup' && !data.age_group) {
    ctx.addIssue({ code: 'custom', message: 'age_group requerido para pickup' });
  }
  if (data.type === 'club' && !data.categories) {
    ctx.addIssue({ code: 'custom', message: 'categories requerido para club' });
  }
});
```

---

## Servicios

### createCommunity.ts

```typescript
// Lógica de negocio para crear comunidad
export async function createCommunity(data: CommunityInsertData): Promise<Community> {
  // 1. Generar ID con UUID
  // 2. Transformar location a PostGIS POINT
  // 3. Geocodificar coordenadas → city, state, country
  // 4. Upload imágenes → URLs públicas
  // 5. Insert en Supabase
  // 6. Retornar comunidad creada
}
```

### uploadCommunityImages.ts

```typescript
// Upload imágenes a Supabase Storage
// Bucket: 'community-images'
// Path: `community-${id}/${filename}`

export async function uploadCommunityImages(
  files: File[],
  communityId: string
): Promise<string[]> {
  // Comprime, sube y retorna URLs
}
```

---

## Patrones Importantes

### 1. Edición vs Creación

```typescript
// useContributionForm detecta modo automáticamente
const result = formData.id
  ? await updateCommunity(formData)  // Edición
  : await registerCommunity(formData); // Creación

// En Component:
initialData && setFormData(initialData); // Pre-populate para edición
```

### 2. Cleanup al Desmontar

```typescript
useEffect(() => {
  return () => {
    reset();        // Limpia store del formulario
    resetToStart(); // Resetea navegación al step 1
  };
}, [reset, resetToStart]);
```

### 3. Imágenes: File vs String

```typescript
// En el store:
images: (File | string)[];

// File = imagen nueva seleccionada por el usuario
// string = URL de imagen ya subida (en modo edición)

// Filtrar para compresión:
const fileImages = formData.images.filter((img): img is File => img instanceof File);

// Filtrar para upload:
const urlImages = formData.images.filter((img): img is string => typeof img === 'string');
```

### 4. ConditionalStep (Solo Pickup)

El step 8 (`ConditionalStep`) solo se renderiza si `type === 'pickup'`. En `StepRenderer.tsx`:

```typescript
// pseudocódigo
const showConditional = type === 'pickup';
// Solo incluir en steps si showConditional
```

### 5. Redirección Automática

```typescript
// En useContributionForm, después de éxito:
navigate(`/comunidad/ver/${result.data.id}`);
```

---

## Data Flow Completo

```
1. Usuario llena wizard
        ↓
2. useContributionForm.handleSubmit()
        ↓
3. compressImage() → comprime cada File
        ↓
4. registerCommunity() / updateCommunity() Server Action
        ↓
5. validateOrThrow(schema, data)
        ↓
6. Geocodificación reversa (coords → city/state/country)
        ↓
7. uploadCommunityImages() → Supabase Storage
        ↓
8. createCommunity() / modifyCommunity() → Supabase DB
        ↓
9. addCommunity() → useCommunitiesProfileStore
        ↓
10. showSuccessToast() + navigate()
```

---

## Reglas Específicas

1. **SIEMPRE usar `validateOrThrow`** para validar antes de enviar a la DB
2. **SIEMPRE comprimir imágenes** antes de subir (límite 2MB de Next.js/Vercel)
3. **Validación horizontal**: ImagesStep rechaza imágenes verticales
4. **Geocodificación**: LocationStep guarda coordenadas, pero antes de insertar se obtiene city/state/country
5. **Edición**: Si `id` existe en formData, usar `updateCommunity` en lugar de `registerCommunity`
6. **Cleanup**: Los stores deben resetearse al desmontar el formulario
7. **Redirección**: Después de éxito, navegar a la página de detalle de la comunidad creada

---

## Errores Comunes

❌ **No comprimir imágenes antes de subir** → Falla por límite de 2MB en Vercel

❌ **No validar tipo al mostrar ConditionalStep** → Error si club recibe age_group

❌ **Olvidar cleanup del store** → Datos fantasma en siguientes visitas

❌ **No filtrar File vs String** → Fallos al comprimir URLs

---

## Auto-invoke Skills

| Acción | Skill |
|--------|-------|
| Validación de formularios | `error-use` (Zod) |
| Upload de imágenes | `supabase-use` (storage) |
| Geocodificación | `leaflet` |
| Mapas interactivos | `leaflet` |
| Animaciones del wizard | `animation-creation` |
| Notificaciones | `notificacion-use` |

---

## Referencias

- `hooks/useContributionForm.ts` - Hook principal
- `stores/useContributionStore.ts` - Estado del formulario
- `stores/useNavigationStore.ts` - Navegación entre steps
- `components/ContributionForm/components/steps/` - Todos los steps
- `schemas/registerCommunitySchema.ts` - Validación creación
- `schemas/updateCommunitySchema.ts` - Validación edición
- `services/createCommunity.ts` - Lógica de creación
- `services/uploadCommunityImages.ts` - Upload de imágenes