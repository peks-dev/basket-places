-- Test pgTAP: matriz de autorización (RLS) de public.profiles.
-- Lectura pública; solo el dueño edita su perfil; sin DELETE directo (el borrado
-- de cuenta va por la función SECURITY DEFINER delete_user_account).

begin;
select plan(5);

-- ─── Setup (postgres: salta RLS). El trigger crea los profiles; fijamos nombres. ─
insert into auth.users (id, email, raw_user_meta_data) values
  ('11111111-1111-1111-1111-111111111111', 'rls-a@test.local', '{"name":"Usuario A"}'),
  ('22222222-2222-2222-2222-222222222222', 'rls-b@test.local', '{"name":"Usuario B"}');
update public.profiles set name = 'A Original' where user_id = '11111111-1111-1111-1111-111111111111';
update public.profiles set name = 'B Original' where user_id = '22222222-2222-2222-2222-222222222222';

-- ─── 1. Anónimo PUEDE leer perfiles (SELECT público) ────────────────────────
set local role anon;
select isnt_empty(
  $$ select user_id from public.profiles where user_id = '11111111-1111-1111-1111-111111111111' $$,
  'anónimo puede leer perfiles (política SELECT pública)'
);

-- ─── 2. Usuario A PUEDE editar SU propio perfil ─────────────────────────────
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
update public.profiles set name = 'A Editado' where user_id = '11111111-1111-1111-1111-111111111111';

reset role;
select is(
  (select name from public.profiles where user_id = '11111111-1111-1111-1111-111111111111'),
  'A Editado',
  'usuario A puede editar su propio perfil'
);

-- ─── 3. Usuario A NO puede editar el perfil de B ────────────────────────────
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
update public.profiles set name = 'Hackeado por A' where user_id = '22222222-2222-2222-2222-222222222222';

reset role;
select is(
  (select name from public.profiles where user_id = '22222222-2222-2222-2222-222222222222'),
  'B Original',
  'usuario A NO puede editar el perfil de B (RLS filtra el UPDATE)'
);

-- ─── 4. Anónimo NO puede editar ningún perfil ───────────────────────────────
set local role anon;
update public.profiles set name = 'Hackeado anon' where user_id = '22222222-2222-2222-2222-222222222222';

reset role;
select is(
  (select name from public.profiles where user_id = '22222222-2222-2222-2222-222222222222'),
  'B Original',
  'anónimo NO puede editar perfiles'
);

-- ─── 5. Usuario A NO puede borrar su perfil por DELETE directo ───────────────
-- (no hay política DELETE; el borrado de cuenta es exclusivo de delete_user_account)
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
delete from public.profiles where user_id = '11111111-1111-1111-1111-111111111111';

reset role;
select isnt_empty(
  $$ select user_id from public.profiles where user_id = '11111111-1111-1111-1111-111111111111' $$,
  'usuario A NO puede borrar su perfil con DELETE directo (sin política DELETE)'
);

select * from finish();
rollback;
