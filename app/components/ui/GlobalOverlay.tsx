'use client';

import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobalOverlayStore } from '@/lib/stores/useGlobalOverlayStore';
import { useMounted } from '@/lib/hooks/useMounted';

export function GlobalOverlay() {
  const { isActive } = useGlobalOverlayStore();
  const mounted = useMounted();

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{
            opacity: 0,
            backdropFilter: 'blur(0px)',
          }}
          animate={{
            opacity: 1,
            backdropFilter: 'blur(2px)',
          }}
          exit={{
            opacity: 0,
            backdropFilter: 'blur(0px)',
            scale: 0.98,
            transition: {
              duration: 0.15,
              ease: 'easeIn',
            },
          }}
          transition={{
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="fixed inset-0 z-[35] bg-black/50"
        />
      )}
    </AnimatePresence>,
    document.body
  );
}
