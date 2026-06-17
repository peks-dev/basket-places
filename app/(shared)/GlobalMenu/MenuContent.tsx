// MenuContent component for the GlobalMenu
'use client';
import { JSX } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CornerIcon } from '@/app/components/ui/svgs';
import { MENU_CLASSES } from './constants/menuClasses';
import { MENU_CONSTANTS } from './constants/menuConstants';
import {
  MenuHeader,
  MenuFooter,
  ThemeSection,
  NavigationSection,
} from './components/sections';

interface MenuContentProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  themeLabel: string;
  isSystemSync: boolean;
  toggleTheme: () => void;
  syncWithSystem: () => void;
  navigateTo: (path: string) => void;
}

const generateCornerIcons = (): JSX.Element[] => {
  return MENU_CONSTANTS.CORNER_POSITIONS.map((position) => (
    <CornerIcon
      key={position}
      position={position}
      size="small"
      className={MENU_CLASSES.CORNER_ICON}
    />
  ));
};

export const MenuContent = ({
  isMenuOpen,
  closeMenu,
  themeLabel,
  isSystemSync,
  toggleTheme,
  syncWithSystem,
  navigateTo,
}: MenuContentProps): JSX.Element => {
  const containerClasses =
    'fixed inset-0 z-39 flex flex-col items-center justify-end pb-10';

  return (
    <AnimatePresence mode="wait">
      {isMenuOpen && (
        <motion.div className={containerClasses}>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={MENU_CLASSES.OVERLAY}
            onClick={closeMenu}
          />

          {/* Menu wrapper - Materialización holográfica */}
          <motion.div
            initial={{ y: '100%', opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.98 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={MENU_CLASSES.WRAPPER_DRAGGABLE}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {/* Scan line holográfico - efecto de activación */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.5, 1],
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent, var(--color-border-interactive), transparent)',
                transformOrigin: 'top',
                pointerEvents: 'none',
                zIndex: 50,
              }}
            />

            <MenuHeader />

            <div className={MENU_CLASSES.CONTENT}>
              {/* Contenido con stagger - aparición secuencial */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.06,
                      delayChildren: 0.15,
                    },
                  },
                }}
                className={MENU_CLASSES.CONTENT_WRAPPER}
              >
                {generateCornerIcons()}

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -15 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    },
                  }}
                >
                  <ThemeSection
                    themeLabel={themeLabel}
                    toggleTheme={toggleTheme}
                    isSystemSync={isSystemSync}
                    syncWithSystem={syncWithSystem}
                  />
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -15 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    },
                  }}
                >
                  <NavigationSection navigateTo={navigateTo} />
                </motion.div>
              </motion.div>

              <MenuFooter navigateTo={navigateTo} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
