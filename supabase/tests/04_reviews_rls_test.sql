-- Test pgTAP: matriz de autorización (RLS) de public.reviews.
-- Lectura pública; solo un usuario autenticado crea reseñas como sí mismo; y
-- solo el autor puede editar/borrar su reseña.

begin;
select plan(5);

-- ─── Setup (postgres: salta RLS) ────────────────────────────────────────────
insert into auth.users (id, email, raw_user_meta_data) values
  ('11111111-1111-1111-1111-111111111111', 'rls-a@test.local', '{"name":"Usuario A"}'),
  ('22222222-2222-2222-2222-222222222222', 'rls-b@test.local', '{"name":"Usuario B"}');

-- Una comunidad (dueña: A) para que las reseñas tengan a qué apuntar.
insert into public.communities
  (id, type, name, description, location, city, images, floor_type, is_covered, schedule, services, age_group, user_id)
values
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'pickup', 'Cancha C',
   'Comunidad de prueba para los tests de RLS de reseñas con pgTAP.',
   'SRID=4326;POINT(-99.13 19.43)', 'CDMX',
   '["https://h/1.jpg","https://h/2.jpg"]'::jsonb, 'cement', false,
   '[{"days":["monday"],"time":{"start":"08:00","end":"20:00"}}]'::jsonb,
   '{"wifi":false,"store":false,"bathroom":false,"transport":false}'::jsonb,
   'mixed', '11111111-1111-1111-1111-111111111111');

-- Una reseña existente, escrita por B.
insert into public.reviews (id, community_id, user_id, rating, comment) values
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
   'cccccccc-cccc-cccc-cccc-cccccccccccc',
   '22222222-2222-2222-2222-222222222222', 4, 'Reseña de B');

-- ─── 1. Anónimo PUEDE leer reseñas (SELECT público) ─────────────────────────
set local role anon;
select isnt_empty(
  $$ select id from public.reviews where id = 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee' $$,
  'anónimo puede leer reseñas (política SELECT pública)'
);

-- ─── 2. Anónimo NO puede crear reseñas ──────────────────────────────────────
select throws_ok(
  $$ insert into public.reviews (id, community_id, user_id, rating, comment) values
       ('dddddddd-dddd-dddd-dddd-dddddddddddd',
        'cccccccc-cccc-cccc-cccc-cccccccccccc',
        '11111111-1111-1111-1111-111111111111', 5, 'spam anónimo') $$,
  '42501',
  NULL,
  'anónimo NO puede crear reseñas (RLS lo bloquea)'
);

-- ─── 3. Usuario A PUEDE crear SU propia reseña ──────────────────────────────
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
insert into public.reviews (id, community_id, user_id, rating, comment) values
  ('ffffffff-ffff-ffff-ffff-ffffffffffff',
   'cccccccc-cccc-cccc-cccc-cccccccccccc',
   '11111111-1111-1111-1111-111111111111', 5, 'Reseña de A');

reset role;
select isnt_empty(
  $$ select id from public.reviews where id = 'ffffffff-ffff-ffff-ffff-ffffffffffff' $$,
  'usuario A puede crear su propia reseña'
);

-- ─── 4. Usuario A NO puede editar la reseña de B ────────────────────────────
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
update public.reviews set comment = 'Hackeada por A'
where id = 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee';

reset role;
select is(
  (select comment from public.reviews where id = 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),
  'Reseña de B',
  'usuario A NO puede editar la reseña de B (RLS filtra el UPDATE)'
);

-- ─── 5. Usuario A NO puede borrar la reseña de B ────────────────────────────
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
delete from public.reviews where id = 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee';

reset role;
select isnt_empty(
  $$ select id from public.reviews where id = 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee' $$,
  'usuario A NO puede borrar la reseña de B (sigue existiendo)'
);

select * from finish();
rollback;
