---
name: ui-creation
description: Crear componentes UI consistentes con el design system de Basket Places. Usar cuando se creen/editen componentes o cuando se estilicen elementos visuales.
version: 1.0.0
---

# UI Creation - Basket Places

Skill para crear componentes UI consistentes con el design system del proyecto.

## Instructions

### 1. Estructura de Componentes

**Ubicación según tipo:**

| Tipo                             | Ubicación               | Ejemplo                  |
| -------------------------------- | ----------------------- | ------------------------ |
| Componente global reusable       | `app/components/ui/`    | Button, Input, Modal     |
| Componente específico de dominio | `app/(main)/{dominio}/` | MapMarker, CommunityCard |

### 2. Convenciones Obligatorias

**Props e Interfaces:**

- Todos los componentes con props deben tener `interface Props`
- Exportar el componente como `export function ComponentName()` (no default export)
- Usar `React.FC` solo cuando sea necesario para tipado complejo

**Verificación previa:**

- [ ] Verificar que no exista un componente similar en `app/components/ui/`
- [ ] Revisar si se puede extender un componente existente
- [ ] Confirmar que no hay duplicados de funcionalidad

**Ediciones:**

- Solo modificar lo solicitado
- No refactorizar código no relacionado
- Mantener consistencia con el archivo original

### 3. Sistema de Estilos

**Variables CSS → Clases Tailwind:**

Las variables de `global.css` se usan como clases utilitarias:

```css
/* global.css define: */
--color-accent-primary: #3b82f6;
```

```tsx
// ❌ Incorrecto
<input className="bg-[--color-accent-primary]" />

// ✅ Correcto
<input className="bg-accent-primary" />
```

**Colores disponibles:**

| Variable                 | Clase Tailwind                             | Uso                  |
| ------------------------ | ------------------------------------------ | -------------------- |
| `--color-accent-primary` | `bg-accent-primary`, `text-accent-primary` | Acciones principales |
| `--color-bg-primary`     | `bg-bg-primary`                            | Fondo principal      |
| `--color-text-primary`   | `text-text-primary`                        | Texto principal      |
| `--text-sm`              | `text-sm`                                  | Tamaño texto pequeño |
| `--width-lg`             | `w-lg`                                     | Ancho large          |

> **Nota**: Para ver todas las variables disponibles, consultar `global.css` o usar la skill `tailwind`.

### 4. Design System - Look & Feel

**Concepto visual:** Futuristic sci-fi minimalista

**Inspiración:** Halo, Star Wars (interfaces holográficas limpias)

**Principios:**

- Paneles como superficies digitales
- Elementos como "hologramas"
- Estilo flat (no skeuomorfismo)
- Minimalismo y simplicidad
- Futurismo sin saturación

### 5. Decoraciones - CornerIcon

Usar `CornerIcon` para añadir esquinas decorativas a paneles y contenedores importantes:

```tsx
import CornerIcon from '@/app/components/ui/svgs/CornerIcon';

<div className="relative p-4">
  {/* Esquinas decorativas */}
  <CornerIcon position="top-left" size="medium" />
  <CornerIcon position="top-right" size="medium" />
  <CornerIcon position="bottom-left" size="medium" />
  <CornerIcon position="bottom-right" size="medium" />

  {/* Contenido */}
  <p>Contenido del panel</p>
</div>;
```

**Variantes:**

| Prop       | Valores                                                | Uso                                                                                   |
| ---------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `position` | `top-left`, `top-right`, `bottom-left`, `bottom-right` | Ubicación de la esquina                                                               |
| `size`     | `small`, `medium`, `large`                             | Tamaño de la decoración                                                               |
| `variant`  | `static`, `interactive`                                | `static` = siempre visible, `interactive` = glow en hover (requiere `group` en padre) |

**Uso con variantes:**

```tsx
// Esquinas siempre visibles con glow
<div className="relative p-4">
  <CornerIcon position="top-left" size="small" variant="static" />
  <CornerIcon position="top-right" size="small" variant="static" />
</div>

// Esquinas que brillan en hover (interactive)
<div className="group relative p-4">
  <CornerIcon position="top-left" size="medium" variant="interactive" />
  <CornerIcon position="bottom-right" size="medium" variant="interactive" />
</div>
```

**Nota:** El contenedor padre debe tener `position: relative` y usualmente `p-4` o similar para que las esquinas no cubran el contenido.

### 6. Integración con Otras Skills

Cuando crees componentes UI, verifica si necesitas:

| Caso                          | Skill a invocar      |
| ----------------------------- | -------------------- |
| Animaciones de entrada/salida | `animation-creation` |
| Iconos SVG                    | `icon-creation`      |
| Manejo de estados globales    | `hook-creation`      |
| Notificaciones toast          | `notificacion-use`   |
| Modales/diálogos              | `modal-use`          |

## Example

**Input:**

```tsx
// app/components/ui/button.tsx
// Necesito un botón primario con icono
```

**Output:**

```tsx
// app/components/ui/button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function Button({ children, onClick, disabled, icon }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-accent-primary text-text-primary hover:bg-accent-primary/80 flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {icon && <span className="h-4 w-4">{icon}</span>}
      {children}
    </button>
  );
}
```

## Constraints

### ❌ NO hacer:

- Usar valores arbitrarios de Tailwind: `bg-[#ff0000]`, `w-[100px]`
- Crear componentes duplicados de funcionalidad existente
- Modificar `global.css` sin consenso del equipo
- Usar `!important` en clases
- Mezclar `className` condicional con template strings complejos
- Hardcodear colores hexadecimales en componentes

### ⚠️ Cuidado con:

- Props excesivas (>7 props considerar composición)
- Componentes demasiado grandes (>150 líneas dividir)
- Anidación profunda de divs (máximo 3-4 niveles)

## References

- `app/components/ui/` - Componentes base disponibles
- `global.css` - Variables CSS y configuración Tailwind
- `tailwind.config.ts` - Configuración de theme extendido
