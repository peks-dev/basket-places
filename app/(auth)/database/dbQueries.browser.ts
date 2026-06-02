// app/(auth)/database/dbQueries.browser.ts
import { supabase } from '@/lib/supabase/client';
import { fromSupabaseError } from '@/lib/errors/database';
import { ErrorCodes } from '@/lib/errors/codes';
import type {
  AuthStateChangeCallback,
  AuthSubscription,
  Session,
} from '@/lib/supabase/types';

/**
 * Envía código OTP al email para iniciar sesión
 * @param email - Email del usuario
 */
export async function sendLoginCode(email: string): Promise<void> {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) {
    throw fromSupabaseError(
      error,
      'Error enviando código de verificación',
      ErrorCodes.DATABASE_ERROR
    );
  }
}

/**
 * Cierra la sesión del usuario actual
 */
export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw fromSupabaseError(
      error,
      'Error cerrando sesión',
      ErrorCodes.DATABASE_ERROR
    );
  }
}

/**
 * Establece manualmente la sesión en el cliente de Supabase.
 * Útil después de la verificación del lado del servidor para sincronizar el cliente.
 * @param session - El objeto de sesión de Supabase.
 */
export async function setSession(session: Session): Promise<void> {
  const { error } = await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  if (error) {
    throw fromSupabaseError(
      error,
      'Error al establecer la sesión del cliente',
      ErrorCodes.DATABASE_ERROR
    );
  }
}

/**
 * Escucha los cambios en el estado de autenticación
 * @param callback - Función que se ejecuta cuando cambia el estado
 * @returns Objeto con subscription para cleanup
 */
export function onAuthStateChange(
  callback: AuthStateChangeCallback
): AuthSubscription {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(callback);
  return { data: { subscription }, error: null };
}
