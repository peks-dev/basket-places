-- Test pgTAP: matriz de autorización (RLS) de public.communities.
-- Verifica el comportamiento real de las políticas: lectura pública, y que solo
-- el dueño puede crear/editar/borrar SUS comunidades.
--
-- Técnica: el setup corre como superusuario (postgres, salta RLS) para crear
-- los datos; luego cambiamos de rol/identidad con `set local role` +
-- `request.jwt.claims` para actuar como anónimo o como un usuario concreto, y
-- afirmamos qué le permite (o niega) RLS.

begin;
select plan(5);

-- ─── Setup (como postgres: salta RLS) ───────────────────────────────────────
-- Dos usuarios. El trigger on_auth_user_created crea sus profiles.
insert into auth.users (id, email, raw_user_meta_data) values
  ('11111111-1111-1111-1111-111111111111', 'rls-a@test.local', '{"name":"Usuario A"}'),
  ('22222222-2222-2222-2222-222222222222', 'rls-b@test.local', '{"name":"Usuario B"}');

-- Una comunidad por usuario.
insert into public.communities
  (id, type, name, description, location, city, images, floor_type, is_covered, schedule, services, age_group, user_id)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'pickup', 'Cancha A',
   'Comunidad de prueba A para los tests de RLS con pgTAP.',
   'SRID=4326;POINT(-99.13 19.43)', 'CDMX',
   '["https://h/1.jpg","https://h/2.jpg"]'::jsonb, 'cement', false,
   '[{"days":["monday"],"time":{"start":"08:00","end":"20:00"}}]'::jsonb,
   '{"wifi":false,"store":false,"bathroom":false,"transport":false}'::jsonb,
   'mixed', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'pickup', 'Cancha B',
   'Comunidad de prueba B para los tests de RLS con pgTAP.',
   'SRID=4326;POINT(-99.14 19.44)', 'CDMX',
   '["https://h/1.jpg","https://h/2.jpg"]'::jsonb, 'cement', false,
   '[{"days":["monday"],"time":{"start":"08:00","end":"20:00"}}]'::jsonb,
   '{"wifi":false,"store":false,"bathroom":false,"transport":false}'::jsonb,
   'mixed', '22222222-2222-2222-2222-222222222222');

-- ─── 1. Anónimo PUEDE leer comunidades (SELECT público) ─────────────────────
set local role anon;
select isnt_empty(
  $$ select id from public.communities where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' $$,
  'anónimo puede leer comunidades (política SELECT pública)'
);

-- ─── 2. Anónimo NO puede crear comunidades (sin política INSERT para anon) ───
select throws_ok(
  $$ insert into public.communities
       (id, type, name, description, location, city, images, floor_type, is_covered, schedule, services, age_group, user_id)
     values
       ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'pickup', 'Hack',
        'Intento de creación por un usuario anónimo no autorizado.',
        'SRID=4326;POINT(-99.1 19.4)', 'CDMX',
        '["https://h/1.jpg","https://h/2.jpg"]'::jsonb, 'cement', false,
        '[{"days":["monday"],"time":{"start":"08:00","end":"20:00"}}]'::jsonb,
        '{"wifi":false,"store":false,"bathroom":false,"transport":false}'::jsonb,
        'mixed', '11111111-1111-1111-1111-111111111111') $$,
  '42501',
  NULL,
  'anónimo NO puede crear comunidades (RLS lo bloquea)'
);

-- ─── 3. Usuario A PUEDE actualizar SU propia comunidad ──────────────────────
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
update public.communities set name = 'Cancha A (editada)'
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

reset role;
select is(
  (select name from public.communities where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  'Cancha A (editada)',
  'usuario A puede actualizar su propia comunidad'
);

-- ─── 4. Usuario A NO puede actualizar la comunidad de B (RLS filtra) ─────────
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
update public.communities set name = 'Hackeada por A'
where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

reset role;
select is(
  (select name from public.communities where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  'Cancha B',
  'usuario A NO puede modificar la comunidad de B (RLS filtra el UPDATE)'
);

-- ─── 5. Usuario A NO puede borrar la comunidad de B ─────────────────────────
set local role authenticated;
set local request.jwt.claims to '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';
delete from public.communities where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

reset role;
select isnt_empty(
  $$ select id from public.communities where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' $$,
  'usuario A NO puede borrar la comunidad de B (sigue existiendo)'
);

select * from finish();
rollback;
