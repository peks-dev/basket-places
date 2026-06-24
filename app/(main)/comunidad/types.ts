import { UpdateCommunityFormData } from '@/contribuir/schemas/updateCommunitySchema';

// ============================================
// TIPOS BASE
// ============================================

export interface CourtId {
  id: string;
}

export type CommunityType = 'pickup' | 'club';
export type FloorType = 'cement' | 'parquet' | 'asphalt' | 'synthetic';
export type AgeGroup = 'teens' | 'young_adults' | 'veterans' | 'mixed';
export type Gender = 'male' | 'female' | 'mixed';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Service {
  transport: boolean;
  store: boolean;
  wifi: boolean;
  bathroom: boolean;
}

export interface Schedule {
  days: string[];
  time: {
    start: string;
    end: string;
  };
}

export interface Category {
  category: string;
  min_age: number;
  max_age: number | null;
  genders: Gender[];
}

// ============================================
// DATOS DEL FORMULARIO (STORE DE ZUSTAND)
// ============================================

/**
 * Tipo para el estado del formulario multi-paso en Zustand.
 * Contiene valores opcionales (null) mientras el usuario completa el formulario.
 * Las imágenes pueden ser File (recién seleccionadas) o string (URLs ya subidas).
 */
export interface CommunityFormData {
  id: string | null;
  type: CommunityType | null;
  name: string;
  description: string;
  location: Coordinates | null;
  images: (File | string)[]; // File = nuevo, string = URL ya subida
  floor_type: FloorType | null;
  is_covered: boolean;
  schedule: Schedule[];
  services: Service;
  age_group: AgeGroup | null;
  categories: Category[] | null;
  user_id?: string;
}

// ============================================
// DATOS PARA INSERCIÓN EN BASE DE DATOS
// ============================================

/**
 * Tipo para insertar una comunidad en Supabase.
 * Todos los campos requeridos están presentes y transformados al formato correcto.
 */
export interface CommunityInsertData extends Omit<
  CommunityFormData,
  'user_id' | 'images' | 'floor_type' | 'id' | 'location'
> {
  id: string; // Requerido
  user_id: string; // Requerido
  city: string; // Obtenido desde reverseGeocode
  state: string | null; // Obtenido desde reverseGeocode
  country: string; // Obtenido desde reverseGeocode
  images: string[]; // Solo URLs después de subir a storage
  floor_type: FloorType; // Requerido después de análisis de AI
  location: `POINT(${number} ${number})`; // Formato PostGIS WKT
}

export type CommunityUpdateData = Omit<
  UpdateCommunityFormData,
  'id' | 'images' | 'location'
> & {
  city: string; // Obtenido desde reverseGeocode
  state: string | null; // Obtenido desde reverseGeocode
  country: string; // Obtenido desde reverseGeocode
  images: string[]; // Final array para DB
  location: `POINT(${number} ${number})`; // Formato PostGIS WKT
  floor_type: FloorType; // AI result (no null)
  is_covered: boolean; // AI result
};

// ============================================
// DATOS COMPLETOS DESDE LA BASE DE DATOS
// ============================================

/**
 * Tipo para comunidades recuperadas de la base de datos.
 * Representa el estado completo y validado de una comunidad.
 */
export interface Community {
  id: string;
  type: CommunityType;
  name: string;
  description: string;
  location: Coordinates;
  city: string;
  state: string | null;
  country: string;
  images: string[];
  floor_type: FloorType;
  is_covered: boolean;
  schedule: Schedule[];
  services: Service;
  age_group: AgeGroup | null;
  categories: Category[] | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  average_rating: number;
  total_reviews: number;
}

// ============================================
// RESPUESTAS DE FUNCIONES RPC
// ============================================

/**
 * Respuesta completa de las funciones RPC:
 * - get_community_by_id
 */
export interface CommunityFullResponse {
  id: string;
  type: CommunityType;
  name: string;
  description: string;
  lat: number;
  lng: number;
  country: string;
  state: string | null;
  city: string;
  floor_type: FloorType;
  is_covered: boolean;
  schedule: Schedule[];
  services: Service;
  age_group: AgeGroup | null;
  categories: Category[] | null;
  user_id: string;
  images: string[];
  created_at: string;
  updated_at: string;
  average_rating: number;
  total_reviews: number;
  profile: {
    name: string;
    avatar_url: string | null;
  };
}

/**
 * Respuesta de la función communities_in_view (antes de transformar)
 */
export interface CommunityMapResponse {
  id: string;
  type: CommunityType;
  images: string[];
  name: string;
  lat: number;
  lng: number;
  city: string;
  average_rating: number;
  total_reviews: number;
}

// ============================================
// TIPOS TRANSFORMADOS PARA USO EN COMPONENTES
// ============================================

export interface CommunityCard {
  id: string;
  name: string;
  type: CommunityType;
  images: string[];
  average_rating: number;
  total_reviews: number;
}

// ============================================
// TIPOS PARA EL MAPA
// ============================================

export interface CommunityForMap extends CommunityCard {
  location: Coordinates;
}

// ============================================
// ALIAS PARA RETROCOMPATIBILIDAD (DEPRECADO)
// ============================================

/**
 * @deprecated Use CommunityFormData instead
 */
export type communityData = CommunityFormData;

/**
 * @deprecated Use CommunityInsertData instead
 */
export type CommunityDataForDB = CommunityInsertData;

export type CommunityReportReason =
  | 'incorrect_data'
  | 'does_not_exist'
  | 'duplicate'
  | 'spam'
  | 'other';

export interface CommunityReportData {
  community_id: string;
  community_name: string;
  reason: CommunityReportReason;
  description: string;
}
