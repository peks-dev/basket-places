// Hook for menu navigation
import { useCallback } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navigateTo = useCallback(
    (path: string): void => {
      // 🔒 CASO 1: Estamos en /sign-in y el destino es una ruta protegida.
      // Navegar a ella haría que el middleware nos rebote de vuelta a /sign-in,
      // dejando el loader colgado. En su lugar solo actualizamos el redirectTo
      // para fijar a dónde iremos tras iniciar sesión, sin salir de /sign-in.
      if (pathname === '/sign-in' && PROTECTED_ROUTES.includes(path)) {
        const params = new URLSearchParams(searchParams);
        params.set('redirectTo', path);
        router.replace(`/sign-in?${params.toString()}`);
        closeMenu();
        return;
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
    [pathname, searchParams, router, navigate, closeMenu]
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
