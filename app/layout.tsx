import type { Metadata } from 'next';
import { Iceland, Oxanium } from 'next/font/google';
import './globals.css';
import { AuthShell } from '@/app/(auth)/components/AuthShell';
import { getAuthShellData } from '@/app/(auth)/actions/getAuthShellData';
import ClientProviders from '@/components/ClientProviders';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export const dynamic = 'force-dynamic';

// 1. Configura las fuentes con next/font
const oxanium = Oxanium({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-oxanium', // Crea la variable CSS --font-oxanium
});

const iceland = Iceland({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-iceland', // Crea la variable CSS --font-iceland
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.basket-places.website'),
  title: {
    template: '%s | Basket Places',
    default: 'Basket Places - Directorio de comunidades de basketball',
  },
  description:
    'Encuentra y conecta con comunidades de basketball locales. Descubre canchas, clubes y comunidades en tu área.',
  keywords: [
    'basketball',
    'comunidades',
    'canchas',
    'clubes',
    'deportivo',
    'local',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.basket-places.website',
    siteName: 'Basket Places',
    title: 'Basket Places - Directorio de comunidades de basketball',
    description:
      'Encuentra y conecta con comunidades de basketball locales. Descubre canchas, clubes y comunidades en tu área.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Basket Places - Directorio de comunidades de basketball',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@basketplaces',
    creator: '@basketplaces',
    title: 'Basket Places - Directorio de comunidades de basketball',
    description: 'Encuentra y conecta con comunidades de basketball locales.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ Usar el nuevo sistema de auth shell con manejo de errores específico
  const { initialUser, authError } = await getAuthShellData();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" type="image/x-icon" href="/favicons/favicon.ico" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-icon-180x180.png"
        />
        <link rel="manifest" href="/favicons/manifest.json" />
        <meta
          name="msapplication-TileImage"
          content="/favicons/ms-icon-144x144.png"
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="1c5d1de4-55fd-4f42-afd8-b6130440380a"
        ></script>
      </head>
      <body
        className={`${iceland.variable} ${oxanium.variable} relative h-dvh w-screen antialiased`}
      >
        <ThemeProvider>
          <main className="relative z-2 h-full w-full">
            <AuthShell initialUser={initialUser} authError={authError}>
              <ClientProviders>{children}</ClientProviders>
            </AuthShell>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
