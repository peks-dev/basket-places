-- Add report type for community data-curation reports.
-- Reports reuse public.feedback_reports and store contextual data in metadata.

ALTER TYPE public.feedback_report_type ADD VALUE IF NOT EXISTS 'report';
