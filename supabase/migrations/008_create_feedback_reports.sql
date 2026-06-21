-- Create authenticated user feedback reports.
--
-- Context: feedback is the qualitative layer of the agentic observability stack.
-- Users can report bugs, request features, and suggest improvements directly in
-- Basket Places without adding an external roadmap/feedback SaaS.

-- ============================================
-- ENUMS
-- ============================================
DO $$ BEGIN
  CREATE TYPE public.feedback_report_type AS ENUM ('bug', 'feature', 'improvement');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.feedback_report_status AS ENUM ('new', 'triaged', 'planned', 'resolved', 'dismissed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================
-- TABLES
-- ============================================
CREATE TABLE IF NOT EXISTS public.feedback_reports (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES public.profiles(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  type        public.feedback_report_type NOT NULL,
  title       text NOT NULL CHECK (char_length(title) >= 5 AND char_length(title) <= 120),
  description text NOT NULL CHECK (char_length(description) >= 20 AND char_length(description) <= 2000),
  status      public.feedback_report_status NOT NULL DEFAULT 'new',
  metadata    jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object'),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Keep updated_at in sync with modifications.
DROP TRIGGER IF EXISTS handle_feedback_reports_updated_at ON public.feedback_reports;
CREATE TRIGGER handle_feedback_reports_updated_at
  BEFORE UPDATE ON public.feedback_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS feedback_reports_user_id_created_at_idx
  ON public.feedback_reports (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS feedback_reports_status_created_at_idx
  ON public.feedback_reports (status, created_at DESC);

CREATE INDEX IF NOT EXISTS feedback_reports_type_created_at_idx
  ON public.feedback_reports (type, created_at DESC);

-- ============================================
-- PRIVILEGES
-- ============================================
GRANT ALL ON TABLE public.feedback_reports TO authenticated, service_role;
REVOKE ALL ON TABLE public.feedback_reports FROM anon;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.feedback_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create own feedback reports" ON public.feedback_reports;
CREATE POLICY "Users can create own feedback reports" ON public.feedback_reports
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can read own feedback reports" ON public.feedback_reports;
CREATE POLICY "Users can read own feedback reports" ON public.feedback_reports
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- No UPDATE/DELETE policy for authenticated users: submitted feedback should be
-- append-only from the client for now. Triage/status changes are reserved for
-- trusted server-side tooling using service_role.
