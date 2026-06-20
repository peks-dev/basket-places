import { test, expect } from '@playwright/test';
import {
  ensureUser,
  createCommunity,
  deleteCommunity,
  type SeededCommunity,
} from '../../support/supabaseAdmin';
import { TEST_USER_B } from '../../support/users';

/**
 * Smoke autenticado: el usuario A publica una review en una comunidad ajena.
 * La comunidad la siembra el usuario B (vía admin), así A reseña algo que no
 * es suyo. El análisis de comentario usa el proveedor de IA simulado (aprueba).
 */
test.describe('publicar una review', () => {
  let community: SeededCommunity;

  test.beforeAll(async () => {
    const owner = await ensureUser(TEST_USER_B.email);
    community = await createCommunity(owner.id);
  });

  test.afterAll(async () => {
    if (community) await deleteCommunity(community.id);
  });

  test('el usuario puede publicar una review', async ({ page }) => {
    await page.goto(`/comunidad/ver/${community.id}`);

    // Abrir el formulario de valoración.
    await page.getByRole('button', { name: 'valorar' }).click();

    // Calificación (select nativo) y comentario.
    await page.locator('select').selectOption('5');
    await page
      .getByPlaceholder(/comparte anécdotas/i)
      .fill('Excelente cancha, bien cuidada y con buen ambiente para jugar.');

    await page.getByRole('button', { name: 'enviar valoración' }).click();

    // El mock aprueba el comentario → la review se publica con éxito.
    await expect(page.getByText(/valoración enviada/i)).toBeVisible({
      timeout: 15_000,
    });
  });
});
