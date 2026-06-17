-- Restrict listing on public storage buckets
--
-- Context: the security advisor flagged the `avatars` and `community-images`
-- buckets for having a broad SELECT policy on `storage.objects`
-- (`USING (bucket_id = '...')`). That policy lets any client enumerate every
-- file in the bucket via the storage `list()` API, exposing more than intended.
--
-- These buckets are PUBLIC, so individual objects are served through the public
-- endpoint (`/storage/v1/object/public/<bucket>/<path>`) which bypasses RLS.
-- The app only ever calls `upload()`, `getPublicUrl()` and `remove()` — never
-- `list()` — so dropping the broad SELECT policies removes enumeration while
-- public image URLs keep working. INSERT/UPDATE/DELETE owner policies are
-- unchanged.

DROP POLICY IF EXISTS "Avatars are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Community images are publicly accessible" ON storage.objects;
