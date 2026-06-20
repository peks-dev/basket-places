-- Test pgTAP: permisos de EJECUCIÓN de funciones sensibles.
-- Verifica que las funciones internas (triggers) no se puedan llamar como RPC
-- desde el cliente, que el borrado de cuenta esté reservado a usuarios
-- autenticados, y que las funciones de lectura pública sigan siendo invocables.
--
-- Usa has_function_privilege: comprueba el permiso SIN ejecutar la función
-- (cero efectos secundarios).

begin;
select plan(5);

-- Funciones de trigger: no deben ser invocables como RPC por el cliente.
select ok(
  not has_function_privilege('anon', 'public.handle_new_user()', 'execute'),
  'anon NO puede ejecutar handle_new_user (función de trigger interna)'
);

select ok(
  not has_function_privilege('authenticated', 'public.update_community_rating()', 'execute'),
  'authenticated NO puede ejecutar update_community_rating (trigger interno)'
);

-- Borrado de cuenta: reservado a usuarios autenticados.
select ok(
  not has_function_privilege('anon', 'public.delete_user_account()', 'execute'),
  'anon NO puede ejecutar delete_user_account'
);

select ok(
  has_function_privilege('authenticated', 'public.delete_user_account()', 'execute'),
  'authenticated SÍ puede ejecutar delete_user_account'
);

-- Lectura pública: la RPC del mapa sigue siendo invocable por anónimos.
select ok(
  has_function_privilege('anon', 'public.get_all_communities(integer)', 'execute'),
  'anon SÍ puede ejecutar get_all_communities (lectura pública)'
);

select * from finish();
rollback;
