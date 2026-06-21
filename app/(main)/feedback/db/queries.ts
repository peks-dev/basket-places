import { createClient } from '@/lib/supabase/server';
import { fromSupabaseError } from '@/lib/errors/database';
import { ErrorCodes } from '@/lib/errors/codes';
import type { FeedbackReportToInsert } from '../types';

export async function insertFeedbackReport(
  report: FeedbackReportToInsert
): Promise<{ id: string }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('feedback_reports')
    .insert({
      user_id: report.user_id,
      type: report.type,
      title: report.title,
      description: report.description,
      metadata: report.metadata ?? {},
    })
    .select('id')
    .single();

  if (error) {
    throw fromSupabaseError(
      error,
      'No se pudo enviar tu feedback. Intenta nuevamente.',
      ErrorCodes.DATABASE_ERROR
    );
  }

  return data as { id: string };
}
