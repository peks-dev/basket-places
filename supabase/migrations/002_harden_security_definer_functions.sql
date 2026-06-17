-- Harden SECURITY DEFINER functions for Basket Places
--
-- Context: the Supabase security advisor flagged 13 public functions as
-- `SECURITY DEFINER` executable by the `anon` / `authenticated` roles. Functions
-- that run as DEFINER bypass Row Level Security, so any that don't strictly need
-- elevated privileges were switched to `SECURITY INVOKER`, and the trigger-only
-- functions had their RPC EXECUTE grant revoked.
--
-- All functions already set an explicit `search_path`, so no search_path
-- hardening is required here.
--
-- To verify: run `SELECT proname, prosecdef FROM pg_proc ...` or re-run the
-- security advisor in the Supabase dashboard.

-- ============================================
-- READ RPC FUNCTIONS  ->  SECURITY INVOKER
-- These only SELECT from `communities` / `profiles`, whose RLS SELECT policy is
-- already public (`USING (true)`). They never needed to bypass RLS; running as
-- INVOKER keeps anonymous access working today and automatically respects any
-- future tightening of the SELECT policies (e.g. moderation).
-- ============================================
ALTER FUNCTION public.communities_by_city(text, integer) SECURITY INVOKER;
ALTER FUNCTION public.communities_in_view(double precision, double precision, double precision, double precision, integer) SECURITY INVOKER;
ALTER FUNCTION public.get_all_communities(integer) SECURITY INVOKER;
ALTER FUNCTION public.get_community_by_id(uuid) SECURITY INVOKER;
ALTER FUNCTION public.nearby_communities(double precision, double precision, double precision, integer) SECURITY INVOKER;

-- ============================================
-- VALIDATION FUNCTIONS  ->  SECURITY INVOKER
-- Pure JSONB/text validators used inside CHECK constraints. They touch no tables,
-- so DEFINER bought nothing. EXECUTE grants are intentionally left in place
-- because CHECK constraints invoke them during INSERT/UPDATE.
-- ============================================
ALTER FUNCTION public.is_valid_categories(jsonb) SECURITY INVOKER;
ALTER FUNCTION public.is_valid_schedule(jsonb) SECURITY INVOKER;
ALTER FUNCTION public.is_valid_services(jsonb) SECURITY INVOKER;
ALTER FUNCTION public.is_valid_time_format(text) SECURITY INVOKER;
ALTER FUNCTION public.is_valid_time_range(jsonb) SECURITY INVOKER;

-- ============================================
-- TRIGGER FUNCTIONS  ->  keep SECURITY DEFINER, remove RPC executability
-- These legitimately need DEFINER: `handle_new_user` inserts into `profiles`
-- during signup, and `update_community_rating` updates a community owned by
-- someone other than the reviewer. They run automatically via triggers, so they
-- should NOT be callable as REST RPCs. Revoking EXECUTE does not affect trigger
-- firing.
-- ============================================
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_community_rating() FROM PUBLIC, anon, authenticated;

-- ============================================
-- INTENTIONALLY LEFT AS SECURITY DEFINER
-- public.delete_user_account(): must delete from `auth.users`, which requires
-- elevated privileges. It is already restricted to the `authenticated` role and
-- validates `auth.uid()` internally before deleting only the caller's own data.
-- The advisor warning for this function is an accepted, reviewed false positive.
-- ============================================
