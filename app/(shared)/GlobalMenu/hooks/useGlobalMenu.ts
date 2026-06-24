// Hook for global menu state and logic

import { useCallback, useState } from 'react';
import { useGlobalOverlayStore } from '@/lib/stores/useGlobalOverlayStore';
import { useUIStateStore } from '@/lib/stores/useUIStateStore';
import { useRouter } from 'next/navigation';
import { useMounted } from '@/lib/hooks/useMounted';
import { useThemeControls } from './useThemeControls';
import { useMenuNavigation } from './useMenuNavigation';
import { useMenuKeyboard } from './useMenuKeyboard';

interface UseGlobalMenuReturn {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  mounted: boolean;
  themeLabel: string;
  isSystemSync: boolean;
  toggleTheme: () => void;
  syncWithSystem: () => void;
  navigateTo: (path: string) => void;
  navigateToMap: () => void;
  navigateToProfile: () => void;
}

export const useGlobalMenu = (): UseGlobalMenuReturn => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mounted = useMounted();

  const { toggle: toggleOverlay, deactivate } = useGlobalOverlayStore();
  const { closeActivePanel, hasAnyPanelOpen } = useUIStateStore();
  const router = useRouter();

  // Theme controls
  const { themeLabel, isSystemSync, toggleTheme, syncWithSystem } =
    useThemeControls();

  // Menu state handlers
  const closeMenu = useCallback((): void => {
    setIsMenuOpen(false);
    deactivate();
  }, [deactivate]);

  const toggleMenu = useCallback((): void => {
    // Cerrar cualquier panel abierto antes de abrir el menú
    if (!isMenuOpen && hasAnyPanelOpen()) {
      closeActivePanel();
      router.back();
    }

    setIsMenuOpen((prev) => !prev);
    toggleOverlay();
  }, [toggleOverlay, isMenuOpen, closeActivePanel, hasAnyPanelOpen, router]);

  // Keyboard events
  useMenuKeyboard({ isMenuOpen, closeMenu });

  // Navigation
  const { navigateTo, navigateToMap, navigateToProfile } =
    useMenuNavigation(closeMenu);

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    mounted,
    themeLabel,
    isSystemSync,
    toggleTheme,
    syncWithSystem,
    navigateTo,
    navigateToMap,
    navigateToProfile,
  };
};
