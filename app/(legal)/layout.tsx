import Link from 'next/link';
import type { ReactNode } from 'react';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12">
        <Link
          href="/"
          className="text-foreground-accent w-fit text-sm underline"
        >
          ← Volver al inicio
        </Link>
        <article className="legal-prose flex flex-col">{children}</article>
        <footer className="border-border text-foreground-secondary mt-8 border-t pt-6 text-sm">
          <p>
            ¿Dudas sobre tus datos o estas condiciones? Escríbenos a{' '}
            <a href="mailto:contacto@basket-places.website">
              contacto@basket-places.website
            </a>
            .
          </p>
          <nav className="mt-3 flex gap-4">
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/condiciones">Condiciones</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
