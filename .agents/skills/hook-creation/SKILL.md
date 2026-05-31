---
name: hook-creation
description: Crear hooks personalizados en Basket Places. Usar para encapsular lógica reutilizable.
version: 1.0.0
---

# Hook Creation - Basket Places

Guía rápida para crear hooks. **Los archivos en `lib/hooks/` contienen ejemplos completos** - leerlos para entender los patrones.

## Convenciones

| Aspecto | Convención | Ejemplo |
|---------|------------|---------|
| Ubicación | `lib/hooks/` | `lib/hooks/useAuth.ts` |
| Nombre | `use[Nombre].ts` | `useDebounce.ts` |
| Export | Named export | `export function useDebounce()` |

## 'use client'

Añadir cuando el hook use:
- `useRouter`, `usePathname` de Next.js
- `useTheme` de next-themes
- APIs del navegador (localStorage, window, etc.)

```tsx
'use client';

export function useCustomHook() {
  // ...
}
```

## Estructura Básica

```tsx
// lib/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

/**
 * Hook que retrasa la actualización de un valor.
 * @param value - Valor a debouncear
 * @param delay - Tiempo en ms
 * @returns Valor debounced
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

## Patrones de Retorno

**Objeto (múltiples valores):**
```tsx
return { value, setValue, isLoading }; // Común y extensible
```

**Tupla (valor + setter):**
```tsx
return [value, toggle]; // Cuando es simple tipo useState
```

## Integración con Zustand

```tsx
import { useNavigationStore } from '@/lib/stores/useNavigationStore';

export function useNavigation() {
  const { isNavigating, setIsNavigating } = useNavigationStore();
  // ...
  return { navigate, isNavigating };
}
```

## Reglas de React Hooks

- ✅ Solo en nivel superior de componentes o hooks
- ✅ Solo en otros hooks personalizados
- ❌ NUNCA en loops, condiciones o funciones anidadas

**eslint-disable (solo cuando sea necesario):**
```tsx
useEffect(() => {
  // ...
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [pathname]); // Explicar por qué se omite
```

## Qué NO hacer

- ❌ Llamar hooks condicionalmente: `if (x) useHook()`
- ❌ Llamar hooks en loops: `items.map(() => useHook())`
- ❌ Exportar default: `export default function useHook`
- ❌ Hooks que solo envuelven useState sin lógica
- ❌ Retornar objetos con >5 propiedades (separar)

## Referencias

- `lib/hooks/` - Hooks existentes
- `lib/stores/` - Stores de Zustand
- React Docs: [Rules of Hooks](https://react.dev/reference/rules)
