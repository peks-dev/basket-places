'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError]', error);
    Sentry.captureException(error, {
      tags: {
        source: 'global-error-boundary',
      },
    });
  }, [error]);

  return (
    <html lang="es">
      <body>
        <div className="bg-background-primary flex h-dvh w-full flex-col items-center justify-center gap-6 px-4 text-center">
          <h1 className="font-heading text-foreground-accent text-2xl font-bold">
            Algo salió mal
          </h1>
          <p className="text-foreground-secondary max-w-md text-sm">
            Ocurrió un error inesperado. Intenta recargar la página.
          </p>
          <button
            onClick={reset}
            className="bg-background-accent text-dark-primary mt-2 rounded px-6 py-2 text-sm font-bold uppercase transition-all hover:-translate-y-0.5 active:scale-105"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
