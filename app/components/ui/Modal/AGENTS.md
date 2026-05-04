# Dominio: Modal

## Contexto

Sistema de modales para diálogos de confirmación e información. Implementado con Zustand para estado global, Framer Motion para animaciones, y React Portal para renderizar fuera del árbol de componentes.

## Stack Tecnológico

- **Zustand**: Estado global del modal
- **Framer Motion**: Animaciones de entrada/salida (escala, fade, scan line)
- **React Portal**: Renderizado en `document.body`
- **AnimatePresence**: Transiciones suaves al montar/desmontar

## Estructura

```
app/components/ui/Modal/
├── Modal.tsx          # Componente visual del modal
├── modalStore.ts      # Estado global (Zustand)
└── index.ts           # Exports públicos
```

## Patrones Importantes

### Uso Básico

```tsx
import { useModalStore } from '@/app/components/ui/Modal';

const { openModal, closeModal } = useModalStore();

// Abrir modal simple
openModal({
  title: '¿Confirmar acción?',
  content: 'Esta acción no se puede deshacer.',
  confirmButton: {
    text: 'Eliminar',
    variant: 'delete',
    onClick: async () => {
      await deleteItem();
    },
  },
});
```

### Configuración de openModal

| Prop               | Tipo                 | Requerido | Descripción                              |
| ------------------ | -------------------- | --------- | ---------------------------------------- |
| `title`            | string               | ✅        | Título del modal (mayúsculas automático) |
| `content`          | ReactNode            | ❌        | Contenido simple (texto o JSX)           |
| `ContentComponent` | ComponentType        | ❌        | Componente para contenido complejo       |
| `contentProps`     | object               | ❌        | Props para ContentComponent              |
| `confirmButton`    | object               | ❌        | Botón de acción                          |
| `size`             | 'sm' \| 'md' \| 'lg' | ❌        | Tamaño (default: 'md')                   |

### confirmButton

```tsx
{
  text: 'eliminar',              // Texto del botón
  variant: 'delete',             // 'delete' | 'primary' | 'secondary' | 'tertiary'
  onClick: async () => {         // Debe ser async
    await deleteItem();
    // Éxito → cierra automáticamente
    // Error → modal se mantiene abierto
  },
}
```

### Tamaños

| Tamaño | Ancho máximo | Uso                             |
| ------ | ------------ | ------------------------------- |
| `sm`   | ~320px       | Confirmaciones simples          |
| `md`   | ~480px       | Contenido estándar (default)    |
| `lg`   | ~640px       | Formularios, contenido complejo |

### Contenido Complejo (Componente)

```tsx
openModal({
  title: 'Configuración',
  ContentComponent: SettingsForm,
  contentProps: { userId: user.id },
  size: 'lg',
});
```

## Animaciones

El modal usa el estilo sci-fi/futurista del proyecto:

- **Entrada**: Scale 0.94 → 1, opacity 0 → 1, Y offset 30px → 0
- **Scan line**: Efecto holográfico al aparecer
- **Header**: Stagger desde la izquierda
- **Cierre**: Reverse de entrada

Easing: `[0.16, 1, 0.3, 1]` (ease-out-expo)
Duración: 350ms entrada, 200ms backdrop

## Cierre del Modal

El modal se cierra automáticamente cuando:

- Click en backdrop
- Tecla `Escape`
- `onClick` de `confirmButton` completa exitosamente

**Cierre manual:**

```tsx
const { closeModal } = useModalStore();
closeModal();
```

## Reglas Específicas

1. **NO renderizar `<Modal />` manualmente** - Ya está en `ClientProviders.tsx`
2. **Usar `useModalStore`** para abrir/cerrar, no manipular estado directamente
3. **Botón de confirmación** debe ser `async` si hay operaciones asíncronas
4. **Mensajes destructivos** siempre advertir: "Esta acción es irreversible"
5. **Integrar con notificaciones** después de éxito/error

## Integración con Notificaciones

```tsx
import { showSuccessToast, showErrorToast } from '@/app/(shared)/notifications';

openModal({
  title: 'Eliminar',
  content: '¿Estás seguro?',
  confirmButton: {
    text: 'Eliminar',
    variant: 'delete',
    onClick: async () => {
      const result = await deleteItem();

      if (!result.success) {
        showErrorToast('Error', result.error.message);
        return; // Modal se mantiene abierto
      }

      showSuccessToast('Éxito', 'Item eliminado');
      // Modal se cierra automáticamente
    },
  },
});
```

## Auto-invoke Skills

| Acción                    | Skill                |
| ------------------------- | -------------------- |
| Animaciones del modal     | `animation-creation` |
| Botones del modal         | `ui-creation`        |
| Iconos de header          | `icon-creation`      |
| Notificaciones post-modal | `notificacion-use`   |

## Referencias

- `modalStore.ts` - Estado y acciones
- `Modal.tsx` - Implementación visual
- `ClientProviders.tsx` - Donde se renderiza
- Skill: `modal-use` - Uso detallado

## Qué NO hacer

- ❌ Renderizar `<Modal />` manualmente
- ❌ Usar modales para flujos de navegación complejos
- ❌ Anidar modales
- ❌ Olvidar que `onClick` debe ser `async`
- ❌ Usar modales para información que debe estar siempre visible
