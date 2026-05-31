# Dominio: Mapas

## Contexto

El sistema de mapas es el núcleo visual de Basket Places. Usa React Leaflet para renderizar canchas de basketball en un mapa interactivo, con geolocalización, filtros y navegación.

## Stack Tecnológico

- **React Leaflet**: Wrapper React para Leaflet
- **Leaflet**: Librería de mapas JavaScript
- **PostGIS**: Extensión PostgreSQL para queries geoespaciales
- **Nominatim**: Servicio de geocodificación (OpenStreetMap)

## Estructura

```
app/(main)/map/
├── components/
│   ├── base/
│   │   ├── BaseMap.tsx           # Componente base del mapa
│   │   ├── BaseMarker.tsx        # Marcador base
│   │   └── BaseDraggableMarker.tsx
│   ├── ClickableMarker.tsx       # Marcador clickeable
│   ├── CommunityMarker.tsx       # Marcador de comunidad
│   ├── HomeMap.tsx               # Mapa principal (homepage)
│   └── PanelLoader.tsx           # Loader para paneles
├── components/hooks/
│   ├── usePanelUniversalGesture.ts
│   ├── usePanelSwipeGesture.ts
│   └── usePanelDesktopGesture.ts
├── hooks/
│   └── useGeocoding.ts
├── services/
│   └── reverseGeocode.ts         # Geocodificación inversa
├── stores/
│   ├── useMapStateStore.ts       # Estado del mapa
│   └── usePanelStore.ts          # Estado del loader de panel
├── styles/
│   └── leaflet-overrides.css     # Overrides de estilos
├── types/
│   └── index.ts
└── utils/
    └── iconUtils.ts              # Utilidades para iconos de marcadores
```

## Patrones Importantes

### Marcadores

Los marcadores usan `divIcon` de Leaflet para renderizar React components:

```tsx
import { divIcon } from 'leaflet';

const icon = divIcon({
  className: 'custom-marker',
  html: renderToString(<MarkerComponent />),
  iconSize: [40, 40],
});
```

### Geocodificación

Usar servicio propio en `services/reverseGeocode.ts`:

```tsx
const result = await reverseGeocode(lat, lng);
// Retorna: { display_name, address: { city, state, country } }
```

### Stores

- `useMapStateStore`: Centrado del mapa, zoom, bounds
- `usePanelStore`: Estado del loader cuando se abre un panel

## Reglas Específicas

1. **Siempre usar `BaseMap`** como wrapper, no Leaflet directamente
2. **Marcadores**: Usar `CommunityMarker` para canchas, extender `BaseMarker` para nuevos tipos
3. **Eventos de mapa**: Manejar a través de hooks, no inline en JSX
4. **Estilos**: Los overrides de Leaflet van en `styles/leaflet-overrides.css`
5. **PanelLoader**: Activar con `setLoading(true)` antes de navegar a detalle

## Auto-invoke Skills

| Acción                    | Skill                    |
| ------------------------- | ------------------------ |
| Crear marcadores          | `icon-creation`          |
| Animar elementos del mapa | `animation-creation`     |
| Geocodificación           | `large-scale-map-visualization` |
| uso local de supabase     | `supabase-use` (PostGIS) |
| supabase best practices   | `supabase-postgres-best-practices` |

## Referencias

- `components/base/BaseMap.tsx` - Configuración base
- `components/HomeMap.tsx` - Implementación principal
- `hooks/useGeocoding.ts` - Hook de geocodificación
- [React Leaflet Docs](https://react-leaflet.js.org/)
- [Leaflet Docs](https://leafletjs.com/)
