import { test, expect } from '@playwright/test';

/**
 * Smoke ligero de "contribuir": verifica que la página del formulario carga para
 * un usuario autenticado y que el primer paso monta sin crashear. NO conduce el
 * wizard multipaso (eso queda como follow-up para después del rediseño del
 * formulario). Atrapa el caso "la feature está totalmente rota / da 500".
 */
test('la página de contribuir carga para un usuario autenticado', async ({
  page,
}) => {
  await page.goto('/comunidad/contribuir');

  // La ruta está protegida (ProtectedWrapper): autenticado, no redirige a sign-in.
  await expect(page).toHaveURL(/\/comunidad\/contribuir$/);

  // El primer paso del formulario (selección de tipo) monta correctamente.
  await expect(page.getByRole('radio', { name: 'Reta' })).toBeVisible({
    timeout: 15_000,
  });
});
