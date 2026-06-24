import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// La función DEBE ser async
export async function createClient() {
  // DEBEMOS esperar a que la promesa de cookies se resuelva
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet, _headers) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Este error es esperado en Server Components, se puede ignorar.
          }
        },
      },
    }
  );
}
