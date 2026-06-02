'use server';

import {
  getCurrentUser,
  deleteAccountFromDb,
} from '@/app/(auth)/database/dbQueries.server';
import { type Result, ok, fail } from '@/lib/types/result';
import { AuthErrorCodes } from '@/app/(auth)/errors/codes';
import { ErrorCodes } from '@/lib/errors/codes';
import { handleServiceError } from '@/lib/errors/handler';
import { ProfileDbResponse } from '@/app/(main)/perfil/types';
import { deleteImage } from '@/lib/supabase/storage';
import { checkRateLimit } from '@/lib/utils/rateLimit';

export async function deleteAccount(
  currentProfile: ProfileDbResponse
): Promise<Result<ProfileDbResponse>> {
  try {
    // Rate limit: máximo 3 intentos por usuario en 1 hora
    const rateLimit = checkRateLimit({
      key: `delete:${currentProfile.user_id}`,
      maxRequests: 3,
      windowMs: 60 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return fail(
        AuthErrorCodes.TOO_MANY_REQUESTS,
        'Demasiados intentos. Espera una hora antes de intentar de nuevo.'
      );
    }

    // 1. Validar autenticación usando getCurrentUser()
    const user = await getCurrentUser();

    if (!user) {
      return fail(
        AuthErrorCodes.UNAUTHORIZED,
        'Debes iniciar sesión para eliminar tu cuenta.'
      );
    }

    // 2. Verificar ownership
    if (user.id !== currentProfile.user_id) {
      return fail(
        ErrorCodes.FORBIDDEN,
        'No tienes permiso para eliminar esta cuenta.'
      );
    }

    // 3. Eliminar avatar del storage si existe (con verificación de ownership)
    if (currentProfile.avatar_url) {
      const filePath = currentProfile.avatar_url.split('/avatars/')[1];
      // Verificar que el path del avatar pertenece al usuario autenticado
      // Path esperado: {user_id}/{filename}
      if (filePath && filePath.startsWith(`${user.id}/`)) {
        await deleteImage(filePath, 'AVATARS');
      }
    }

    // 4. Eliminar cuenta de la base de datos
    await deleteAccountFromDb();

    return ok(currentProfile);
  } catch (error) {
    return handleServiceError(error);
  }
}
