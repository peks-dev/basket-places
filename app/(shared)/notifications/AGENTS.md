# Dominio: Notificaciones

## Contexto

Sistema de notificaciones toast construido sobre Sonner. Diseñado con estilo sci-fi: líneas decorativas con glow, colores semánticos, y animaciones sutiles.

## Stack Tecnológico

- **Sonner**: Librería base para toasts
- **Zustand**: No aplica (Sonner maneja su propio estado)
- **Tailwind**: Estilos con colores semánticos (success, error, warning, info)

## Estructura

```
app/(shared)/notifications/
├── components/
│   └── baseToast.tsx          # Componente visual personalizado
├── services/
│   └── notification-service.ts # Funciones para disparar toasts
├── types.ts                   # Tipos TypeScript
└── index.ts                   # Exports públicos
```

## Patrones Importantes

### Uso Básico

```tsx
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
} from '@/app/(shared)/notifications';

// Éxito
showSuccessToast('Perfil actualizado');
showSuccessToast(
  'Comunidad creada',
  'Tu comunidad está pendiente de aprobación'
);

// Error
showErrorToast('Error al guardar');
showErrorToast('Error de conexión', 'No se pudo conectar con el servidor');

// Advertencia
showWarningToast(
  'Campos incompletos',
  'Algunos campos opcionales están vacíos'
);

// Información
showInfoToast('Sincronización', 'Tus datos se están sincronizando');
```

### Toast con Acción

```tsx
import { showToastWithAction } from '@/app/(shared)/notifications';

showToastWithAction(
  'Sesión expirada',
  'Tu sesión ha caducado. ¿Deseas volver a iniciar sesión?',
  'info',
  'Iniciar sesión',
  () => router.push('/login')
);
```

### Duraciones

| Tipo      | Duración | Uso típico                     |
| --------- | -------- | ------------------------------ |
| `success` | 4000ms   | Acciones completadas           |
| `error`   | 5000ms   | Errores (más tiempo para leer) |
| `warning` | 4500ms   | Advertencias                   |
| `info`    | 4000ms   | Información general            |
| `action`  | 6000ms   | Toasts con botón de acción     |

**Personalizar duración:**

```tsx
showSuccessToast('Guardado', 'Los cambios se guardaron', { duration: 6000 });
```

## Flujo Después de Mutación

Patrón estándar en handlers:

```tsx
const result = await createCommunity(data);

if (!result.success) {
  showErrorToast('Error al crear', result.error.message);
  return;
}

showSuccessToast('Comunidad creada exitosamente');
```

## Diseño Visual

Cada toast tiene:

- **Línea decorativa izquierda**: Con glow neon según el tipo
- **Título**: Mayúsculas, semibold
- **Descripción**: Opcional, más pequeña
- **Botón de acción**: Opcional, aparece abajo

Colores:

- `success`: Verde con glow
- `error`: Rojo con glow
- `warning`: Amarillo/naranja con glow
- `info`: Gris/azul con glow

## Reglas Específicas

1. **Errores**: Usar mensajes user-friendly, no técnicos
2. **Éxitos**: Ser específico, usar verbos en pasado
3. **No usar** para errores de validación de formularios (usar UI inline)
4. **No mostrar** múltiples toasts idénticos simultáneamente
5. **No usar** para decisiones complejas (usar modal)

## Auto-invoke Skills

| Acción                    | Skill                               |
| ------------------------- | ----------------------------------- |
| Crear nuevo tipo de toast | `ui-creation` (modificar baseToast) |
| Cambiar estilos           | `ui-creation`                       |

## Referencias

- `services/notification-service.ts` - Funciones exportadas
- `components/baseToast.tsx` - Componente visual
- `types.ts` - Tipos ToastType, ToastProps
- `ClientProviders.tsx` - Provider de Sonner
- Skill: `notificacion-use` - Uso detallado

## Qué NO hacer

- ❌ Usar toasts para errores de validación de formularios
- ❌ Mostrar múltiples toasts idénticos
- ❌ Incluir información sensible (tokens, passwords)
- ❌ Usar lenguaje técnico en mensajes de error
- ❌ Olvidar manejar el error antes de mostrar toast de éxito
