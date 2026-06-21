'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { useNavigationLoaderStore } from '@/lib/stores/useNavigationStore';

export function useCustomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isNavigating, setIsNavigating } = useNavigationLoaderStore();

  // Clave de ubicación completa: incluye el query string para detectar
  // navegaciones que cambian solo los parámetros (p. ej. cuando el middleware
  // rebota /feedback -> /sign-in?redirectTo=/feedback y el pathname no cambia).
  const locationKey = `${pathname}?${searchParams.toString()}`;

  // Detectar cuando la navegación se completó
  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationKey]); // Se ejecuta cada vez que cambia la ruta o el query

  const navigate = useCallback(
    (href: string, options?: { scroll?: boolean }) => {
      // Activar el loader
      setIsNavigating(true);

      // Ejecutar la navegación
      router.push(href, options);
    },
    [router, setIsNavigating]
  );

  return { navigate, isNavigating };
}
