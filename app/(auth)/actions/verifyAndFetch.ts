'use server';

import { verifyOtp } from '@/app/(auth)/database/dbQueries.server';
import { fetchProfileById } from '@/app/(main)/perfil/dbQueries';
import { handleServiceError } from '@/lib/errors/handler';
import { ok, fail } from '@/lib/types/result';
import { checkRateLimit } from '@/lib/utils/rateLimit';
import { AuthErrorCodes } from '@/app/(auth)/errors/codes';

export async function verifyOtpAndFetchProfile(email: string, token: string) {
  try {
    // Rate limit: máximo 5 intentos de verificación por email en 15 minutos
    const rateLimit = checkRateLimit({
      key: `otp:${email}`,
      maxRequests: 5,
      windowMs: 15 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return fail(
        AuthErrorCodes.TOO_MANY_REQUESTS,
        'Demasiados intentos. Espera unos minutos antes de intentar de nuevo.'
      );
    }

    // Verifica el OTP
    const authData = await verifyOtp(email, token);

    // Obtiene el perfil del usuario autenticado
    const profile = await fetchProfileById(authData.user.id);

    return ok({
      user: authData.user,
      session: authData.session,
      profile,
    });
  } catch (error) {
    return handleServiceError(error);
  }
}
