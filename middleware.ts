// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

interface CookieData {
  name: string;
  value: string;
  options?: {
    maxAge?: number;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    path?: string;
    domain?: string;
  };
}

// Origen exacto de Supabase derivado del entorno. En producción es la URL
// `https://<ref>.supabase.co` (ya cubierta por el comodín de abajo); en local
// es `http://127.0.0.1:54321`, que de otro modo el CSP bloquearía y rompería
// las llamadas del navegador (auth, storage). Es aditivo: no relaja producción.
const supabaseOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).origin;
  } catch {
    return '';
  }
})();

const umamiOrigin = (() => {
  try {
    return new URL(
      process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ??
        'https://cloud.umami.is/script.js'
    ).origin;
  } catch {
    return 'https://cloud.umami.is';
  }
})();

const umamiConnectOrigins =
  umamiOrigin === 'https://cloud.umami.is'
    ? `${umamiOrigin} https://gateway.umami.is`
    : umamiOrigin;

const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${umamiOrigin}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${supabaseOrigin} https://*.supabase.co https://*.tile.openstreetmap.org https://*.basemaps.cartocdn.com`,
    "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com",
    `connect-src 'self' ${supabaseOrigin} https://*.supabase.co https://generativelanguage.googleapis.com ${umamiConnectOrigins}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Agregar cabeceras de seguridad
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  const { pathname } = request.nextUrl;
  const protectedRoutes = ['/contribuir', '/perfil', '/feedback'];
  const authRoutes = ['/sign-in'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Siempre verificar con Supabase - no usar cache client-side
  // (el auth-cache anterior era vulnerable a bypass al no estar firmado)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieData[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Lógica de redirección
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/sign-in', request.url);
    redirectUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && user) {
    const redirectTo = request.nextUrl.searchParams.get('redirectTo');
    // Validación estricta contra open-redirect: solo paths internos
    if (
      redirectTo &&
      /^\/[a-zA-Z0-9]/.test(redirectTo) &&
      !redirectTo.startsWith('//')
    ) {
      const redirectUrl = new URL(redirectTo, request.url);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicons|opengraph-image).*)'],
};
