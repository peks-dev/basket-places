# Dominio: Supabase / Database

## Contexto

Configuración de Supabase: clientes, schema de base de datos, storage, y Row Level Security (RLS). **Esta es la fuente de verdad para todo lo relacionado con Supabase.**

## Stack Tecnológico

- **Supabase Auth**: Autenticación OTP con emails
- **PostgreSQL + PostGIS**: Base de datos con extensión geoespacial
- **Supabase Storage**: Almacenamiento de imágenes (avatars, community-images)
- **RLS**: Row Level Security para políticas de acceso

## Estructura de Archivos

```
lib/supabase/
├── server.ts           # Cliente para Server Components/Actions (async)
├── client.ts           # Cliente para Browser (sync)
├── storage.ts          # Helpers para upload/delete de imágenes
├── middleware.ts       # Refresh de tokens en Edge
├── admin.ts            # Cliente con service role (solo server)
├── types.ts            # Tipos TypeScript de Supabase
└── AGENTS.md           # Este archivo
```

## Clientes

### Server Client (async)

```typescript
// Server Components y Server Actions
import { createClient } from '@/lib/supabase/server';

const supabase = await createClient(); // SIEMPRE async
```

### Browser Client (sync)

```typescript
// Client Components
import { supabase } from '@/lib/supabase/client';

// Ya configurado con persistSession: true
```

### Admin Client (service role)

```typescript
// Solo en server, nunca exponer al cliente
// Útil para operaciones con privilegios elevados
import { createClient } from '@/lib/supabase/admin';
```

## Schema de Base de Datos

### Tabla: communities

```sql
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type community_type NOT NULL,  -- 'pickup' | 'club'
  name TEXT NOT NULL CHECK (LENGTH(name) <= 100),
  description TEXT CHECK (LENGTH(description) <= 500),
  location GEOGRAPHY(POINT, 4326) NOT NULL,  -- PostGIS
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  floor_type floor_type_enum NOT NULL,
  is_covered BOOLEAN NOT NULL DEFAULT false,
  schedule JSONB NOT NULL DEFAULT '[]'::jsonb,
  services JSONB NOT NULL DEFAULT '{}'::jsonb,
  age_group age_group_enum,  -- NULL para clubs
  categories JSONB,          -- NULL para pickups
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  average_rating DECIMAL(3,2) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints por tipo
  CONSTRAINT communities_pickup_check
    CHECK (type != 'pickup' OR (age_group IS NOT NULL AND categories IS NULL)),
  CONSTRAINT communities_club_check
    CHECK (type != 'club' OR (categories IS NOT NULL AND age_group IS NULL)),
  CONSTRAINT communities_images_check
    CHECK (jsonb_array_length(images) >= 2 AND jsonb_array_length(images) <= 4)
);
```

**Tipos Enum:**

```sql
CREATE TYPE community_type AS ENUM ('pickup', 'club');
CREATE TYPE floor_type_enum AS ENUM ('cement', 'parquet', 'asphalt', 'synthetic');
CREATE TYPE age_group_enum AS ENUM ('teens', 'young_adults', 'veterans', 'mixed');
```

### Tabla: profiles

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT CHECK (LENGTH(name) <= 100),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Trigger**: Se crea automáticamente al registrar usuario (junto con email_preferences).

### Tabla: reviews

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT CHECK (LENGTH(comment) <= 500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(community_id, user_id)  -- Una review por usuario/comunidad
);
```

## Índices

```sql
-- Geoespacial (CRÍTICO para PostGIS)
CREATE INDEX idx_communities_location_gist ON communities USING GIST (location);

-- Filtros
CREATE INDEX idx_communities_type ON communities (type);
CREATE INDEX idx_communities_age_group ON communities (age_group) WHERE age_group IS NOT NULL;
CREATE INDEX idx_communities_rating ON communities (average_rating DESC);
CREATE INDEX idx_communities_floor_type ON communities (floor_type);

-- Reviews
CREATE INDEX idx_reviews_community_id ON reviews (community_id);
CREATE INDEX idx_reviews_user_id ON reviews (user_id);
CREATE INDEX idx_reviews_community_created ON reviews (community_id, created_at DESC);
```

## Triggers

```sql
-- Auto-update updated_at
CREATE TRIGGER communities_updated_at BEFORE UPDATE ON communities
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Auto-create profile + email_preferences al registrar
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-actualizar rating de comunidad al modificar reviews
CREATE TRIGGER update_community_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_community_rating();
```

## Row Level Security (RLS)

### Communities

```sql
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

-- Todos pueden ver
CREATE POLICY "Communities are viewable by everyone" ON communities
  FOR SELECT USING (true);

-- Solo autenticados pueden crear
CREATE POLICY "Users can create communities" ON communities
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Solo el dueño puede actualizar
CREATE POLICY "Users can update own communities" ON communities
  FOR UPDATE USING (auth.uid() = user_id);
```

### Profiles

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Todos pueden ver perfiles
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

-- Solo el dueño puede actualizar
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### Reviews

```sql
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Todos pueden ver reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

-- Solo autenticados pueden crear (y solo su propia review)
CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Solo el autor puede actualizar/eliminar
CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);
```

## Storage Buckets

### community-images

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('community-images', 'community-images', true);

-- Policies:
-- Upload: solo autenticados, path = community-{user_id}/
-- View: público
-- Update/Delete: solo propietario del path
```

### avatars

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Policies:
-- Upload: solo el dueño del avatar
-- View: público
-- Update/Delete: solo propietario
```

## Uso de Storage

```typescript
import { uploadImage, deleteImage, STORAGE_BUCKETS } from '@/lib/supabase/storage';

// Subir imagen de comunidad
const { url, path } = await uploadImage(
  file,
  'COMMUNITIES',                    // bucket
  `community-${communityId}/${filename}`
);

// Subir avatar
const { url, path } = await uploadImage(
  file,
  'AVATARS',
  `${userId}/${filename}`
);

// Eliminar
await deleteImage(path, 'COMMUNITIES');
```

## PostGIS - Consultas Geoespaciales

### Búsqueda por radio (5km)

```typescript
const { data } = await supabase
  .from('communities')
  .select('*, ST_Distance(location, ST_Point(lng, lat)::geography) as distance')
  .filter('ST_DWithin(location, ST_Point(lng, lat)::geography, 5000)')
  .order('distance');
```

### K vecinos más cercanos

```typescript
// Usar el operador <-> para mejor performance
const { data } = await supabase.rpc('nearby_communities', {
  lat: 19.4326,
  lng: -99.1332,
  limit: 10
});
```

## Reglas Específicas

1. **SIEMPRE usar cliente correcto**: `createClient()` para server, `supabase` para browser
2. **NUNCA usar service role key en el cliente**
3. **Validar RLS**: Verificar políticas al crear nuevas tablas
4. **Geocodificación**: Usar PostGIS para queries espaciales, no cálculos manuales
5. **Imágenes**: Mínimo 2, máximo 4 por comunidad
6. **Trigger de rating**: No modificar `average_rating` manualmente (se actualiza solo)

## Auto-invoke Skills

| Acción | Skill |
|--------|-------|
| Queries con RLS | `supabase-use` |
| Storage/upload | `supabase-use` |
| Geocodificación | `leaflet` |
| Errores de DB | `error-use` |

## Referencias

- `lib/supabase/server.ts` - Cliente server
- `lib/supabase/client.ts` - Cliente browser
- `lib/supabase/storage.ts` - Helpers de storage
- `lib/supabase/middleware.ts` - Auth middleware
- `lib/supabase/types.ts` - Tipos TypeScript