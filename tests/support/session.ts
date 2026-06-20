import fs from 'fs';
import { AUTH_FILE } from './users';

/**
 * Extrae el access_token del usuario autenticado desde el storageState guardado
 * por el proyecto `setup`. @supabase/ssr guarda la sesión en una (o varias)
 * cookies `sb-<ref>-auth-token` con el valor codificado como `base64-<json>`.
 */
export function getStoredAccessToken(): string {
  const state = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
  const chunks: { name: string; value: string }[] = (state.cookies ?? [])
    .filter((c: { name: string }) => c.name.includes('auth-token'))
    .sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name)
    );

  if (chunks.length === 0) {
    throw new Error('No se encontró cookie de sesión en el storageState');
  }

  const raw = chunks
    .map((c) => c.value)
    .join('')
    .replace(/^base64-/, '');
  const session = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
  return session.access_token as string;
}
