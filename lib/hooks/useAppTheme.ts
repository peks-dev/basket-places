'use client';

import { useTheme } from 'next-themes';
import { useMounted } from '@/lib/hooks/useMounted';

export function useAppTheme() {
  const { theme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  const currentTheme = mounted
    ? theme === 'system'
      ? resolvedTheme
      : theme
    : 'light';
  const isDark = currentTheme === 'dark';

  return { mounted, isDark, currentTheme };
}
