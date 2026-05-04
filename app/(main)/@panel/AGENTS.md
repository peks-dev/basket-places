# Dominio: Panel

## Contexto

Sistema de paneles deslizables que muestran contenido detallado sobre el mapa usando Next.js Interception Routes. Permite ver información de comunidades sin perder el contexto del mapa.

## Stack Tecnológico

- **Next.js Interception Routes**: Rutas paralelas con `(.)` prefix
- **Zustand**: Estado del loader (`usePanelLoaderStore`)
- **Gestos**: Swipe para cerrar (touch) + drag (desktop)
- **Layout Slot**: `@panel` en `layout.tsx`

## Estructura

```
app/(main)/
├── @panel/                        # Slot de paneles (interception routes)
│   └── (.)comunidad/ver/[id]/
│       ├── page.tsx               # Server Component: carga datos
│       └── PanelContent.tsx       # Client Component: UI del panel
├── layout.tsx                     # Renderiza children + panel slot
└── map/
    ├── components/
    │   ├── PanelLoader.tsx        # Skeleton loader
    │   └── hooks/
    │       ├── usePanelUniversalGesture.ts  # Gestos touch+desktop
    │       ├── usePanelSwipeGesture.ts      # Solo touch
    │       └── usePanelDesktopGesture.ts    # Solo desktop
    └── stores/
        └── usePanelStore.ts       # usePanelLoaderStore
```

## Patrones Importantes

### Interception Route

Las rutas con `(.)` interceptan la navegación y muestran el panel sobre la página actual:

```
/@panel/(.)comunidad/ver/[id]/  ← Intercepta /comunidad/ver/[id]
```

### Estructura de un Panel

**page.tsx (Server Component):**

```tsx
import { getData } from './actions';
import PanelContent from './PanelContent';

export default async function PanelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData(id);
  if (!data) return null;
  return <PanelContent data={data} />;
}
```


## Métodos de Cierre

| Método             | Cómo funciona                                            |
| ------------------ | -------------------------------------------------------- |
| **Swipe down**     | `usePanelUniversalGesture` - Arrastrar hacia abajo 150px |
| **Click backdrop** | Clic en el fondo oscuro                                  |
| **Tecla Escape**   | Event listener de keydown                                |
| **Click handle**   | Botón superior con barra                                 |
| **router.back()**  | Navegación programática                                  |

## Reglas Específicas

1. **SIEMPRE** incluir `setLoading(false)` en `useEffect` al montar PanelContent
2. **NO** usar panels para flujos complejos de múltiples pasos (usar páginas)
3. **NO** anidar panels (uno dentro de otro)
4. **NO** usar panels para contenido SEO-importante (no es indexable)
5. **Altura máxima**: 94vh (`h-[94dvh]`)
6. **Z-index**: z-50 para estar sobre el mapa

## Referencias

- `app/(main)/@panel/` - Interception routes
- `app/(main)/map/components/hooks/usePanelUniversalGesture.ts` - Gestos
- `app/(main)/map/stores/usePanelStore.ts` - Estado del loader
- `app/(main)/map/components/PanelLoader.tsx` - Skeleton loader
- `app/(main)/layout.tsx` - Layout con slot `panel`
- Skill: `panel-use` - Uso detallado
- Next.js: [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)

## Qué NO hacer

- ❌ Olvidar `setLoading(false)` en el `useEffect` de PanelContent
- ❌ Usar panels para flujos de múltiples pasos
- ❌ Anidar panels
- ❌ Usar panels para contenido SEO-importante
- ❌ Contenido mayor a 94vh de alto
