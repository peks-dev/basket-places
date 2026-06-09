'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { InfoIcon } from '@/app/components/ui/svgs';

interface Props {
  title: string;
  description: string;
}

export function StepHelp({ title, description }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const transition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      };

  return (
    <div ref={containerRef} className="relative z-[1000] w-full">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
        className="hover-neon-text border-border-secondary bg-background-primary-dark text-foreground-accent hover:text-accent-primary flex w-full cursor-pointer items-center gap-2 border px-3 py-2 text-left text-xs transition-colors duration-200"
      >
        <span className="h-5 w-5 shrink-0" aria-hidden="true">
          <InfoIcon />
        </span>
        <span className="font-oxanium text-text-primary grow">{title}</span>
        <span className="text-foreground text-xs">
          {isOpen ? 'ocultar' : 'ayuda'}
        </span>
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-label={title}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={transition}
            className="border-border-secondary bg-background-primary-dark text-foreground mt-2 border px-3 py-2 text-xs leading-relaxed shadow-lg"
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
