# Dominio: Perfil

## Contexto

Gestión del perfil de usuario: información personal, avatar, comunidades creadas, y configuración de cuenta.

## Stack Tecnológico

- **Supabase**: Database y Storage (avatars)
- **AI**: Análisis de imágenes de perfil
- **Zustand**: Estado local
- **Zod**: Validación

## Estructura

```
app/(main)/perfil/
├── page.tsx                       # Página principal de perfil
├── components/
│   ├── ProfileBanner.tsx          # Banner con avatar y nombre
│   ├── UserAvatar.tsx             # Componente de avatar
│   ├── AvatarInput.tsx            # Input para cambiar avatar
│   ├── DefaultUserImage.tsx       # Avatar por defecto
│   ├── EditProfileBtn.tsx         # Botón editar
│   ├── EditProfileForm.tsx        # Formulario de edición
│   └── DropdownProfileOptions.tsx # Menú de opciones
├── actions/
│   └── updateProfile.ts           # Server Action
├── hooks/
│   └── useUpdateProfile.ts        # Hook de actualización
├── stores/
│   ├── useProfileStore.ts         # Estado del perfil
│   └── useCommunitiesProfileStore.ts # Comunidades del usuario
├── services/
│   ├── upload-avatar.ts           # Subir avatar a storage
│   └── analyzeProfileImage/       # AI para análisis
│       ├── index.ts
│       ├── validators.ts
│       ├── types.ts
│       └── prompts.ts
├── schemas/
│   └── updateProfileSchema.ts     # Validación Zod
├── types/
│   └── index.ts
├── transformers.ts                # Transformación de datos
├── dbQueries.ts                   # Database queries
└── utils/
    ├── compress-avatar.ts         # Compresión de imágenes
    └── extract-avatar-path.ts     # Extraer path de URL
```

## Patrones Importantes

### Actualización de Perfil

Flujo completo con compresión y análisis AI:

```tsx
const { updateProfile, isLoading } = useUpdateProfile();

await updateProfile({
  name: 'Nuevo Nombre',
  avatar: file, // File opcional
});
```

Pasos internos:

1. Validar con Zod
2. Comprimir imagen si es necesario
3. Análisis AI de imagen (si es nueva)
4. Subir a Supabase Storage
5. Actualizar perfil en DB
6. Actualizar estado local

### Avatar

```tsx
// Avatar con imagen
<UserAvatar url={user.avatar_url} size="large" />

// Avatar por defecto
<DefaultUserImage />

// Input para cambiar
<AvatarInput onChange={handleAvatarChange} />
```

### Análisis AI de Imagen

Validación automática de imágenes de perfil:

```tsx
import { analyzeProfileImage } from './services/analyzeProfileImage';

const result = await analyzeProfileImage(file);
// Retorna: { isValid, reason? }
```

Validaciones:

- Es una foto real de persona
- No contenido inapropiado
- Calidad suficiente

## Data Flow

1. **Usuario selecciona imagen** → `AvatarInput`
2. **Compresión** → `compressAvatar`
3. **Análisis AI** → `analyzeProfileImage`
4. **Upload** → `uploadImage` (storage)
5. **Update DB** → `updateProfile` (Server Action)
6. **Actualizar estado** → `useProfileStore`

## Reglas Específicas

1. **Siempre comprimir** avatares antes de subir
2. **Análisis AI** obligatorio para nuevas imágenes
3. **Validar** con Zod antes de enviar
4. **Manejar errores** de compresión y upload
5. **Actualizar estado** local después de éxito


## Referencias

- `services/upload-avatar.ts` - Upload logic
- `services/analyzeProfileImage/` - AI analysis
- `utils/compress-avatar.ts` - Image compression
- `schemas/updateProfileSchema.ts` - Validation
