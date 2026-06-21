'use server';

import { getCurrentUser } from '@/app/(auth)/database/dbQueries.server';
import { AuthErrorCodes } from '@/app/(auth)/errors/codes';
import { handleServiceError } from '@/lib/errors/handler';
import { validateOrThrow } from '@/lib/errors/zodHandler';
import { type Result, fail, ok } from '@/lib/types/result';
import { insertFeedbackReport } from '../db/queries';
import { feedbackFormSchema } from '../schemas/feedbackSchema';
import type { FeedbackFormData } from '../types';

export async function createFeedbackReport(
  feedback: FeedbackFormData
): Promise<Result<{ id: string }>> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return fail(
        AuthErrorCodes.UNAUTHORIZED,
        'Debes iniciar sesión para enviar feedback.'
      );
    }

    const validated = validateOrThrow(feedbackFormSchema, feedback);

    const created = await insertFeedbackReport({
      ...validated,
      user_id: user.id,
      metadata: {
        source: 'feedback_form',
      },
    });

    return ok(created);
  } catch (error) {
    return handleServiceError(error);
  }
}
