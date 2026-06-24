'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * Devuelve `false` durante SSR y el primer render del cliente, y `true`
 * una vez hidratado, en el mismo render y sin re-renders extra.
 *
 * Reemplaza el patrón `useState(false)` + `useEffect(() => setMounted(true), [])`,
 * que dispara la regla `react-hooks/set-state-in-effect`.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // snapshot en cliente
    () => false // snapshot en servidor
  );
}
