import type { NextConfig } from 'next';

// Permite servir imágenes desde el Storage de la Supabase activa derivándola del
// entorno. En producción es el host `*.supabase.co`; en local es
// `http://127.0.0.1:54321`, que de otro modo next/image rechazaría (rompiendo el
// render de avatares e imágenes de comunidad subidas a la Storage local).
const supabaseImagePattern = (() => {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);
    return {
      protocol: url.protocol.replace(':', '') as 'http' | 'https',
      hostname: url.hostname,
      port: url.port,
      pathname: '/storage/v1/object/public/**',
    };
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bvvmbnevtogthudqnjjv.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/community-images/**',
      },
      // Nueva regla para el bucket de avatares
      {
        protocol: 'https',
        hostname: 'bvvmbnevtogthudqnjjv.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/avatars/**',
      },
      ...(supabaseImagePattern ? [supabaseImagePattern] : []),
    ],
  },
};

export default nextConfig;
