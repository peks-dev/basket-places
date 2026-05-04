# Dominio: Autenticación

## Contexto

Sistema de autenticación OTP (One Time Password) usando Supabase Auth. Flujo: email → código OTP → sesión. Sin passwords.

## Stack Tecnológico

- **Supabase Auth**: Autenticación OTP
- **OTP**: Códigos de un solo uso enviados por email
- **Middleware**: Protección de rutas
- **Zustand**: Estado de autenticación

## Estructura

```
app/(auth)/
├── components/
│   ├── AuthProvider.tsx          # Provider de autenticación
│   ├── AuthGuard.tsx             # Guard de rutas protegidas
│   ├── AuthShell.tsx             # Layout de auth
│   ├── ProtectedWrapper.tsx      # Wrapper para rutas protegidas
│   ├── LogoutButton.tsx
│   ├── DeleteAccountBtn.tsx
│   └── AuthForm/
│       ├── index.tsx             # Formulario principal
│       ├── components/
│       │   ├── FormContent.tsx
│       │   ├── EmailForm.tsx
│       │   ├── CodeVerificationForm.tsx
│       │   ├── AnimatedTitle.tsx
│       │   └── ExpiredCodeMessage.tsx
│       ├── hooks/
│       │   ├── useMatrixEffect.ts
│       │   └── useMeasure.ts
│       └── utils/
│           └── animations.ts
├── hooks/
│   ├── useAuth.ts                # Hook principal de auth
│   └── useAuthFlow.tsx           # Flujo completo OTP
├── actions/
│   ├── verifyAndFetch.ts         # Verificar OTP
│   ├── deleteAccount.ts
│   └── getAuthShellData.ts
├── database/
│   ├── dbQueries.server.ts       # Queries server-side
│   └── dbQueries.browser.ts      # Queries client-side
├── errors/
│   ├── custom.ts                 # Clases de error
│   ├── codes.ts
│   ├── messages.ts
│   └── index.ts
├── sign-in/
│   └── page.tsx
└── utils/
    ├── formatTime.ts
    └── cacheService.ts
```

## Flujo OTP

1. Usuario ingresa email
2. Supabase envía código OTP
3. Usuario ingresa código
4. Verificación → Sesión creada
5. Redirección a ruta protegida

```tsx
// Ejemplo de uso
const { signInWithOtp, verifyOtp, logout } = useAuth();

// Paso 1: Enviar código
await signInWithOtp(email);

// Paso 2: Verificar código
await verifyOtp(email, code);
```

## Patrones Importantes

### useAuthFlow

Hook que maneja todo el flujo incluyendo UI state:

```tsx
const {
  email,
  setEmail,
  otpCode,
  setOtpCode,
  isLoading,
  error,
  step, // 'email' | 'code'
  handleSubmitEmail,
  handleSubmitCode,
  handleResendCode,
} = useAuthFlow();
```

### Errores de Auth

Usar clases específicas en `errors/custom.ts`:

```tsx
throw new AuthValidationError('Código inválido');
throw new AuthConnectionError('Error de conexión');
```

### Protección de Rutas

Usar `ProtectedWrapper` como fallback por si middleware falla:

```tsx
// En layout o page
<ProtectedWrapper>
  <ContenidoProtegido />
</ProtectedWrapper>
```

## Middleware

El middleware en `lib/supabase/middleware.ts` maneja:

- Refresco de tokens
- Redirección si no hay sesión
- Protección de rutas específicas

## Reglas Específicas

1. **Nunca** guardar tokens manualmente (Supabase lo maneja)
2. Siempre usar `useAuth` hook, no cliente de Supabase directamente
3. Manejar errores con clases específicas de `errors/`
4. Usar `showErrorToast` para errores de UI
5. Limpiar estado al cerrar sesión

## Auto-invoke Skills

| Acción                  | Skill              |
| ----------------------- | ------------------ |
| Manejar errores de auth | `error-use`        |
| Mostrar notificaciones  | `notificacion-use` |
| Formularios de auth     | `ui-creation`      |
| Queries de usuario      | `supabase-use`     |

## Referencias

- `hooks/useAuth.ts` - Hook principal
- `hooks/useAuthFlow.tsx` - Flujo completo con UI
- `errors/custom.ts` - Errores específicos
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
