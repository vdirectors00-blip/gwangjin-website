-- =====================================================================
-- Storage 버킷 RLS 정책
--   - 공개(anon): 다운로드(SELECT) 허용 — Public bucket이라 자동이지만 명시
--   - 인증(authenticated): 업로드(INSERT)/수정(UPDATE)/삭제(DELETE) 허용
--   - 대상 버킷: 'images', 'videos'
-- 실행: Supabase Dashboard → SQL Editor → New Query → Run
-- =====================================================================

-- ----- images -----------------------------------------------------------
drop policy if exists "public_read_images"   on storage.objects;
drop policy if exists "auth_insert_images"   on storage.objects;
drop policy if exists "auth_update_images"   on storage.objects;
drop policy if exists "auth_delete_images"   on storage.objects;

create policy "public_read_images"
  on storage.objects for select
  using (bucket_id = 'images');

create policy "auth_insert_images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'images');

create policy "auth_update_images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'images')
  with check (bucket_id = 'images');

create policy "auth_delete_images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'images');

-- ----- videos -----------------------------------------------------------
drop policy if exists "public_read_videos"   on storage.objects;
drop policy if exists "auth_insert_videos"   on storage.objects;
drop policy if exists "auth_update_videos"   on storage.objects;
drop policy if exists "auth_delete_videos"   on storage.objects;

create policy "public_read_videos"
  on storage.objects for select
  using (bucket_id = 'videos');

create policy "auth_insert_videos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'videos');

create policy "auth_update_videos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'videos')
  with check (bucket_id = 'videos');

create policy "auth_delete_videos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'videos');
