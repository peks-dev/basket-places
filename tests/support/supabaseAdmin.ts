import { createClient, type User } from '@supabase/supabase-js';
import { LOCAL_SUPABASE } from './config';

/**
 * Cliente admin (service_role) contra la Supabase LOCAL. Salta RLS, así que se
 * usa SOLO en utilidades de test para preparar y limpiar datos: crear usuarios
 * sin OTP, sembrar comunidades/reviews de un dueño concreto, y borrar todo al
 * terminar. Nunca se importa desde la app.
 */
export const admin = createClient(
  LOCAL_SUPABASE.url,
  LOCAL_SUPABASE.serviceRoleKey,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

/**
 * Crea (o recupera, si ya existe) un usuario confirmado por email. `email_confirm`
 * lo deja listo para usar sin pasar por el correo de confirmación.
 */
export async function ensureUser(email: string): Promise<User> {
  const { data, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
  });

  if (data?.user) return data.user;

  // Ya existía: localizarlo paginando la lista de usuarios.
  if (error) {
    const { data: list } = await admin.auth.admin.listUsers();
    const existing = list?.users.find((u) => u.email === email);
    if (existing) return existing;
    throw error;
  }

  throw new Error(`No se pudo crear ni encontrar el usuario ${email}`);
}

/** Borra un usuario por email (y, por cascada de FKs, sus datos). */
export async function deleteUser(email: string): Promise<void> {
  const { data: list } = await admin.auth.admin.listUsers();
  const user = list?.users.find((u) => u.email === email);
  if (user) {
    await admin.auth.admin.deleteUser(user.id);
  }
}

export interface SeededCommunity {
  id: string;
  name: string;
}

/**
 * Inserta directamente una comunidad válida (sin pasar por el wizard de la UI),
 * propiedad de `ownerUserId`. Útil para preparar datos de reviews y de
 * autorización. Cumple todos los CHECK del esquema (PostGIS, schedule, etc.).
 */
export async function createCommunity(
  ownerUserId: string,
  overrides: Record<string, unknown> = {}
): Promise<SeededCommunity> {
  const base = {
    // La tabla no tiene default para `id`; la app lo genera, así que aquí también.
    id: crypto.randomUUID(),
    type: 'pickup',
    name: 'Cancha E2E',
    description:
      'Comunidad sembrada para tests automatizados de reviews y autorización del proyecto.',
    // EWKT como texto: PostgREST lo inserta y Postgres lo castea a geography.
    location: 'SRID=4326;POINT(-99.1332 19.4326)',
    country: 'México',
    state: 'CDMX',
    city: 'CDMX',
    // Host permitido por next.config (no cargan, pero no rompen next/image).
    images: [
      'https://bvvmbnevtogthudqnjjv.supabase.co/storage/v1/object/public/community-images/seed-1.jpg',
      'https://bvvmbnevtogthudqnjjv.supabase.co/storage/v1/object/public/community-images/seed-2.jpg',
    ],
    floor_type: 'cement',
    is_covered: false,
    schedule: [{ days: ['monday'], time: { start: '08:00', end: '20:00' } }],
    services: { wifi: false, store: false, bathroom: false, transport: false },
    age_group: 'mixed',
    user_id: ownerUserId,
  };

  const { data, error } = await admin
    .from('communities')
    .insert({ ...base, ...overrides })
    .select('id, name')
    .single();

  if (error) {
    throw new Error(`No se pudo sembrar la comunidad: ${error.message}`);
  }
  return data as SeededCommunity;
}

/** Borra una comunidad (y sus reviews por cascada). */
export async function deleteCommunity(id: string): Promise<void> {
  await admin.from('communities').delete().eq('id', id);
}
