export type FeedbackReportType = 'bug' | 'feature' | 'improvement' | 'report';
export type FeedbackFormType = Exclude<FeedbackReportType, 'report'>;

export interface FeedbackFormData {
  type: FeedbackFormType;
  description: string;
}

export interface FeedbackReportToInsert {
  type: FeedbackReportType;
  description: string;
  user_id: string;
  metadata?: Record<string, string | number | boolean | null>;
}
