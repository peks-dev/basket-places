// lib/errors/database.ts

/**
 * Error para todas las operaciones de base de datos
 * Incluye operaciones con Supabase (PostgreSQL, RPC, etc.)
 */
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown,
    public field?: string
  ) {
    super(message);
    this.name = 'DatabaseError';
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

/**
 * Helper específico para errores de Supabase
 * Convierte el error de Supabase a DatabaseError
 * Los detalles internos se loguean en server, no se envían al cliente
 */
export function fromSupabaseError(
  error: { message: string; code?: string; details?: string },
  userMessage: string,
  errorCode: string
): DatabaseError {
  // Log interno para debugging (solo server-side)
  console.error('[SupabaseError]', {
    code: error.code,
    message: error.message,
    details: error.details,
  });

  return new DatabaseError(userMessage, errorCode);
}
