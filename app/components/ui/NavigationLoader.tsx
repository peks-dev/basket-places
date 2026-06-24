'use client';

import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigationLoaderStore } from '@/lib/stores/useNavigationStore';
import { useMounted } from '@/lib/hooks/useMounted';

export function NavigationLoader() {
  const { isNavigating } = useNavigationLoaderStore();
  const mounted = useMounted();

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isNavigating && (
        <motion.div
          key="nav-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-start"
        >
          {/* Overlay con desenfoque progresivo al salir */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
          />

          {/* Contenedor de la barra con efecto de colapso vertical */}
          <motion.div
            className="relative h-[3px] w-full overflow-hidden bg-white/5"
            exit={{
              scaleY: 0,
              opacity: 0,
              transition: { duration: 0.4, ease: 'circIn' },
            }}
          >
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.5, // Un poco más lento para que se aprecie el progreso
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-accent-primary h-full w-full shadow-[0_0_15px_rgba(222,158,54,0.8)]"
            />

            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
              }}
              className="absolute top-0 h-full w-1/3 bg-linear-to-r from-transparent via-white/50 to-transparent"
            />
          </motion.div>

          {/* Elementos HUD laterales con salida por desplazamiento */}
          <div className="absolute top-6 right-8 flex flex-col items-end gap-1">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="font-heading text-accent-primary text-[15px] tracking-[0.4em] uppercase">
                cargando...
              </span>
              <div className="bg-accent-primary h-2 w-2 animate-pulse shadow-[0_0_8px_var(--color-accent-primary)]" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
