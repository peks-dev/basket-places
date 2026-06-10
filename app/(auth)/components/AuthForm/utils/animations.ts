import { Variants } from 'motion/react';

export const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.6, 1],
    },
  },
};

export const TITLE_MAP = {
  idle: 'inicia sesión o registrate',
  error: 'inicia sesión o registrate',
  code_sent: 'revisa tu correo',
  verifying: 'verificando tu código...',
  success: '¡bienvenido!',
  expired: 'codigo expirado',
} as const;
