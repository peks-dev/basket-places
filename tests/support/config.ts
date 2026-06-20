/**
 * Configuración compartida para la suite de Playwright.
 *
 * Las claves de Supabase de abajo NO son secretos: son los valores por defecto
 * que la CLI de Supabase genera para TODA instancia local (mismo JWT secret
 * demo en cada máquina y en CI). Por eso se pueden versionar sin riesgo y hacen
 * la suite reproducible localmente y en GitHub Actions sin archivos `.env`
 * (el repo ignora `.env*`).
 *
 * Si algún día cambian los puertos en `supabase/config.toml`, actualízalos aquí.
 */

export const BASE_URL = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:3000';

export const LOCAL_SUPABASE = {
  url: process.env.E2E_SUPABASE_URL ?? 'http://127.0.0.1:54321',
  anonKey:
    process.env.E2E_SUPABASE_ANON_KEY ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
  serviceRoleKey:
    process.env.E2E_SUPABASE_SERVICE_ROLE_KEY ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
  // Mailpit/Inbucket: bandeja de correo local donde aterriza el OTP.
  mailpitUrl: process.env.E2E_MAILPIT_URL ?? 'http://127.0.0.1:54324',
} as const;

/**
 * Variables de entorno con las que se arranca `next dev` para los tests:
 * apunta la app a la Supabase LOCAL y fuerza el proveedor de IA simulado para
 * que no se hagan llamadas reales a Gemini.
 */
export const TEST_SERVER_ENV: Record<string, string> = {
  NEXT_PUBLIC_SUPABASE_URL: LOCAL_SUPABASE.url,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: LOCAL_SUPABASE.anonKey,
  SUPABASE_SERVICE_ROLE_KEY: LOCAL_SUPABASE.serviceRoleKey,
  NEXT_PUBLIC_APP_URL: BASE_URL,
  AI_PROVIDER: 'mock',
};
