-- Test pgTAP: matriz de autorización (RLS) de public.feedback_reports.
-- Regla: solo usuarios autenticados pueden crear y leer SU propio feedback.
-- No hay edición/borrado directo desde clientes authenticated.

begin;
select plan(7);

-- ─── Setup (postgres: salta RLS). El trigger crea los profiles. ─────────────
insert into auth.users (id, email, raw_user_meta_data) values
  ('11111111-1111-1111-1111-111111111111', 'feedback-a@test.local', '{"name":"Usuario A"}'),
  ('22222222-2222-2222-2222-222222222222', 'feedback-b@test.local', '{"name":"Usuario B"}');

-- Feedback existente de B.
insert into public.feedback_reports (id, user_id, type, title, description) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   '22222222-2222-2222-2222-222222222222',
   'feature',
   'Agregar filtros al mapa',
   'Sería útil filtrar comunidades por tipo y servicios disponibles.');

-- ─── 1. RLS está activa ────────────────────────────────────────────────────
select ok(
  (select relrowsecurity from pg_class
   where relname = 'feedback_reports' and relnamespace = 'public'::regnamespace),
  'RLS está activa en public.feedback_reports'
);

-- ─── 2. Anónimo NO puede leer feedback ─────────────────────────────────────
set local role anon;
select throws_ok(
  $$ select id from public.feedback_reports $$,
  '42501',
  NULL,
  'anónimo NO puede leer feedback'
);

-- ─── 3. Anónimo NO puede crear feedback ────────────────────────────────────
select throws_ok(
  $$ insert into public.feedback_reports (user_id, type, title, description) values
       ('11111111-1111-1111-1111-111111111111', 'bug', 'Bug anónimo',
        'Intento de reporte anónimo que debe ser bloqueado por RLS.') $$,
  '42501',
  NULL,
  'anónimo NO puede crear feedback'
);

-- ─── 4. Usuario A PUEDE crear feedback propio ──────────────────────────────
reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
insert into public.feedback_reports (id, user_id, type, title, description) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   '11111111-1111-1111-1111-111111111111',
   'bug',
   'Error al abrir perfil',
   'Al intentar abrir mi perfil aparece un error inesperado en la pantalla.');

reset role;
select isnt_empty(
  $$ select id from public.feedback_reports where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' $$,
  'usuario A puede crear feedback propio'
);

-- ─── 5. Usuario A NO puede crear feedback para B ───────────────────────────
reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
select throws_ok(
  $$ insert into public.feedback_reports (user_id, type, title, description) values
       ('22222222-2222-2222-2222-222222222222', 'bug', 'Suplantación',
        'Intento de crear feedback asignado a otro usuario autenticado.') $$,
  '42501',
  NULL,
  'usuario A NO puede crear feedback para B'
);

-- ─── 6. Usuario A NO puede leer feedback de B ──────────────────────────────
select is_empty(
  $$ select id from public.feedback_reports where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' $$,
  'usuario A NO puede leer feedback de B'
);

-- ─── 7. Usuario A NO puede actualizar su feedback ──────────────────────────
update public.feedback_reports
set status = 'resolved'
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

reset role;
select is(
  (select status::text from public.feedback_reports where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  'new',
  'usuario A NO puede actualizar feedback desde el cliente'
);

select * from finish();
rollback;
