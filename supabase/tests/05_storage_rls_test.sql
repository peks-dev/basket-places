-- Test pgTAP: RLS de storage.objects para los buckets avatars y community-images.
-- Regla: cada usuario solo puede subir/editar/borrar archivos dentro de SU carpeta
-- (la primera carpeta del path debe ser su uid). Anónimos no pueden subir.
--
-- Nota de técnica: antes de cada cambio de identidad hacemos `reset role` (vuelve
-- a postgres, superusuario, que sí puede asumir cualquier rol) y, para el caso
-- anónimo, limpiamos las claims para que auth.uid() sea NULL.

begin;
select plan(3);

-- ─── Setup (postgres: salta RLS) ────────────────────────────────────────────
insert into auth.users (id, email, raw_user_meta_data) values
  ('11111111-1111-1111-1111-111111111111', 'rls-a@test.local', '{"name":"Usuario A"}'),
  ('22222222-2222-2222-2222-222222222222', 'rls-b@test.local', '{"name":"Usuario B"}');

-- Nota: el borrado/edición directos sobre storage.objects están bloqueados por el
-- trigger storage.protect_delete (hay que usar la Storage API), así que aquí solo
-- se ejercita la autorización de SUBIDA (INSERT), que es la que gobierna RLS por SQL.

-- ─── 1. Usuario A PUEDE subir a SU propia carpeta ───────────────────────────
reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
insert into storage.objects (bucket_id, name) values
  ('avatars', '11111111-1111-1111-1111-111111111111/avatar.png');

reset role;
select isnt_empty(
  $$ select id from storage.objects
     where bucket_id = 'avatars' and name = '11111111-1111-1111-1111-111111111111/avatar.png' $$,
  'usuario A puede subir a su propia carpeta de avatars'
);

-- ─── 2. Usuario A NO puede subir a la carpeta de B ──────────────────────────
reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select throws_ok(
  $$ insert into storage.objects (bucket_id, name) values
       ('avatars', '22222222-2222-2222-2222-222222222222/hack.png') $$,
  '42501',
  NULL,
  'usuario A NO puede subir a la carpeta de otro usuario'
);

-- ─── 3. Anónimo NO puede subir (auth.uid() es NULL) ─────────────────────────
reset role;
set local role anon;
set local request.jwt.claims to '';
select throws_ok(
  $$ insert into storage.objects (bucket_id, name) values
       ('avatars', '11111111-1111-1111-1111-111111111111/x.png') $$,
  '42501',
  NULL,
  'anónimo NO puede subir archivos'
);

select * from finish();
rollback;
