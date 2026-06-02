// app/(auth)/errors/codes.ts
export const AuthErrorCodes = {
  // ============================================
  // AUTENTICACIÓN (401)
  // ============================================
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',

  // ============================================
  // CONECTIVIDAD (500)
  // ============================================
  AUTH_CONNECTION_ERROR: 'AUTH_CONNECTION_ERROR',
  AUTH_TIMEOUT_ERROR: 'AUTH_TIMEOUT_ERROR',

  // ============================================
  // SESIÓN (401)
  // ============================================
  AUTH_SESSION_EXPIRED: 'AUTH_SESSION_EXPIRED',
  AUTH_SESSION_INVALID: 'AUTH_SESSION_INVALID',
  AUTH_SESSION_MISSING: 'AUTH_SESSION_MISSING',

  // ============================================
  // CONFIGURACIÓN (500)
  // ============================================
  AUTH_CONFIG_ERROR: 'AUTH_CONFIG_ERROR',
  AUTH_PROVIDER_ERROR: 'AUTH_PROVIDER_ERROR',

  // ============================================
  // VALIDACIÓN (400)
  // ============================================
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_EMAIL_NOT_VERIFIED: 'AUTH_EMAIL_NOT_VERIFIED',

  // ============================================
  // RATE LIMITING (429)
  // ============================================
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',

  // ============================================
  // GENERAL (500)
  // ============================================
  AUTH_UNKNOWN_ERROR: 'AUTH_UNKNOWN_ERROR',
} as const;

export type AuthErrorCode =
  (typeof AuthErrorCodes)[keyof typeof AuthErrorCodes];
