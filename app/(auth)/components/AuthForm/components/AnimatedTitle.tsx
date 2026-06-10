import { motion } from 'motion/react';
import { useMatrixEffect } from '../hooks/useMatrixEffect';
import { TITLE_MAP } from '../utils/animations';

interface AnimatedTitleProps {
  state: string;
}

export const AnimatedTitle = ({ state }: AnimatedTitleProps) => {
  const title = (TITLE_MAP as Record<string, string>)[state] || 'cargando...';
  const matrixTitle = useMatrixEffect(title);

  return (
    <motion.h1
      className="heading text-foreground-accent text-neon-accent text-sm"
      initial={{ opacity: 0, x: -15 }}
      animate={{
        opacity: 1,
        x: [-15, 0, 3, -3, 3, 0],
      }}
      transition={{
        duration: 0.7,
        ease: 'easeOut',
        x: { duration: 0.5, times: [0, 0.4, 0.55, 0.7, 0.85, 1] },
      }}
    >
      {matrixTitle}
    </motion.h1>
  );
};
