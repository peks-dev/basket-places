import { test, expect } from '@playwright/test';

/**
 * Smoke autenticado: el usuario accede a su perfil y edita su nombre.
 * Edita solo el nombre (sin avatar) para no involucrar el análisis de imagen.
 */
test('el usuario puede acceder y editar su perfil', async ({ page }) => {
  await page.goto('/perfil');

  // La ruta es protegida: estar autenticado NO debe redirigir a /sign-in.
  await expect(page).toHaveURL(/\/perfil$/);

  // Abrir opciones de perfil → Editar perfil.
  await page.getByRole('button', { name: 'Opciones de perfil' }).click();
  await page.getByRole('button', { name: /editar perfil/i }).click();

  // El modal de edición muestra el campo de nombre.
  // El nombre solo admite letras, espacios, guiones y apóstrofes (sin dígitos).
  const nuevoNombre = 'Usuario De Prueba E A';
  await page.locator('#name').fill(nuevoNombre);
  await page.getByRole('button', { name: 'enviar' }).click();

  // Confirmación de éxito y el nuevo nombre visible en la página.
  await expect(page.getByText(/perfil actualizado correctamente/i)).toBeVisible(
    { timeout: 15_000 }
  );
  await expect(page.getByText(nuevoNombre)).toBeVisible();
});
