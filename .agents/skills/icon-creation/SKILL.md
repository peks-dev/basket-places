---
name: icon-creation
description: Crear iconos SVG personalizados para Basket Places. Usar cuando se necesiten nuevos iconos o modificar los existentes.
version: 1.0.0
---

# Icon Creation - Basket Places

Guía para crear iconos SVG consistentes con el design system del proyecto.

## Filosofía

Los iconos en Basket Places son:
- **Funcionales**: Cada icono comunica una idea clara
- **Minimalistas**: Líneas simples, formas geométricas básicas
- **Coloreables**: Usan `currentColor` para integrarse con el sistema de colores CSS
- **Futuristas**: Consistent con el estilo sci-fi del proyecto

## Ubicación

```
app/components/ui/svgs/
├── [IconName].tsx    # Un archivo por icono
└── index.ts          # Exports agrupados
```

## Estructura de un Icono

```tsx
// Pattern básico de icono
export default function IconName() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 [ancho] [alto]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="[path data]"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
```

## Reglas de Construcción

### 1. ViewBox

- Usar viewBox que refleje las proporciones reales del icono
- Mantener consistencia con iconos del mismo tipo (24x24, 48x48, etc.)

### 2. currentColor

**SIEMPRE usar `currentColor`** en el atributo `fill` del path:

```tsx
// ✅ Correcto
<path d="..." fill="currentColor" />

// ❌ Incorrecto
<path d="..." fill="#3b82f6" />
```

Esto permite colorear el icono con CSS (ej: `text-accent-primary`).

### 3. Path Data

- Usar rutas simples y optimizadas
- Mantener formas geométricas básicas (rectángulos, triángulos, círculos)
- Los paths deben estar cerrados para fill correcto

### 4. Dimensiones

```tsx
// Iconos pequeños (menú, acciones)
viewBox="0 0 24 24"    // Típicamente 24x24

// Iconos medianos (labels, badges)
viewBox="0 0 48 48"    // Típicamente 48x48

// Iconos grandes (decorativos, éxito)
viewBox="0 0 120 120"   // Típicamente 120x120
```

## Props Comunes

Si el icono necesita configuración (como `CornerIcon`):

```tsx
interface IconProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'static' | 'interactive';
  className?: string;
}

// Props con默认值 para mantener consistencia
const defaultProps = {
  size: 'medium',
  variant: 'static' as const,
};
```

## Patrones Reutilizables

### CornerIcon (Decoración)

Ubicación: `CornerIcon.tsx` - Esquina decorativa para paneles.

```tsx
interface CornerProps {
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  size: 'small' | 'medium' | 'large';
  variant?: 'static' | 'interactive';
  className?: string;
}

// Rotaciones según posición
const rotations = {
  'top-left': 0,
  'top-right': 90,
  'bottom-left': -90,
  'bottom-right': 180,
};
```

### SuccessIcon (Icono grande)

Para iconos de estado éxito, usar 120x120 viewBox con forma de checkmark:

```tsx
// Ver SuccessIcon.tsx para ejemplo completo
export default function SuccessIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none">
      <g>
        {/* Paths para el icono */}
      </g>
    </svg>
  );
}
```

### Iconos de Servicio (Bathroom, Wifi, etc.)

Para iconos booleanos (servicios disponibles):

```tsx
// Props simples, sin configuraciones complejas
export default function ServiceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      {/* Simple path */}
    </svg>
  );
}
```

## Estilos CSS en Iconos

### Efecto Glow (Para iconos decorativos)

```tsx
// En variant 'interactive' de CornerIcon
'[filter:drop-shadow(0_0_2px_currentColor)_drop-shadow(0_0_4px_currentColor)]'

// Se activa con hover del grupo padre
group-hover:[filter:drop-shadow(0_0_2px_currentColor)_drop-shadow(0_0_4px_currentColor)]
```

### Transiciones

Para iconos con efecto hover/interactive:

```tsx
className="transition-all duration-300 ease-in-out"
```

## Crear un Nuevo Icono

### Pasos

1. **Crear archivo** en `app/components/ui/svgs/[IconName].tsx`
2. **Definir SVG** con viewBox apropiado
3. **Usar `currentColor`** en fill
4. **Export default**
5. **Agregar al index.ts**

### Ejemplo: Crear `BasketballIcon`

```tsx
// app/components/ui/svgs/BasketballIcon.tsx
export default function BasketballIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Círculo exterior */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Líneas del balón */}
      <path
        d="M12 2V22M2 12H22"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
```

## Validación de Iconos

Antes de crear un icono, verificar:

- [ ] ¿Ya existe un icono similar en `app/components/ui/svgs/`?
- [ ] ¿Se puede usar/combinar iconos existentes?
- [ ] ¿El viewBox es apropiado para el tamaño del icono?
- [ ] ¿Usa `currentColor` en lugar de colores hardcodeados?
- [ ] ¿El estilo es consistente con el proyecto (minimalista, futurista)?

## Anti-Patrones

❌ **Colores hardcodeados:**
```tsx
<path d="..." fill="#ff0000" />  // Mal
```

❌ **viewBox incorrecto:**
```tsx
viewBox="0 0 100 100"  // Para icono que debería ser 24x24
```

❌ **Formas complejas innecesarias:**
```tsx
// Demasiados paths, formas rebuscadas
// Mantener simple y reconocible
```

❌ **Sin export default:**
```tsx
export const IconName = ...  // Incorrecto para este proyecto
```

## Registro en index.ts

```tsx
// app/components/ui/svgs/index.ts
import BasketballIcon from './BasketballIcon';

// ... otros imports

export {
  // ... otros exports
  BasketballIcon,
};
```

## Auto-invoke Skills

| Caso | Skill |
|------|-------|
| Iconos decorativos con glow | `animation-creation` |
| Iconos en componentes UI | `ui-creation` |
| Integración con temas (dark/light) | `ui-creation` |

## Referencias

- `app/components/ui/svgs/` - Todos los iconos existentes
- `app/components/ui/svgs/CornerIcon.tsx` - Ejemplo de props configurables
- `app/components/ui/svgs/SuccessIcon.tsx` - Ejemplo de icono grande
- `app/components/ui/svgs/index.ts` - Exportación agrupada