import { LOCAL_SUPABASE } from './config';

/**
 * Cliente mínimo para Mailpit (la bandeja de correo de la Supabase local).
 * Permite leer el OTP de 6 dígitos que Auth envía al iniciar sesión, de modo
 * que los tests completen el login por la UI real igual que un usuario.
 */
const MAILPIT = LOCAL_SUPABASE.mailpitUrl;

interface MailpitSummary {
  ID: string;
  Created: string;
}

/** Borra todos los correos de la bandeja (aislamiento entre tests). */
export async function clearInbox(): Promise<void> {
  await fetch(`${MAILPIT}/api/v1/messages`, { method: 'DELETE' });
}

/**
 * Espera y devuelve el OTP de 6 dígitos más reciente enviado a `email`.
 * Hace polling porque el envío del correo es asíncrono respecto al submit.
 */
export async function waitForOtp(
  email: string,
  {
    timeoutMs = 15_000,
    intervalMs = 500,
  }: { timeoutMs?: number; intervalMs?: number } = {}
): Promise<string> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const search = await fetch(
      `${MAILPIT}/api/v1/search?query=${encodeURIComponent(`to:${email}`)}`
    );

    if (search.ok) {
      const data = (await search.json()) as { messages?: MailpitSummary[] };
      const messages = data.messages ?? [];

      if (messages.length > 0) {
        // El search devuelve los más recientes primero.
        const detail = await fetch(
          `${MAILPIT}/api/v1/message/${messages[0].ID}`
        );
        if (detail.ok) {
          const body = (await detail.json()) as {
            Text?: string;
            HTML?: string;
          };
          const code = (body.Text ?? body.HTML ?? '').match(/\b(\d{6})\b/);
          if (code) return code[1];
        }
      }
    }

    await new Promise((r) => setTimeout(r, intervalMs));
  }

  throw new Error(`No llegó ningún OTP para ${email} en ${timeoutMs}ms`);
}
