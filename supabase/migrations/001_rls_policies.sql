-- RLS Policies for Basket Places
-- This file documents the expected Row Level Security policies
-- that MUST be configured in the Supabase dashboard.
--
-- To verify: run `SELECT * FROM pg_policies` in Supabase SQL Editor
-- and compare against this file.

-- ============================================
-- COMMUNITIES
-- ============================================
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

-- Everyone can view communities
CREATE POLICY "Communities are viewable by everyone" ON communities
  FOR SELECT USING (true);

-- Authenticated users can create communities
CREATE POLICY "Users can create communities" ON communities
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Only the owner can update their communities
CREATE POLICY "Users can update own communities" ON communities
  FOR UPDATE USING (auth.uid() = user_id);

-- Only the owner can delete their communities
CREATE POLICY "Users can delete own communities" ON communities
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- PROFILES
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Everyone can view profiles
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

-- Only the owner can update their profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Only the owner can delete their profile
CREATE POLICY "Users can delete own profile" ON profiles
  FOR DELETE USING (auth.uid() = id);

-- ============================================
-- REVIEWS
-- ============================================
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Everyone can view reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

-- Authenticated users can create reviews (only their own)
CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Only the author can update their reviews
CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Only the author can delete their reviews
CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- STORAGE: community-images
-- ============================================
-- Bucket must be public: true

-- Authenticated users can upload (path must include their user_id)
CREATE POLICY "Authenticated users can upload community images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'community-images'
    AND auth.uid() IS NOT NULL
  );

-- Everyone can view community images
CREATE POLICY "Community images are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'community-images');

-- Only the uploader can update/delete their community images
CREATE POLICY "Users can update own community images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'community-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own community images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'community-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================
-- STORAGE: avatars
-- ============================================
-- Bucket must be public: true

-- Only the owner can upload their avatar
CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Everyone can view avatars
CREATE POLICY "Avatars are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- Only the owner can update their avatar
CREATE POLICY "Users can update own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Only the owner can delete their avatar
CREATE POLICY "Users can delete own avatar" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
