-- ============================================================================
-- Basket Places — Baseline schema (source of truth)
-- ============================================================================
-- Snapshot of the LIVE production database as of 2026-06-16, reconstructed by
-- introspection (pg_catalog / information_schema) because the project was never
-- managed by the Supabase CLI (the schema and functions were created directly in
-- the dashboard, so there was no versioned source of truth).
--
-- This file reflects the CURRENT state, i.e. it already INCLUDES the security
-- hardening applied this session (migrations 002–005). It is written to be
-- idempotent so it can recreate the schema on a fresh environment (e.g. a
-- Supabase branch) by running top to bottom.
--
-- Migrations 002–006 are this session's incremental changes and are already
-- folded into this baseline (kept for history). The original hand-written
-- `001_rls_policies.sql` was removed (it was superseded and contained incorrect
-- policy definitions, e.g. profiles using `auth.uid() = id`).
-- ============================================================================

-- ============================================
-- EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pgcrypto    WITH SCHEMA extensions;
-- PostGIS currently lives in `public` (flagged by the advisor; moving it is
-- deferred as it is risky on a running DB with active geography columns).
CREATE EXTENSION IF NOT EXISTS postgis     WITH SCHEMA public;

-- ============================================
-- ENUMS
-- ============================================
DO $$ BEGIN
  CREATE TYPE public.community_type AS ENUM ('pickup', 'club');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.floor_type_enum AS ENUM ('cement', 'parquet', 'asphalt', 'synthetic');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.age_group_enum AS ENUM ('teens', 'young_adults', 'veterans', 'mixed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================
-- VALIDATION FUNCTIONS  (used by CHECK constraints; SECURITY INVOKER)
-- Must exist before the tables that reference them.
-- ============================================
CREATE OR REPLACE FUNCTION public.is_valid_time_format(time_str text)
 RETURNS boolean LANGUAGE plpgsql IMMUTABLE SECURITY INVOKER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  RETURN time_str ~ '^([01]\d|2[0-3]):([0-5]\d)$';
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_valid_time_range(schedule_item jsonb)
 RETURNS boolean LANGUAGE plpgsql IMMUTABLE SECURITY INVOKER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  RETURN (schedule_item->'time'->>'start') < (schedule_item->'time'->>'end');
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_valid_schedule(schedule_data jsonb)
 RETURNS boolean LANGUAGE plpgsql IMMUTABLE SECURITY INVOKER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  item JSONB;
BEGIN
  IF jsonb_typeof(schedule_data) != 'array' THEN RETURN FALSE; END IF;
  IF jsonb_array_length(schedule_data) < 1 THEN RETURN FALSE; END IF;
  FOR item IN SELECT * FROM jsonb_array_elements(schedule_data)
  LOOP
    IF NOT (item ? 'days' AND item ? 'time' AND item->'time' ? 'start' AND item->'time' ? 'end') THEN
      RETURN FALSE;
    END IF;
    IF jsonb_array_length(item->'days') < 1 THEN RETURN FALSE; END IF;
    IF NOT is_valid_time_format(item->'time'->>'start') THEN RETURN FALSE; END IF;
    IF NOT is_valid_time_format(item->'time'->>'end') THEN RETURN FALSE; END IF;
    IF NOT is_valid_time_range(item) THEN RETURN FALSE; END IF;
  END LOOP;
  RETURN TRUE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_valid_services(services_data jsonb)
 RETURNS boolean LANGUAGE plpgsql IMMUTABLE SECURITY INVOKER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  RETURN (
    jsonb_typeof(services_data) = 'object' AND
    services_data ? 'transport' AND services_data ? 'store' AND
    services_data ? 'wifi' AND services_data ? 'bathroom' AND
    jsonb_typeof(services_data->'transport') = 'boolean' AND
    jsonb_typeof(services_data->'store') = 'boolean' AND
    jsonb_typeof(services_data->'wifi') = 'boolean' AND
    jsonb_typeof(services_data->'bathroom') = 'boolean'
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_valid_categories(categories_data jsonb)
 RETURNS boolean LANGUAGE plpgsql IMMUTABLE SECURITY INVOKER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  item JSONB;
BEGIN
  IF jsonb_typeof(categories_data) != 'array' THEN RETURN FALSE; END IF;
  IF jsonb_array_length(categories_data) < 1 THEN RETURN FALSE; END IF;
  FOR item IN SELECT * FROM jsonb_array_elements(categories_data)
  LOOP
    IF NOT (item ? 'category' AND item ? 'min_age' AND item ? 'max_age' AND item ? 'genders') THEN
      RETURN FALSE;
    END IF;
    IF jsonb_typeof(item->'category') != 'string' THEN RETURN FALSE; END IF;
    IF jsonb_typeof(item->'min_age') != 'number' THEN RETURN FALSE; END IF;
    IF (item->>'min_age')::int < 0 THEN RETURN FALSE; END IF;
    IF jsonb_typeof(item->'genders') != 'array' THEN RETURN FALSE; END IF;
    IF jsonb_array_length(item->'genders') < 1 THEN RETURN FALSE; END IF;
  END LOOP;
  RETURN TRUE;
END;
$function$;

-- ============================================
-- TRIGGER FUNCTIONS
-- ============================================
-- Bumps updated_at on row change (SECURITY INVOKER / default).
CREATE OR REPLACE FUNCTION public.handle_updated_at()
 RETURNS trigger LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- Creates a profile row on signup. SECURITY DEFINER (reads auth.users, inserts
-- into profiles); EXECUTE is revoked below so it cannot be called as an RPC.
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  user_email TEXT;
  username TEXT;
BEGIN
  SELECT email INTO user_email FROM auth.users WHERE id = NEW.id;
  username := SPLIT_PART(user_email, '@', 1);
  INSERT INTO public.profiles (user_id, name) VALUES (NEW.id, username);
  RETURN NEW;
END;
$function$;

-- Recomputes a community's average_rating/total_reviews when its reviews change.
-- SECURITY DEFINER (updates a community owned by another user); EXECUTE revoked.
CREATE OR REPLACE FUNCTION public.update_community_rating()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  community_uuid UUID;
  new_avg NUMERIC;
  new_count BIGINT;
BEGIN
  IF TG_OP = 'DELETE' THEN community_uuid := OLD.community_id;
  ELSE community_uuid := NEW.community_id;
  END IF;
  SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0), COUNT(*)
    INTO new_avg, new_count
    FROM reviews WHERE community_id = community_uuid;
  UPDATE communities
    SET average_rating = new_avg, total_reviews = new_count, updated_at = NOW()
    WHERE id = community_uuid;
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- ============================================
-- TABLES
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  name       text CHECK (length(name) <= 100),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.communities (
  id             uuid PRIMARY KEY,
  type           public.community_type    NOT NULL,
  name           text NOT NULL CHECK (length(name) >= 3 AND length(name) <= 100),
  description    text NOT NULL CHECK (length(description) >= 30 AND length(description) <= 500),
  location       geography(Point,4326) NOT NULL CHECK (
                   st_y(location::geometry) >= -90  AND st_y(location::geometry) <= 90 AND
                   st_x(location::geometry) >= -180 AND st_x(location::geometry) <= 180),
  country        text NOT NULL DEFAULT 'México',
  state          text,
  city           text NOT NULL,
  images         jsonb NOT NULL CHECK (jsonb_array_length(images) >= 2 AND jsonb_array_length(images) <= 4),
  floor_type     public.floor_type_enum   NOT NULL,
  is_covered     boolean NOT NULL DEFAULT false,
  schedule       jsonb NOT NULL CHECK (is_valid_schedule(schedule)),
  services       jsonb NOT NULL DEFAULT '{"wifi": false, "store": false, "bathroom": false, "transport": false}'::jsonb
                   CHECK (is_valid_services(services)),
  age_group      public.age_group_enum,
  categories     jsonb,
  user_id        uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  average_rating numeric(3,2) DEFAULT 0.0 CHECK (average_rating >= 0 AND average_rating <= 5),
  total_reviews  integer DEFAULT 0 CHECK (total_reviews >= 0),
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),
  -- pickup courts carry an age_group; clubs carry categories (mutually exclusive)
  CONSTRAINT communities_pickup_check CHECK (type <> 'pickup' OR (age_group IS NOT NULL AND categories IS NULL)),
  CONSTRAINT communities_club_check   CHECK (type <> 'club'   OR (categories IS NOT NULL AND age_group IS NULL)),
  CONSTRAINT communities_categories_check CHECK (type <> 'club' OR is_valid_categories(categories)),
  -- redundant FK to profiles(user_id) kept to match production
  CONSTRAINT communities_user_id_fkey1 FOREIGN KEY (user_id)
    REFERENCES public.profiles(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.reviews (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id      uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  rating       integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment      text CHECK (length(comment) <= 250),
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now(),
  CONSTRAINT reviews_community_id_user_id_key UNIQUE (community_id, user_id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_communities_admin_location ON public.communities USING btree (country, state, city);
CREATE INDEX IF NOT EXISTS idx_communities_city          ON public.communities USING btree (city);
CREATE INDEX IF NOT EXISTS idx_communities_created_at     ON public.communities USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_communities_location_gist  ON public.communities USING gist (location);
CREATE INDEX IF NOT EXISTS idx_communities_type           ON public.communities USING btree (type);
CREATE INDEX IF NOT EXISTS idx_communities_user_id        ON public.communities USING btree (user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_community_created   ON public.reviews USING btree (community_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_community_id        ON public.reviews USING btree (community_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id            ON public.reviews USING btree (user_id);

-- ============================================
-- TRIGGERS
-- ============================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS communities_updated_at ON public.communities;
CREATE TRIGGER communities_updated_at
  BEFORE UPDATE ON public.communities FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS reviews_updated_at ON public.reviews;
CREATE TRIGGER reviews_updated_at
  BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_community_rating_trigger ON public.reviews;
CREATE TRIGGER update_community_rating_trigger
  AFTER INSERT OR DELETE OR UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_community_rating();

-- ============================================
-- READ RPC FUNCTIONS  (SECURITY INVOKER; created after tables)
-- ============================================
CREATE OR REPLACE FUNCTION public.get_all_communities(max_results integer DEFAULT NULL::integer)
 RETURNS TABLE(id uuid, type community_type, name text, description text, lat double precision, lng double precision, country text, state text, city text, floor_type floor_type_enum, is_covered boolean, schedule jsonb, services jsonb, age_group age_group_enum, categories jsonb, user_id uuid, images jsonb, created_at timestamptz, updated_at timestamptz, average_rating numeric, total_reviews integer)
 LANGUAGE sql STABLE SECURITY INVOKER SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT c.id, c.type, c.name, c.description,
         ST_Y(c.location::geometry) AS lat, ST_X(c.location::geometry) AS lng,
         c.country, c.state, c.city, c.floor_type, c.is_covered, c.schedule,
         c.services, c.age_group, c.categories, c.user_id, c.images,
         c.created_at, c.updated_at, c.average_rating, c.total_reviews
  FROM communities c
  ORDER BY c.created_at DESC
  LIMIT max_results;
$function$;

CREATE OR REPLACE FUNCTION public.communities_by_city(city_name text, max_results integer DEFAULT 100)
 RETURNS TABLE(id uuid, type community_type, name text, description text, lat double precision, lng double precision, country text, state text, city text, floor_type floor_type_enum, is_covered boolean, schedule jsonb, services jsonb, age_group age_group_enum, categories jsonb, user_id uuid, images jsonb, created_at timestamptz, updated_at timestamptz, average_rating numeric, total_reviews integer)
 LANGUAGE sql STABLE SECURITY INVOKER SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT c.id, c.type, c.name, c.description,
         ST_Y(c.location::geometry) AS lat, ST_X(c.location::geometry) AS lng,
         c.country, c.state, c.city, c.floor_type, c.is_covered, c.schedule,
         c.services, c.age_group, c.categories, c.user_id, c.images,
         c.created_at, c.updated_at, c.average_rating, c.total_reviews
  FROM communities c
  WHERE LOWER(c.city) = LOWER(city_name)
  ORDER BY c.name ASC
  LIMIT max_results;
$function$;

CREATE OR REPLACE FUNCTION public.communities_in_view(min_lat double precision, min_lng double precision, max_lat double precision, max_lng double precision, max_results integer DEFAULT 100)
 RETURNS TABLE(id uuid, type community_type, name text, lat double precision, lng double precision, city text, average_rating numeric, total_reviews integer)
 LANGUAGE sql STABLE SECURITY INVOKER SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT c.id, c.type, c.name,
         ST_Y(c.location::geometry) AS lat, ST_X(c.location::geometry) AS lng,
         c.city, c.average_rating, c.total_reviews
  FROM communities c
  WHERE c.location && ST_MakeEnvelope(min_lng, min_lat, max_lng, max_lat, 4326)
  LIMIT max_results;
$function$;

CREATE OR REPLACE FUNCTION public.nearby_communities(user_lat double precision, user_lng double precision, radius_meters double precision DEFAULT 5000, max_results integer DEFAULT 50)
 RETURNS TABLE(id uuid, type community_type, name text, lat double precision, lng double precision, city text, distance_meters double precision, average_rating numeric, total_reviews integer, images jsonb)
 LANGUAGE sql STABLE SECURITY INVOKER SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT c.id, c.type, c.name,
         ST_Y(c.location::geometry) AS lat, ST_X(c.location::geometry) AS lng,
         c.city,
         ST_Distance(c.location, ST_Point(user_lng, user_lat)::geography) AS distance_meters,
         c.average_rating, c.total_reviews, c.images
  FROM communities c
  WHERE ST_DWithin(c.location, ST_Point(user_lng, user_lat)::geography, radius_meters)
  ORDER BY c.location <-> ST_Point(user_lng, user_lat)::geography
  LIMIT max_results;
$function$;

CREATE OR REPLACE FUNCTION public.get_community_by_id(community_id uuid)
 RETURNS json LANGUAGE sql STABLE SECURITY INVOKER SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT row_to_json(result)
  FROM (
    SELECT c.id, c.type, c.name, c.description,
           ST_Y(c.location::geometry) AS lat, ST_X(c.location::geometry) AS lng,
           c.country, c.state, c.city, c.floor_type, c.is_covered, c.schedule,
           c.services, c.age_group, c.categories, c.user_id, c.images,
           c.created_at, c.updated_at, c.average_rating, c.total_reviews,
           json_build_object('name', p.name, 'avatar_url', p.avatar_url) AS profile
    FROM communities c
    LEFT JOIN profiles p ON c.user_id = p.user_id
    WHERE c.id = community_id
    LIMIT 1
  ) result;
$function$;

-- Self-service account deletion. SECURITY DEFINER (must delete from auth.users);
-- restricted to authenticated and validates auth.uid() internally.
CREATE OR REPLACE FUNCTION public.delete_user_account()
 RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public', 'auth'
AS $function$
DECLARE
  current_user_id uuid;
BEGIN
  current_user_id := auth.uid();
  IF current_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'No hay usuario autenticado');
  END IF;
  DELETE FROM public.profiles WHERE user_id = current_user_id;
  DELETE FROM auth.users WHERE id = current_user_id;
  RETURN jsonb_build_object('success', true, 'message', 'Cuenta eliminada exitosamente');
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'message', 'Error al eliminar la cuenta: ' || SQLERRM);
END;
$function$;

-- ============================================
-- FUNCTION EXECUTE GRANTS
-- ============================================
-- Trigger-only functions: not callable as RPCs.
REVOKE EXECUTE ON FUNCTION public.handle_new_user()         FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_community_rating()  FROM PUBLIC, anon, authenticated;
-- Account deletion: signed-in users only.
REVOKE EXECUTE ON FUNCTION public.delete_user_account()     FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.delete_user_account()     TO authenticated;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews     ENABLE ROW LEVEL SECURITY;

-- communities
DROP POLICY IF EXISTS "Communities are viewable by everyone" ON public.communities;
CREATE POLICY "Communities are viewable by everyone" ON public.communities
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can create their own communities" ON public.communities;
CREATE POLICY "Users can create their own communities" ON public.communities
  FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
DROP POLICY IF EXISTS "Users can update own communities" ON public.communities;
CREATE POLICY "Users can update own communities" ON public.communities
  FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
DROP POLICY IF EXISTS "Users can delete own communities" ON public.communities;
CREATE POLICY "Users can delete own communities" ON public.communities
  FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);

-- profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
-- DELETE intentionally has no policy: handled by delete_user_account().

-- reviews
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews
  FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can create reviews" ON public.reviews;
CREATE POLICY "Users can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (((select auth.uid()) IS NOT NULL) AND ((select auth.uid()) = user_id));
DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
CREATE POLICY "Users can update own reviews" ON public.reviews
  FOR UPDATE USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);
DROP POLICY IF EXISTS "Users can delete own reviews" ON public.reviews;
CREATE POLICY "Users can delete own reviews" ON public.reviews
  FOR DELETE USING ((select auth.uid()) = user_id);

-- ============================================
-- STORAGE BUCKETS + POLICIES
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true), ('community-images', 'community-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public buckets are served via the public object endpoint, so there is no broad
-- SELECT policy (removed in 005 to disable listing). Only owner-scoped writes:
DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid() IS NOT NULL AND (storage.foldername(name))[1] = auth.uid()::text);
DROP POLICY IF EXISTS "Users can update own avatar" ON storage.objects;
CREATE POLICY "Users can update own avatar" ON storage.objects
  FOR UPDATE USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
DROP POLICY IF EXISTS "Users can delete own avatar" ON storage.objects;
CREATE POLICY "Users can delete own avatar" ON storage.objects
  FOR DELETE USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Users can upload community images" ON storage.objects;
CREATE POLICY "Users can upload community images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'community-images' AND auth.uid() IS NOT NULL AND (storage.foldername(name))[1] = auth.uid()::text);
DROP POLICY IF EXISTS "Users can update own images" ON storage.objects;
CREATE POLICY "Users can update own images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'community-images' AND (storage.foldername(name))[1] = auth.uid()::text);
DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;
CREATE POLICY "Users can delete own images" ON storage.objects
  FOR DELETE USING (bucket_id = 'community-images' AND (storage.foldername(name))[1] = auth.uid()::text);
