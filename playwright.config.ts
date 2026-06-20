import { defineConfig, devices } from '@playwright/test';
import { BASE_URL, TEST_SERVER_ENV } from './tests/support/config';

/**
 * Configuración de Playwright para los smoke tests de Basket Places.
 *
 * Alcance inicial (estrategia 20/80): solo Chromium, flujos críticos contra una
 * Supabase LOCAL y el proveedor de IA simulado (`AI_PROVIDER=mock`). No se hacen
 * llamadas reales a Gemini ni a Resend.
 *
 * Proyectos:
 *  - `setup`         inicia sesión una vez (OTP leído de Mailpit) y guarda el
 *                    estado de sesión para reutilizarlo.
 *  - `public`        flujos anónimos (la app y el mapa cargan). Sin sesión.
 *  - `authenticated` flujos que requieren usuario; reutilizan el storageState.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Serial: varios tests autenticados comparten el mismo usuario A (storageState)
  // y mutan su perfil; ejecutarlos en paralelo provoca carreras sobre ese estado.
  // El suite es pequeño, así que el coste de serializar es despreciable.
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: BASE_URL,
    // Evidencia para diagnosticar fallos sin reproducir a ciegas.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'public',
      testMatch: 'public/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'authenticated',
      testMatch: 'authenticated/**/*.spec.ts',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/.auth/user.json',
      },
    },
  ],

  webServer: {
    // `next dev` apuntando a la Supabase local. No usamos build+start para
    // iterar rápido; CI puede cambiarlo más adelante si se quiere mayor fidelidad.
    command: 'node_modules/.bin/next dev -p 3000',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: TEST_SERVER_ENV,
  },
});
