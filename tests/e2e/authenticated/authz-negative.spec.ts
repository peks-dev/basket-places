import { test, expect } from '@playwright/test';
import {
  admin,
  ensureUser,
  createCommunity,
  deleteCommunity,
} from '../../support/supabaseAdmin';
import { getStoredAccessToken } from '../../support/session';
import { TEST_USER_B } from '../../support/users';
import { LOCAL_SUPABASE } from '../../support/config';

/**
 * Smoke negativo de autorización: el usuario A (sesión del proyecto `setup`) NO
 * puede modificar una comunidad de la que es dueño el usuario B. Se intenta la
 * mutación real contra la API; RLS debe filtrar la fila (0 modificadas) y el
 * dato real debe quedar intacto.
 */
test('un usuario no puede modificar la comunidad de otro usuario', async () => {
  const owner = await ensureUser(TEST_USER_B.email);
  const community = await createCommunity(owner.id, { name: 'Cancha De B' });

  try {
    const tokenA = getStoredAccessToken();

    const res = await fetch(
      `${LOCAL_SUPABASE.url}/rest/v1/communities?id=eq.${community.id}`,
      {
        method: 'PATCH',
        headers: {
          apikey: LOCAL_SUPABASE.anonKey,
          Authorization: `Bearer ${tokenA}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({ name: 'Hackeada Por A' }),
      }
    );

    // RLS filtra la fila ajena: ninguna fila resulta modificada.
    const rows = (await res.json()) as unknown[];
    expect(Array.isArray(rows) ? rows.length : 0).toBe(0);

    // Verificación dura con el cliente admin: el nombre sigue intacto.
    const { data } = await admin
      .from('communities')
      .select('name')
      .eq('id', community.id)
      .single();
    expect(data?.name).toBe('Cancha De B');
  } finally {
    await deleteCommunity(community.id);
  }
});
