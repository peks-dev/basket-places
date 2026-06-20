import { test, expect } from '@playwright/test';
import { smallPng } from '../../support/images';

/**
 * Smoke autenticado: el usuario sube una imagen de avatar pequeña.
 * Ejercita el camino de subida a Storage + el análisis de imagen de perfil
 * (proveedor de IA simulado, que aprueba), y la actualización del perfil.
 */
test('el usuario puede subir una imagen de avatar', async ({ page }) => {
  await page.goto('/perfil');

  await page.getByRole('button', { name: 'Opciones de perfil' }).click();
  await page.getByRole('button', { name: /editar perfil/i }).click();

  // El nombre es obligatorio (mín. 2, solo letras); lo completamos junto al avatar.
  await page.locator('#name').fill('Usuario Con Avatar');

  const img = smallPng();
  await page.locator('input[type="file"]').setInputFiles({
    name: img.name,
    mimeType: img.mimeType,
    buffer: img.buffer,
  });

  await page.getByRole('button', { name: 'enviar' }).click();

  // El mock aprueba la imagen → se sube y el perfil se actualiza con éxito.
  await expect(
    page.getByText(/perfil actualizado correctamente/i)
  ).toBeVisible({ timeout: 20_000 });
});
