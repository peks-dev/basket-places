-- Add an explicit INSERT policy to public.profiles
--
-- Context: profiles rows are created automatically by the `handle_new_user`
-- trigger (SECURITY DEFINER, bypasses RLS) on signup. There is no explicit
-- INSERT policy, so RLS default-denies any other insert. This is safe today, but
-- if the trigger is ever changed or disabled there would be no way to create a
-- profile, and the app cannot fall back to an upsert.
--
-- This policy lets an authenticated user insert ONLY their own profile row
-- (user_id must match their auth.uid()). It does not change current behavior;
-- it adds resilience. `(select auth.uid())` is used so the check is evaluated
-- once per statement instead of per row (matches the existing UPDATE policy).
--
-- DELETE remains intentionally without a policy: account deletion is handled
-- exclusively by the SECURITY DEFINER function public.delete_user_account().

-- Idempotent: drop first so the migration replays cleanly on a fresh database
-- (the baseline dump already contains this policy). On the remote this migration
-- is already recorded as applied, so editing it here does not re-execute it.
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);
