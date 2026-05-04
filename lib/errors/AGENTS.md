# Dominio: Error Handling

## Contexto

Sistema centralizado de manejo de errores. Convierte excepciones en respuestas tipadas `Result<T>` para manejo predecible en toda la aplicación.

## Stack Tecnológico

- **Clases personalizadas**: Errores específicos por dominio
- **ErrorCodes**: Constantes de códigos de error
- **Result<T>**: Tipo para respuestas exitosas/fallidas
- **Zod**: Validación que lanza ValidationError

## Estructura

```
lib/errors/
├── codes.ts                       # Códigos de error constantes
├── handler.ts                     # handleServiceError()
├── database.ts                    # DatabaseError
├── storage.ts                     # StorageError
├── zodHandler.ts                  # ValidationError + helpers Zod
└── index.ts                       # Exports

# Errores específicos de dominios:
app/(auth)/errors/
├── custom.ts                      # AuthError
├── codes.ts
├── messages.ts
└── index.ts

lib/services/ai/errors/
├── custom.ts                      # AIServiceError, ImageValidationError
├── codes.ts
└── index.ts
```

## Códigos de Error

Categorías principales en `codes.ts`:

| Categoría  | Código               | HTTP |
| ---------- | -------------------- | ---- |
| Validación | `VALIDATION_ERROR`   | 400  |
| Not Found  | `NOT_FOUND`          | 404  |
| Auth       | `FORBIDDEN`          | 403  |
| Database   | `DATABASE_ERROR`     | 500  |
| Storage    | `UPLOAD_FAILED`      | -    |
| AI         | `AI_ANALYSIS_FAILED` | -    |

## Uso en Server Actions

```tsx
'use server';

import { handleServiceError } from '@/lib/errors/handler';
import { ok } from '@/lib/types/result';

export async function myAction(data: FormData) {
  try {
    // Validar
    const validated = validateOrThrow(schema, data);

    // Operación
    const result = await db.operation(validated);

    return ok(result);
  } catch (error) {
    // SIEMPRE usar handleServiceError
    return handleServiceError(error);
  }
}
```

## Result<T>

Tipo para respuestas tipadas:

```tsx
import { Result, ok, fail } from '@/lib/types/result';

// Éxito
return ok(data);

// Error
return fail(ErrorCodes.NOT_FOUND, 'No encontrado');

// Uso
const result: Result<User> = await getUser();

if (!result.success) {
  console.error(result.error.message);
  return;
}

const user = result.data;
```

## Reglas Específicas

1. **SIEMPRE** usar `handleServiceError` para capturar y clasificar el error.
2. **NUNCA** lanzar `Error` genérico, usar clases específicas
3. **Mensajes de usuario**: Breves, claros, sin tecnicismos
4. **Detalles de debug**: En campo `details`, no en mensaje
5. **Errores de Zod**: Usar `validateOrThrow` o `fromZodError`



## Referencias

- `handler.ts` - handleServiceError
- `database.ts` - DatabaseError
- `storage.ts` - StorageError + helpers
- `zodHandler.ts` - ValidationError
- `codes.ts` - Todos los códigos
