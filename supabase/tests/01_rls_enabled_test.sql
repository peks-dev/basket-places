-- Test pgTAP: confirma que Row Level Security está ACTIVA en las tablas con datos
-- de usuario. Si alguien la desactivara por error, estas tablas quedarían
-- totalmente expuestas (cualquiera con la anon key leería/escribiría todo).
--
-- Estructura pgTAP: begin -> plan(N) -> N afirmaciones -> finish -> rollback.
-- El rollback deja la base sin rastro del test (datos aislados).

begin;
select plan(4);

select ok(
  (select relrowsecurity from pg_class
   where relname = 'communities' and relnamespace = 'public'::regnamespace),
  'RLS está activa en public.communities'
);

select ok(
  (select relrowsecurity from pg_class
   where relname = 'profiles' and relnamespace = 'public'::regnamespace),
  'RLS está activa en public.profiles'
);

select ok(
  (select relrowsecurity from pg_class
   where relname = 'reviews' and relnamespace = 'public'::regnamespace),
  'RLS está activa en public.reviews'
);

select ok(
  (select relrowsecurity from pg_class
   where relname = 'feedback_reports' and relnamespace = 'public'::regnamespace),
  'RLS está activa en public.feedback_reports'
);

select * from finish();
rollback;
