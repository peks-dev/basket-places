-- Conceder los privilegios de tabla estándar de Supabase a anon/authenticated.
--
-- Context: en un proyecto Supabase de la plataforma, los roles `anon` y
-- `authenticated` reciben por defecto privilegios sobre las tablas de `public`,
-- y RLS es quien realmente decide qué FILAS puede ver/modificar cada rol. El
-- baseline de este repo proviene de un dump que NO capturó esos grants, por lo
-- que una base construida solo desde estas migraciones queda sin SELECT/INSERT/
-- UPDATE/DELETE para anon/authenticated.
--
-- Esto importa porque la migración 002 cambió varias funciones de SECURITY
-- DEFINER a SECURITY INVOKER: bajo INVOKER se ejecutan con los privilegios del
-- llamador (p. ej. anon en el mapa público), así que sin estos grants la lectura
-- pública falla con "permission denied for table communities".
--
-- Se replica EXACTAMENTE lo que el proyecto remoto ya tiene (verificado:
-- anon y authenticated tienen ALL sobre communities/profiles/reviews). La
-- seguridad la siguen imponiendo las políticas RLS (relrowsecurity = true en las
-- tres tablas), no estos grants. En el remoto es un no-op (ya existen).

GRANT ALL ON TABLE public.communities TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.profiles TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.reviews TO anon, authenticated, service_role;
