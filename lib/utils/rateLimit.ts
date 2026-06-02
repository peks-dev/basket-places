/**
 * Rate limiter in-memory para Server Actions
 * Usa un mapa de clave → timestamps para limitar peticiones por ventana de tiempo
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Limpiar entradas expiradas cada 5 minutos
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      entry.timestamps = entry.timestamps.filter(
        (ts) => now - ts < 60_000 // ventana de 1 min
      );
      if (entry.timestamps.length === 0) {
        store.delete(key);
      }
    }
  }, 300_000);
}

export interface RateLimitOptions {
  /** Máximo de peticiones permitidas en la ventana */
  maxRequests: number;
  /** Ventana de tiempo en milisegundos */
  windowMs: number;
  /** Clave identificadora (ej: IP, user ID, email) */
  key: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Verifica si una petición está dentro del límite de rate
 * @returns Resultado con `allowed` indicando si la petición es permitida
 */
export function checkRateLimit(options: RateLimitOptions): RateLimitResult {
  const { maxRequests, windowMs, key } = options;
  const now = Date.now();
  const windowStart = now - windowMs;

  let entry = store.get(key);

  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  // Filtrar timestamps fuera de la ventana
  entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart);

  const remaining = maxRequests - entry.timestamps.length;
  const resetAt =
    entry.timestamps.length > 0 ? entry.timestamps[0] + windowMs : now;

  if (remaining <= 0) {
    return { allowed: false, remaining: 0, resetAt };
  }

  // Registrar esta petición
  entry.timestamps.push(now);

  return { allowed: true, remaining: remaining - 1, resetAt };
}
