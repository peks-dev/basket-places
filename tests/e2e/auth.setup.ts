import { test as setup, expect } from '@playwright/test';
import { clearInbox, waitForOtp } from '../support/mailpit';
import { ensureUser } from '../support/supabaseAdmin';
import { TEST_USER_A, AUTH_FILE } from '../support/users';

/**
 * Inicia sesión una sola vez con el flujo OTP real (UI + código leído de Mailpit)
 * y guarda el estado de sesión. Los proyectos `authenticated` lo reutilizan vía
 * `storageState`, así no repetimos el login en cada test.
 */
setup('autenticar usuario A vía OTP', async ({ page }) => {
  // El usuario existe y está confirmado antes de pedir el código.
  await ensureUser(TEST_USER_A.email);
  await clearInbox();

  await page.goto('/sign-in');

  await page.locator('#email').fill(TEST_USER_A.email);
  await page.getByRole('button', { name: /enviar código de acceso/i }).click();

  // El input de OTP aparece tras enviar el código; se autoenvía al completar 6 dígitos.
  const code = await waitForOtp(TEST_USER_A.email);
  await page.locator('input[type="tel"]').fill(code);

  // Login correcto: la app redirige fuera de /sign-in.
  await page.waitForURL((url) => !url.pathname.startsWith('/sign-in'), {
    timeout: 15_000,
  });

  // Sanidad: existe una cookie de sesión de Supabase.
  const cookies = await page.context().cookies();
  expect(cookies.some((c) => c.name.includes('auth-token'))).toBeTruthy();

  await page.context().storageState({ path: AUTH_FILE });
});
