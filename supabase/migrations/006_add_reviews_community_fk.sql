-- Add the missing foreign key reviews.community_id -> communities(id)
--
-- Context: `public.reviews.community_id` had no foreign key, so reviews could
-- reference non-existent communities and deleting a community left its reviews
-- behind. The audit found 1 such orphan review (its community had been deleted).
--
-- Step 1 removes any orphan reviews (required before the FK can be created).
-- Step 2 adds the FK with ON DELETE CASCADE so a community's reviews are removed
-- with it, matching the existing reviews.user_id -> profiles cascade.

DELETE FROM public.reviews r
WHERE NOT EXISTS (
  SELECT 1 FROM public.communities c WHERE c.id = r.community_id
);

ALTER TABLE public.reviews
  ADD CONSTRAINT reviews_community_id_fkey
  FOREIGN KEY (community_id) REFERENCES public.communities(id) ON DELETE CASCADE;
