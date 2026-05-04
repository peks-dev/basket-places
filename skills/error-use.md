---
name: error-use
description: Sistema de manejo de errores en Basket Places. Usar para manejar excepciones en Server Actions.
version: 1.0.0
---

# Error Use - Basket Places

Guía rápida para usar el sistema de errores. **Los archivos en `lib/errors/` contienen la implementación completa** - leerlos para entender los detalles.

## Conceptos Clave

**Flujo estándar:**
```
Lanzar Error personalizado → Catch en Server Action → handleServiceError() → Result<T>
```

**Estructura:**
- `codes.ts` - Constantes de códigos de error
- `handler.ts` - Convierte errores a `Result<T>`
- `zodHandler.ts` - Errores de validación con Zod
- `database.ts`, `storage.ts` - Errores específicos de dominio

## Reglas Fundamentales

### 1. Siempre usar handleServiceError en Server Actions

```tsx
'use server';

import { handleServiceError } from '@/lib/errors/handler';
import { ok } from '@/lib/types/result';

export async function myAction() {
  try {
    // ... operación
    return ok(data);
  } catch (error) {
    return handleServiceError(error); // SIEMPRE
  }
}
```

### 2. Lanzar errores específicos en el try

`handleServiceError` detecta automáticamente estos errores:

**Errores de validación (Zod):**
```tsx
import { validateOrThrow } from '@/lib/errors/zodHandler';

// En el try:
const validated = validateOrThrow(mySchema, data);
// Lanza ValidationError si falla → handleServiceError lo detecta
```

**Errores de base de datos:**
```tsx
import { DatabaseError, fromSupabaseError } from '@/lib/errors/database';

// En el try:
if (dbError) {
  throw fromSupabaseError(dbError, 'Mensaje user-friendly', ErrorCodes.QUERY_FAILED);
}
// DatabaseError → handleServiceError lo detecta
```

**Errores de storage (archivos):**
```tsx
import { validateImageType, validateFileSize } from '@/lib/errors/storage';

// En el try:
validateImageType(file);   // Lanza StorageError si falla
validateFileSize(file, 5); // Lanza StorageError si falla
// StorageError → handleServiceError lo detecta
```

**Errores personalizados:**
```tsx
import { DatabaseError } from '@/lib/errors/database';

// En el try:
throw new DatabaseError('No se pudo crear', ErrorCodes.DATABASE_ERROR);
// DatabaseError → handleServiceError lo detecta
```

## Cuándo usar cada error

| Situación | Lanzar con | Detecta handleServiceError |
|-----------|------------|---------------------------|
| Error de Supabase/DB | `fromSupabaseError()` o `new DatabaseError()` | ✅ DatabaseError |
| Validación de Zod | `validateOrThrow()` | ✅ ValidationError |
| Archivos/imágenes | `validateImageType()`, `validateFileSize()` | ✅ StorageError |
| IA/Análisis | `new AIError()`, `new ImageValidationError()` | ✅ AIError |
| Auth | `new AuthError()` | ✅ (si está en handler.ts) |
| Error genérico | `throw new Error('...')` | ✅ Genérico → INTERNAL_ERROR |

## Códigos HTTP vs Códigos de App

## Mensajes de Error

**Para usuarios (mensaje):**
- Breve y claro: "No se pudo guardar la comunidad"
- Sugerir acción: "Intenta nuevamente"
- ❌ No técnicos: "Error P0001"

**Para debugging (details):**
- Incluir en el campo `details` del error
- Información técnica para logs

## Integración con UI

**En el cliente:**

```tsx
import { showErrorToast } from '@/shared/notifications';

const result = await myAction();

if (!result.success) {
  showErrorToast('Error', result.error.message);
}
```

**Errores de campo específico:**

```tsx
if (result.error.field) {
  // Mostrar error en el campo correspondiente
  setFieldError(result.error.field, result.error.message);
}
```

## Crear un nuevo tipo de error

Si necesitas un error que no existe:

1. **Crear clase** en archivo correspondiente (ej: `lib/errors/myDomain.ts`)
2. **Agregar código** a `codes.ts`
3. **Agregar detección** en `handleServiceError` en `handler.ts`:

```tsx
// En handler.ts
import { MyNewError } from './myDomain';

export function handleServiceError(error: unknown): Failure {
  // ... errores existentes
  
  if (error instanceof MyNewError) {
    return fail(error.code, error.message, error.details);
  }
  
  // ...
}
```

## Qué NO hacer

- ❌ Lanzar `Error` genérico sin contexto (mensaje poco útil para usuarios)
- ❌ Exponer stack traces o SQL al usuario
- ❌ Olvidar `handleServiceError` en Server Actions
- ❌ Validar en cliente lo que debe validarse en servidor
- ❌ Usar try/catch sin handleServiceError en Server Actions

## Referencias

- `lib/errors/codes.ts` - Todos los códigos disponibles
- `lib/errors/handler.ts` - Cómo se convierten los errores (leer para entender el flujo)
- `lib/errors/*.ts` - Implementación de cada error
- `lib/types/result.ts` - Tipo Result<T>
