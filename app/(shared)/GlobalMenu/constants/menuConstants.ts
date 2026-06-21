// Constants for the GlobalMenu component

export const MENU_CONSTANTS = {
  NAVIGATION: {
    MAP: '/',
    PROFILE: '/perfil',
    FEEDBACK: '/feedback',
    TERMS: '/condiciones',
    PRIVACY: '/privacidad',
  },
  THEME_LABELS: {
    DARK_TO_LIGHT: 'Cambiar a modo claro',
    LIGHT_TO_DARK: 'Cambiar a modo oscuro',
    SYNC_SYSTEM: 'Sincronizar con sistema',
    SYNCED_SYSTEM: '✓ Sincronizado con sistema',
  },
  SECTIONS: {
    THEME: 'tema',
    NAVIGATION: 'navegacion',
  },
  CORNER_POSITIONS: [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ] as const,
} as const;

export type ThemeMode = 'light' | 'dark' | 'system';
export type CornerPosition = (typeof MENU_CONSTANTS.CORNER_POSITIONS)[number];
