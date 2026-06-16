-- Optimize RLS init-plan on public.communities
--
-- Context: the Supabase performance advisor flagged the three write policies on
-- `communities` (INSERT / UPDATE / DELETE) for re-evaluating `auth.uid()` once
-- per row. Wrapping the call in a scalar subquery `(select auth.uid())` lets
-- Postgres evaluate it a single time per statement (init-plan), which scales much
-- better. This is purely a performance change; the access rules are identical.
--
-- The SELECT policy is unaffected (it is `USING (true)`), and the `profiles` /
-- `reviews` policies already use the `(select auth.uid())` form.

ALTER POLICY "Users can delete own communities" ON public.communities
  USING ((select auth.uid()) = user_id);

ALTER POLICY "Users can create their own communities" ON public.communities
  WITH CHECK ((select auth.uid()) = user_id);

ALTER POLICY "Users can update own communities" ON public.communities
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);
