---
name: modal-use
description: Sistema de modales en Basket Places. Usar para mostrar diálogos de confirmación o información al usuario.
version: 1.0.0
---

# Modal Use - Basket Places

Guía rápida para usar modales. **Los archivos en `app/components/ui/Modal/` contienen la implementación completa** - leerlos para entender los detalles.

## Conceptos Clave

**Flujo básico:**
```
Importar useModalStore → Llamar openModal(config) → Modal se muestra
```

**Estructura:**
- `modalStore.ts` - Estado global con Zustand (`openModal`, `closeModal`)
- `Modal.tsx` - Componente visual (ya renderizado en `ClientProviders.tsx`)
- NO renderizar `<Modal />` manualmente

## Uso Básico

```tsx
import { useModalStore } from '@/app/components/ui/Modal';

export function MyComponent() {
  const { openModal } = useModalStore();

  const handleClick = () => {
    openModal({
      title: '¿confirmar acción?',
      content: 'esta acción no se puede deshacer',
      confirmButton: {
        text: 'confirmar',
        variant: 'primary',
        onClick: async () => {
          await doSomething();
          // Se cierra automáticamente si no hay error
        },
      },
    });
  };

  return <button onClick={handleClick}>Abrir modal</button>;
}
```

## Configuración de openModal

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `title` | string | ✅ | Título del modal (mayúsculas automático) |
| `content` | ReactNode | ❌ | Contenido simple (texto, JSX) |
| `ContentComponent` | ComponentType | ❌ | Componente para contenido complejo |
| `contentProps` | object | ❌ | Props para ContentComponent |
| `confirmButton` | object | ❌ | Botón de acción (si no hay, solo muestra cerrar) |
| `size` | 'sm' \| 'md' \| 'lg' | ❌ | Tamaño (default: 'md') |

## confirmButton

```tsx
confirmButton: {
  text: 'eliminar',              // Texto del botón
  variant: 'delete' | 'primary' | 'secondary' | 'tertiary',
  onClick: async () => {        // Debe ser async
    await deleteItem();
    // Si falla, el modal se mantiene abierto
    // Si tiene éxito, se cierra automáticamente
  },
}
```

## Variantes de Botón

| Variante | Uso | Color |
|----------|-----|-------|
| `delete` | Acciones destructivas (eliminar) | Rojo |
| `primary` | Acción principal (guardar, confirmar) | Accent |
| `secondary` | Acción secundaria | Gris |
| `tertiary` | Acción terciaria (menos prominente) | Transparente |

## Tamaños

| Tamaño | Ancho máximo | Uso |
|--------|--------------|-----|
| `sm` | ~320px | Confirmaciones simples |
| `md` | ~480px | Contenido estándar (default) |
| `lg` | ~640px | Formularios, contenido complejo |

## Tipos de Contenido

**1. Texto simple:**
```tsx
openModal({
  title: 'cerrar sesión',
  content: '¿deseas salir de tu cuenta?',
  confirmButton: { ... },
});
```

**2. JSX/ReactNode:**
```tsx
openModal({
  title: 'detalles',
  content: (
    <div>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  ),
});
```

**3. Componente dinámico (para contenido complejo):**
```tsx
openModal({
  title: 'configuración',
  ContentComponent: SettingsForm,
  contentProps: { userId: user.id },
  size: 'lg',
});
```

## Cierre del Modal

El modal se cierra automáticamente cuando:
- El usuario hace clic fuera (backdrop)
- Presiona tecla `Escape`
- La función `onClick` de `confirmButton` completa exitosamente

**Cierre manual (raro):**
```tsx
const { closeModal } = useModalStore();
closeModal();
```

## Buenas Prácticas

**Mensajes de confirmación destructiva:**
```tsx
openModal({
  title: '¿eliminar comunidad?',
  content: 'esta acción es irreversible y permanente', // Siempre advertir
  confirmButton: {
    text: 'eliminar',
    variant: 'delete', // Usar variant delete para destructivas
    onClick: async () => { ... },
  },
});
```

**Con notificaciones:**
```tsx
import { showSuccessToast, showErrorToast } from '@/shared/notifications';

openModal({
  title: 'eliminar',
  content: '¿estás seguro?',
  confirmButton: {
    text: 'eliminar',
    variant: 'delete',
    onClick: async () => {
      const result = await deleteItem();
      
      if (!result.success) {
        showErrorToast('error', result.error.message);
        // Modal se mantiene abierto para reintentar
        return;
      }
      
      showSuccessToast('éxito', 'item eliminado');
      // Modal se cierra automáticamente
    },
  },
});
```

## Qué NO hacer

- ❌ Renderizar `<Modal />` manualmente (ya está en `ClientProviders.tsx`)
- ❌ Usar modales para flujos de navegación complejos
- ❌ Anidar modales (cerrar uno y abrir otro inmediatamente)
- ❌ Olvidar que `onClick` debe ser `async` si hay operaciones asíncronas
- ❌ Usar modales para información que debería estar siempre visible

## Referencias

- `app/components/ui/Modal/modalStore.ts` - Estado y acciones del modal
- `app/components/ui/Modal/Modal.tsx` - Implementación visual
- `app/components/ClientProviders.tsx` - Donde se renderiza el Modal
