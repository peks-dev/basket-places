'use server';

import { getCurrentUser } from '@/app/(auth)/database/dbQueries.server';
import { AuthErrorCodes } from '@/app/(auth)/errors/codes';
import { insertFeedbackReport } from '@/app/(main)/feedback/db/queries';
import { getCommunityById } from '@/app/(main)/comunidad/dbQueries';
import { ErrorCodes } from '@/lib/errors/codes';
import { fromSupabaseError } from '@/lib/errors/database';
import { handleServiceError } from '@/lib/errors/handler';
import { validateOrThrow } from '@/lib/errors/zodHandler';
import { createClient } from '@/lib/supabase/server';
import { type Result, fail, ok } from '@/lib/types/result';
import { communityReportSchema } from '../schemas/communityReportSchema';
import type { CommunityReportData } from '../types';

const REPORT_COOLDOWN_MONTHS = 2;

async function hasRecentCommunityReport({
  communityId,
  userId,
}: {
  communityId: string;
  userId: string;
}): Promise<boolean> {
  const supabase = await createClient();
  const cooldownStart = new Date();
  cooldownStart.setMonth(cooldownStart.getMonth() - REPORT_COOLDOWN_MONTHS);

  const { data, error } = await supabase
    .from('feedback_reports')
    .select('id')
    .eq('user_id', userId)
    .eq('type', 'report')
    .eq('metadata->>community_id', communityId)
    .gte('created_at', cooldownStart.toISOString())
    .limit(1);

  if (error) {
    throw fromSupabaseError(
      error,
      'No se pudo verificar si ya habías reportado esta comunidad.',
      ErrorCodes.DATABASE_ERROR
    );
  }

  return Boolean(data?.length);
}

export async function reportCommunity(
  report: CommunityReportData
): Promise<Result<{ id: string }>> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return fail(
        AuthErrorCodes.UNAUTHORIZED,
        'Debes iniciar sesión para reportar una comunidad.'
      );
    }

    const validated = validateOrThrow(communityReportSchema, report);
    const community = await getCommunityById(validated.community_id);

    if (!community) {
      return fail(
        ErrorCodes.COMMUNITY_NOT_FOUND,
        'No encontramos la comunidad que intentas reportar.'
      );
    }

    if (community.user_id === user.id) {
      return fail(
        ErrorCodes.FORBIDDEN,
        'No puedes reportar una comunidad que tú mismo registraste. Puedes editarla para corregir la información.'
      );
    }

    const alreadyReportedRecently = await hasRecentCommunityReport({
      communityId: validated.community_id,
      userId: user.id,
    });

    if (alreadyReportedRecently) {
      return fail(
        ErrorCodes.ALREADY_EXISTS,
        'Ya reportaste esta comunidad recientemente. Puedes volver a reportarla después de 2 meses.'
      );
    }

    const created = await insertFeedbackReport({
      type: 'report',
      description: validated.description,
      user_id: user.id,
      metadata: {
        source: 'community_page',
        community_id: validated.community_id,
        community_name: community.name,
        reason: validated.reason,
      },
    });

    return ok(created);
  } catch (error) {
    return handleServiceError(error);
  }
}
