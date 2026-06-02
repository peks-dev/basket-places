'use client';

import { useEffect } from 'react';

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[MainError]', error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-heading text-foreground-accent text-xl font-bold">
        Error al cargar
      </h1>
      <p className="text-foreground-secondary max-w-sm text-sm">
        No se pudo cargar esta sección. Intenta de nuevo.
      </p>
      <button
        onClick={reset}
        className="bg-background-accent text-dark-primary mt-2 rounded px-6 py-2 text-sm font-bold uppercase transition-all hover:-translate-y-0.5 active:scale-105"
      >
        Reintentar
      </button>
    </div>
  );
}
