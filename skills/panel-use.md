---
name: panel-use
description: Sistema de paneles deslizables (interception routes) en Basket Places. Usar para mostrar contenido detallado sobre el mapa.
version: 1.0.0
---

# Panel Use - Basket Places

Guía rápida para crear paneles deslizables. **Los archivos en `app/(main)/@panel/` y `app/(main)/map/components/` contienen la implementación completa** - leerlos para entender los detalles.

## Conceptos Clave

**Flujo básico:**
```
Navegar a ruta → Interception Route activa panel → Panel se muestra sobre el mapa
```

**Estructura:**
- `app/(main)/@panel/(.)ruta/` - Interception route (muestra panel sobre la página)
- `PanelContent.tsx` - Componente cliente con UI del panel
- `usePanelLoaderStore` - Estado del loader
- `usePanelUniversalGesture` - Gestos para cerrar
- `<Modal>` ya renderizado en `ClientProviders.tsx`

## Crear un Panel

**Estructura de carpetas:**
```
app/(main)/@panel/(.)comunidad/ver/[id]/
├── page.tsx           # Server Component: carga datos
└── PanelContent.tsx   # Client Component: UI del panel
```

**page.tsx (Server Component):**
```tsx
import { getData } from './actions';
import PanelContent from './PanelContent';

export default async function PanelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getData(id);
  if (!data) return null;
  return <PanelContent data={data} />;
}
```

**PanelContent.tsx (Client Component):**
```tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { usePanelLoaderStore } from '@/app/(main)/map/stores/usePanelStore';
import { usePanelUniversalGesture } from '@/app/(main)/map/components/hooks/usePanelUniversalGesture';

export default function PanelContent({ data }: { data: DataType }) {
  const router = useRouter();
  const { setLoading } = usePanelLoaderStore();

  // Ocultar loader al montar
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const handleClose = useCallback(() => {
    router.back(); // Cierra el panel
  }, [router]);

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose]);

  // Gestos para cerrar
  const { panelRef } = usePanelUniversalGesture({
    onClose: handleClose,
    dragThreshold: 150,
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop - clic para cerrar */}
      <div className="grow" onClick={handleClose}></div>

      {/* Panel */}
      <div
        ref={panelRef}
        className="transparent-container shadow-2-xl relative mt-auto h-[94dvh] w-screen cursor-grab"
      >
        {/* Handle */}
        <div className="flex justify-center py-2">
          <button onClick={handleClose}>
            <div className="bg-accent-primary h-2 w-40 rounded-full"></div>
          </button>
        </div>

        {/* Contenido */}
        <div className="h-full overflow-y-auto px-4 pb-10">
          {/* Tu contenido aquí */}
        </div>
      </div>
    </div>
  );
}
```

## Activar Loader al Navegar

```tsx
import { usePanelLoaderStore } from '@/app/(main)/map/stores/usePanelStore';

export function Card({ id }: { id: string }) {
  const router = useRouter();
  const { setLoading } = usePanelLoaderStore();

  const handleClick = () => {
    setLoading(true); // Muestra loader inmediatamente
    router.push(`/comunidad/ver/${id}`);
  };

  return <div onClick={handleClick}>Contenido</div>;
}
```

## Métodos de Cierre

| Método | Cómo funciona |
|--------|---------------|
| **Swipe down** | `usePanelUniversalGesture` - Arrastrar hacia abajo 150px |
| **Click backdrop** | Clic en el fondo oscuro |
| **Tecla Escape** | Event listener de keydown |
| **Click handle** | Botón superior con barra |
| **router.back()** | Navegación programática |

## Qué NO hacer

- ❌ Usar panels para flujos complejos de múltiples pasos (usar páginas)
- ❌ Anidar panels (uno dentro de otro)
- ❌ Olvidar `setLoading(false)` en el `useEffect` de PanelContent
- ❌ Usar panels para contenido SEO-importante (no es indexable)
- ❌ Contenido mayor a 94vh de alto

## Referencias

- `app/(main)/@panel/` - Interception routes
- `app/(main)/map/components/hooks/usePanelUniversalGesture.ts` - Gestos
- `app/(main)/map/stores/usePanelStore.ts` - Estado del loader
- `app/(main)/layout.tsx` - Layout con slot `panel`
- Next.js: [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
