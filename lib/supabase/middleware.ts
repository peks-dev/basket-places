import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          );
        },
      },
    }
  );

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      const url = request.nextUrl.clone();
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }

    // Proteger solo rutas específicas
    const protectedRoutes = ['/profile', '/contribution'];
    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

    if (!user && isProtectedRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/sign-in';
      url.searchParams.set('redirectedFrom', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }
}
