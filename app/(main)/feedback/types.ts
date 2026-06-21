export type FeedbackReportType = 'bug' | 'feature' | 'improvement';

export interface FeedbackFormData {
  type: FeedbackReportType;
  description: string;
}

export interface FeedbackReportToInsert extends FeedbackFormData {
  user_id: string;
  metadata?: Record<string, string | number | boolean | null>;
}
