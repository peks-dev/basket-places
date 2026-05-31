# Dominio: Theme (Sistema de Temas)

## Contexto

Sistema de temas claro/oscuro construido sobre `next-themes`. Permite a los usuarios cambiar entre light, dark y system (sync con preferencia del OS). El tema se aplica via clase CSS en `<html>` (`class="dark"`).

## Stack Tecnológico

- **next-themes**: Librería de temas para Next.js con SSR support
- **Tailwind CSS**: Dark mode via `class` strategy (`darkMode: 'class'`)
- **CSS Variables**: Variables en `global.css` que cambian según el tema

## Estructura

```
app/components/theme/
├── ThemeProvider.tsx    # Provider wrapper de next-themes
└── ThemeToggle.tsx      # Botón toggle standalone

# Hooks relacionados:
lib/hooks/useAppTheme.ts                          # Hook genérico para leer tema actual
app/(shared)/GlobalMenu/hooks/useThemeControls.ts # Hook con toggle + sync para GlobalMenu
```

## ThemeProvider

Wrapper de `NextThemesProvider` configurado para Basket Places:

```tsx
import { ThemeProvider } from '@/components/theme/ThemeProvider';

// En layout.tsx (ya configurado):
<ThemeProvider>
  {children}
</ThemeProvider>
```

**Configuración:**

| Prop | Valor | Descripción |
|------|-------|-------------|
| `attribute` | `'class'` | Aplica `class="dark"` en `<html>` |
| `defaultTheme` | `'system'` | Por defecto sigue el OS |
| `enableSystem` | `true` | Permite modo system |
| `disableTransitionOnChange` | `true` | Evita flash de transición al cambiar |

**NO renderizar `<ThemeProvider>` manualmente** - Ya está en `app/layout.tsx`.

## Hooks

### useAppTheme (genérico)

Para leer el tema actual desde cualquier componente:

```tsx
import { useAppTheme } from '@/lib/hooks/useAppTheme';

const { mounted, isDark, currentTheme } = useAppTheme();
// mounted: boolean - true después de hidratación (evita mismatch SSR)
// isDark: boolean - true si tema oscuro activo
// currentTheme: 'light' | 'dark' - Tema resuelto
```

### useThemeControls (GlobalMenu)

Para toggle y sync con system, usado en el menú global:

```tsx
import { useThemeControls } from '@/app/(shared)/GlobalMenu/hooks/useThemeControls';

const { toggleTheme, syncWithSystem, isSystemSync, themeLabel } = useThemeControls();
// toggleTheme(): Alterna dark ↔ light
// syncWithSystem(): Cambia a modo 'system'
// isSystemSync: boolean - true si está en modo system
// themeLabel: string - Label para UI ("Claro", "Oscuro", "Sistema")
```

## ThemeToggle Component

Botón standalone para toggle (usado fuera del GlobalMenu):

```tsx
import { ThemeToggle } from '@/components/theme/ThemeToggle';

<ThemeToggle />
```

- Muestra icono de sol (dark mode activo) o luna (light mode activo)
- Incluye skeleton loader para evitar flash de hidratación
- Toggle simple: dark ↔ light (no cycle por system)

## Cómo funciona Dark Mode

1. `ThemeProvider` inyecta `class="dark"` en `<html>` cuando tema es oscuro
2. Tailwind usa `darkMode: 'class'` - las clases `dark:` se activan
3. Las CSS variables en `global.css` cambian según la presencia de `.dark`

**Patrón para estilos con tema:**

```tsx
// Usar clases dark: de Tailwind
<div className="bg-white dark:bg-gray-900">

// O usar CSS variables (ya cambian con el tema automáticamente)
<div className="bg-[var(--color-background)] text-[var(--color-foreground)]">
```

## Reglas Específicas

1. **SIEMPRE** verificar `mounted` antes de renderizar UI dependiente del tema (evita hydration mismatch)
2. **NO** usar `useTheme` de next-themes directamente - usar `useAppTheme` o `useThemeControls`
3. **NO** renderizar `<ThemeProvider>` en múltiples lugares - ya está en layout.tsx
4. **CSS Variables** son preferidas sobre clases `dark:` para colores del design system
5. **Preferir** CSS variables sobre `dark:` prefix para mantener consistencia con el design system

## Referencias

- `ThemeProvider.tsx` - Provider configurado
- `ThemeToggle.tsx` - Botón toggle standalone
- `lib/hooks/useAppTheme.ts` - Hook genérico de lectura
- `app/(shared)/GlobalMenu/hooks/useThemeControls.ts` - Hook con toggle
- `app/layout.tsx` - Donde se renderiza el provider
- [next-themes Docs](https://github.com/pacocoursey/next-themes)
