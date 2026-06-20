/**
 * Usuarios de prueba para la suite. Emails con dominio `.test` (reservado por
 * RFC 6761, nunca enrutan correo real). Se crean/usan únicamente en la Supabase
 * local; nunca tocan producción.
 */
export const TEST_USER_A = {
  email: 'e2e-user-a@basket.test',
  username: 'e2e_user_a',
} as const;

export const TEST_USER_B = {
  email: 'e2e-user-b@basket.test',
  username: 'e2e_user_b',
} as const;

/** Ruta del estado de sesión guardado por el proyecto `setup`. */
export const AUTH_FILE = 'tests/.auth/user.json';
