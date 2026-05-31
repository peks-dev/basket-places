---
name: notificacion-use
description: Sistema de notificaciones toast en Basket Places. Usar para mostrar feedback al usuario sobre acciones exitosas, errores o información.
version: 1.0.0
---

# Notificacion Use - Basket Places

Guía rápida para mostrar notificaciones toast. **Los archivos en `app/(shared)/notifications/` contienen la implementación completa** - leerlos para entender los detalles.

## Conceptos Clave

**Flujo básico:**
```
Importar función → Llamar con título y descripción → Toast aparece
```

**Estructura:**
- `notification-service.ts` - Funciones para disparar toasts
- `baseToast.tsx` - Componente visual personalizado
- `Toaster` de Sonner ya está en `ClientProviders.tsx`

## Funciones Disponibles

```tsx
import { 
  showSuccessToast, 
  showErrorToast, 
  showWarningToast, 
  showInfoToast 
} from '@/shared/notifications';
```

## Uso Básico

**Éxito:**
```tsx
showSuccessToast('Perfil actualizado');
showSuccessToast('Comunidad creada', 'Tu comunidad está pendiente de aprobación');
```

**Error:**
```tsx
showErrorToast('Error al guardar'); // Usa mensaje por defecto
showErrorToast('Error de conexión', 'No se pudo conectar con el servidor');
showErrorToast('Error', result.error.message); // Mensaje del backend
```

**Advertencia:**
```tsx
showWarningToast('Campos incompletos', 'Algunos campos opcionales están vacíos');
```

**Información:**
```tsx
showInfoToast('Sincronización', 'Tus datos se están sincronizando');
```

## Duraciones por Defecto

| Tipo | Duración | Uso típico |
|------|----------|------------|
| `success` | 4000ms | Acciones completadas |
| `error` | 5000ms | Errores (más tiempo para leer) |
| `warning` | 4500ms | Advertencias |
| `info` | 4000ms | Información general |

**Personalizar duración:**
```tsx
showSuccessToast('Guardado', 'Los cambios se guardaron', { duration: 6000 });
```

## Toast con Acción

Para notificaciones que requieren interacción:

```tsx
import { showToastWithAction } from '@/shared/notifications';

showToastWithAction(
  'Sesión expirada',
  'Tu sesión ha caducado. ¿Deseas volver a iniciar sesión?',
  'info',
  'Iniciar sesión',
  () => router.push('/login')
);
```

## Patrón Después de Mutación

**Flujo estándar en handlers:**

```tsx
const result = await createCommunity(data);

if (!result.success) {
  showErrorToast('Error al crear', result.error.message);
  return;
}

showSuccessToast('Comunidad creada exitosamente');
```

## Buenas Prácticas

**Éxito:**
- ✅ Ser específico: "Perfil actualizado" vs "Éxito"
- ✅ Usar verbos en pasado: "Guardado", "Eliminado", "Enviado"
- ✅ Incluir contexto cuando sea relevante

**Error:**
- ✅ Explicar qué pasó: "No se pudo conectar"
- ✅ Sugerir solución: "Intenta nuevamente"
- ✅ Lenguaje de usuario, no técnico: ❌ "Error 500", ❌ "SQL violation"
- ✅ Usar mensaje por defecto si no hay contexto específico

**Timing:**
- ✅ Mostrar inmediatamente después de la acción
- ✅ Errores: 5s (dan tiempo de leer)
- ✅ Éxitos: 4s (no interrumpen)

## Qué NO hacer

- ❌ Usar toast para errores de validación de formularios (usar UI inline)
- ❌ Mostrar múltiples toasts idénticos simultáneamente
- ❌ Usar toasts para decisiones complejas (usar modal)
- ❌ Incluir información sensible (tokens, passwords)
- ❌ Depender solo de toasts para feedback crítico

## Referencias

- `app/(shared)/notifications/services/notification-service.ts` - Funciones exportadas
- `app/(shared)/notifications/components/baseToast.tsx` - Componente visual
- `app/components/ClientProviders.tsx` - Provider de Sonner
- [Sonner Documentation](https://sonner.emilkowal.ski/)
