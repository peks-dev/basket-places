// Hook for menu navigation
import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCustomNavigation } from '@/lib/hooks/useNavigation';
import { MENU_CONSTANTS } from '../constants/menuConstants';

interface UseMenuNavigationReturn {
  navigateTo: (path: string) => void;
  navigateToMap: () => void;
  navigateToProfile: () => void;
}

// Rutas protegidas que requieren autenticación
const PROTECTED_ROUTES = ['/contribuir', '/perfil', '/feedback'];

export const useMenuNavigation = (
  closeMenu: () => void
): UseMenuNavigationReturn => {
  const { navigate } = useCustomNavigation();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navigateTo = useCallback(
    (path: string): void => {
      // 🔒 CASO 1: Prevenir navegación redundante desde sign-in
      // Si estamos en /sign-in con redirectTo y el usuario intenta ir a esa misma ruta protegida
      if (pathname === '/sign-in') {
        const redirectTo = searchParams.get('redirectTo');

        // Si hay un redirectTo y coincide con la ruta destino, no hacer nada
        if (redirectTo === path && PROTECTED_ROUTES.includes(path)) {
          closeMenu();
          return;
        }
      }

      // 🔒 CASO 2: Verificar si ya estamos en la ruta destino
      if (pathname === path) {
        closeMenu();
        return;
      }

      // ✅ Navegación normal
      navigate(path);
      closeMenu();
    },
    [pathname, searchParams, navigate, closeMenu]
  );

  const navigateToMap = useCallback((): void => {
    navigateTo(MENU_CONSTANTS.NAVIGATION.MAP);
  }, [navigateTo]);

  const navigateToProfile = useCallback((): void => {
    navigateTo(MENU_CONSTANTS.NAVIGATION.PROFILE);
  }, [navigateTo]);

  return {
    navigateTo,
    navigateToMap,
    navigateToProfile,
  };
};
