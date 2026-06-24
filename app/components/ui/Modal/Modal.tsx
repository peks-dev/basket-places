// components/ui/Modal/Modal.tsx
'use client';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useModalStore } from './modalStore';
import Button from '@/components/ui/Button';
import { CloseIcon } from '../svgs/';
import { useMounted } from '@/lib/hooks/useMounted';

export const Modal = () => {
  const {
    isOpen,
    title,
    content,
    ContentComponent,
    contentProps,
    confirmButton,
    isLoading,
    closeModal,
    handleConfirm,
    size,
  } = useModalStore();

  const mounted = useMounted();

  // Efecto para manejar la tecla Escape en desktop
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    // Solo añadir el listener si el modal está abierto
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!mounted) return null;

  const renderContent = () => {
    if (ContentComponent) {
      return <ContentComponent {...(contentProps || {})} />;
    }
    if (content) {
      return content;
    }
    return null;
  };

  const getMaxWidth = () => {
    switch (size) {
      case 'sm':
        return 'var(--width-xs)';
      case 'lg':
        return 'var(--width-md)';
      case 'md':
      default:
        return 'var(--width-sm)';
    }
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-sm fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Modal container - Materialización holográfica */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="z-20 w-[90%]"
            style={{
              maxWidth: getMaxWidth(),
              minHeight: '20vh',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Scan line holográfico */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.5, 1],
                ease: 'easeInOut',
                delay: 0.1,
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

            {/* Header con stagger */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeOut',
                delay: 0.15,
              }}
              className="bg-dark-primary p-sm mb-3 flex items-center justify-between"
            >
              <h2 className="neon-effect text-light-secondary text-sm font-bold uppercase">
                {title}
              </h2>
              <Button variant="icon" onClick={closeModal} disabled={isLoading}>
                <CloseIcon />
              </Button>
            </motion.div>

            {/* Contenido con fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.2,
              }}
              className="transparent-container"
            >
              {/* Contenido - sin scroll interno */}
              <div className="p-sm text-light-primary flex-1 overflow-visible text-center">
                {renderContent()}
              </div>

              {/* Footer */}
              {confirmButton && (
                <div className="p-sm">
                  <Button
                    variant={confirmButton.variant}
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? <p>...cargando</p> : confirmButton.text}
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
