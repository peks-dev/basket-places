// hooks/useAuthFlow.ts
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
} from '@/shared/notifications';
import { sendLoginCode } from '@/app/(auth)/database/dbQueries.browser';
import { verifyOtpAndFetchProfile } from '@/auth/actions/verifyAndFetch';
import { useSearchParams } from 'next/navigation';
import { useCustomNavigation } from '@/lib/hooks/useNavigation';
import { useProfileStore } from '@/app/(main)/perfil/stores/useProfileStore';
import { useAuth } from '../hooks/useAuth';
import { useUIStateStore } from '@/lib/stores/useUIStateStore';
import { usePanelLoaderStore } from '@/app/(main)/map/stores/usePanelStore';
import { trackAnalyticsEvent } from '@/lib/analytics/umami';

type AuthState =
  | 'idle'
  | 'code_sent'
  | 'verifying'
  | 'success'
  | 'error'
  | 'expired';

// Anti-abuso: ventana mínima entre solicitudes de código OTP desde el cliente.
// Reduce el volumen de correos y complementa el rate limit de Supabase Auth.
const RESEND_COOLDOWN_SECONDS = 60;

export const useAuthFlow = () => {
  const [state, setState] = useState<AuthState>('idle');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Timer state (integrated from useAuthTimer)
  const [timeLeft, setTimeLeft] = useState(600);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  // Resend cooldown state (anti-abuso OTP)
  const [resendCooldown, setResendCooldown] = useState(0);
  const cooldownId = useRef<NodeJS.Timeout | null>(null);

  const { navigate } = useCustomNavigation();
  const searchParams = useSearchParams();
  const { updateProfile: updateProfileStore } = useProfileStore();
  const { setUserAndSession } = useAuth();
  const { closeActivePanel } = useUIStateStore();
  const { setLoading: setPanelLoading } = usePanelLoaderStore();

  // Timer cleanup effect
  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
      if (cooldownId.current) {
        clearInterval(cooldownId.current);
      }
    };
  }, []);

  // Inicia/reinicia el cooldown de reenvío de código OTP.
  const startResendCooldown = () => {
    if (cooldownId.current) clearInterval(cooldownId.current);
    setResendCooldown(RESEND_COOLDOWN_SECONDS);

    cooldownId.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownId.current) clearInterval(cooldownId.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOTP = async (isResend = false): Promise<boolean> => {
    setLoading(true);
    try {
      await sendLoginCode(email);

      if (isResend) {
        showSuccessToast(
          'Código reenviado',
          'Se ha reenviado un nuevo código a tu correo.'
        );
      } else {
        showSuccessToast(
          'Código enviado',
          `Te hemos enviado un código a ${email}`
        );
      }
      setState('code_sent');
      trackAnalyticsEvent('auth_sign_in_started', {
        is_resend: isResend,
      });
      setLoading(false);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      showErrorToast('Error al enviar código', errorMessage);
      setState('error');
      setLoading(false);
      return false;
    }
  };

  const verifyOTP = async (): Promise<boolean> => {
    setLoading(true);
    setState('verifying');

    const result = await verifyOtpAndFetchProfile(email, otp);

    if (!result.success || !result.data) {
      showErrorToast(
        'Error al verificar código',
        result.success ? 'Error al verificar el código' : result.error.message
      );
      setState('code_sent');
      setLoading(false);
      setOtp('');
      return false;
    }

    // ¡Paso clave! Sincronizamos el estado de la app.
    await setUserAndSession(result.data.user, result.data.session);

    // Hidrata el store con el perfil
    if (result.data.profile) {
      updateProfileStore(result.data.profile);
    }

    // Determina a dónde navegar
    const returnUrl = searchParams.get('returnUrl');
    let destination = '/perfil';

    if (returnUrl) {
      const decoded = decodeURIComponent(returnUrl);
      // Validación estricta: solo rutas internas (path absoluto, sin protocolo)
      if (/^\/[a-zA-Z0-9]/.test(decoded) && !decoded.startsWith('//')) {
        destination = decoded;
      }
    }

    // Cerrar cualquier panel abierto antes de navegar
    closeActivePanel();
    setPanelLoading(false);

    // Feedback visual
    showSuccessToast('Bienvenido', '¡Bienvenido de nuevo!');
    setState('success');
    trackAnalyticsEvent('auth_sign_in_completed', {
      destination,
    });

    // Para rutas con intercepting routes, usar navegación hard
    // para evitar que el modal se vuelva a montar
    const hasInterceptingRoute = destination.includes('/comunidad/ver/');

    if (hasInterceptingRoute) {
      // Forzar recarga completa para resetear el estado de Next.js
      window.location.href = destination;
    } else {
      // Para otras rutas, usar navegación normal
      navigate(destination);
    }

    setLoading(false);
    return true;
  };

  const resetFlow = () => {
    setState('idle');
    setOtp('');
  };

  const setExpired = () => {
    setState('expired');
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp.replace(/\D/g, '').slice(0, 6));
  };

  // Timer functions (integrated from useAuthTimer)
  const startTimer = (onExpire?: () => void) => {
    if (timerId.current) clearInterval(timerId.current);

    timerId.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerId.current) clearInterval(timerId.current);
          showWarningToast(
            'Código expirado',
            'El código de verificación ha expirado.'
          );
          if (onExpire) onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = (time: number = 600) => {
    if (timerId.current) clearInterval(timerId.current);
    setTimeLeft(time);
  };

  const clearTimer = () => {
    if (timerId.current) clearInterval(timerId.current);
  };

  // Coordinated handlers
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await sendOTP();
    if (success) {
      resetTimer(600);
      startTimer(() => setExpired());
      startResendCooldown();
    }
  };

  const handleVerifyOTP = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const success = await verifyOTP();
    if (success) {
      clearTimer();
    }
  };

  const handleResendCode = async () => {
    // Guard anti-abuso: ignorar reenvíos mientras el cooldown esté activo.
    if (resendCooldown > 0 || loading) return;

    const success = await sendOTP(true);
    if (success) {
      resetTimer(600);
      startTimer(() => setExpired());
      startResendCooldown();
    }
  };

  const handleResetFlow = () => {
    clearTimer();
    resetFlow();
  };

  return {
    // State
    state,
    email,
    otp,
    loading,
    timeLeft,
    resendCooldown,

    // Main handlers
    handleSendOTP,
    handleVerifyOTP,
    handleResendCode,
    handleResetFlow,

    // Input handlers
    handleEmailChange,
    handleOtpChange,

    // Internal functions (for backward compatibility if needed)
    sendOTP,
    verifyOTP,
  };
};
