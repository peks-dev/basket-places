---
name: supabase-use
description: Usar Supabase en Basket Places. Clientes, storage y patrones para operaciones con DB.
version: 1.0.0
---

# Supabase Use - Basket Places

Guía rápida para usar Supabase. **Los archivos en `lib/supabase/` contienen la implementación completa** - leerlos para entender los detalles.

## Clientes

**Server Components / Server Actions:**
```tsx
import { createClient } from '@/lib/supabase/server';

const supabase = await createClient(); // Es async
const { data, error } = await supabase
  .from('tabla')
  .select('*');
```

**Client Components:**
```tsx
import { supabase } from '@/lib/supabase/client';

const { data, error } = await supabase
  .from('tabla')
  .select('*');
```

## Storage (Imágenes)

```tsx
import { uploadImage, deleteImage } from '@/lib/supabase/storage';

// Subir
const { url, path } = await uploadImage(
  file,
  'COMMUNITIES', // o 'AVATARS'
  `comunidad-${id}/${fileName}`
);

// Eliminar
await deleteImage(path, 'COMMUNITIES');
```

**Buckets disponibles:**
- `AVATARS` - Fotos de perfil
- `COMMUNITIES` - Imágenes de comunidades

## Manejo de Errores

```tsx
import { fromSupabaseError } from '@/lib/errors/database';
import { ErrorCodes } from '@/lib/errors/codes';

const { data, error } = await supabase.from('tabla').select('*');

if (error) {
  throw fromSupabaseError(
    error,
    'Mensaje user-friendly',
    ErrorCodes.DATABASE_ERROR
  );
}
```

## Patrones Comunes

**Query simple:**
```tsx
const { data, error } = await supabase
  .from('communities')
  .select('*')
  .eq('id', communityId)
  .single();
```

**Query con joins:**
```tsx
const { data } = await supabase
  .from('communities')
  .select('*, reviews(*), amenities(*)')
  .eq('id', id);
```

**Insert:**
```tsx
const { data } = await supabase
  .from('communities')
  .insert(communityData)
  .select()
  .single();
```

**Update:**
```tsx
const { data } = await supabase
  .from('communities')
  .update(updateData)
  .eq('id', id)
  .select()
  .single();
```

**Delete:**
```tsx
await supabase
  .from('communities')
  .delete()
  .eq('id', id);
```

**RPC (Funciones PostgreSQL):**
```tsx
const { data } = await supabase.rpc('nombre_funcion', {
  param1: valor1,
  param2: valor2,
});
```

## Tipos

```tsx
import type { User, Session, Profile } from '@/lib/supabase/types';
```

## Qué NO hacer

- ❌ Usar cliente del browser en Server Actions
- ❌ Usar cliente del servidor en Client Components
- ❌ Ignorar errores de Supabase (siempre manejar)
- ❌ Hardcodear URLs de imágenes (usar `getPublicUrl`)
- ❌ Usar service role key en el frontend

## Referencias

- `lib/supabase/server.ts` - Cliente para servidor
- `lib/supabase/client.ts` - Cliente para browser
- `lib/supabase/storage.ts` - Helpers para imágenes
- `lib/supabase/types.ts` - Tipos TypeScript
- `lib/supabase/middleware.ts` - Auth middleware
