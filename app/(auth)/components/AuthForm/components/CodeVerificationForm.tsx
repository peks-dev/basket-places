import React, { useEffect } from 'react';
import Button from '@/app/components/ui/Button';
import OtpInput from '@/app/components/ui/inputs/OtpInput';
import { formatTime } from '@/app/(auth)/utils/formatTime';

interface CodeVerificationFormProps {
  otp: string;
  loading: boolean;
  onOtpChange: (otp: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onResendCode: () => void;
  timeLeft: number;
  resendCooldown: number;
}

export default function CodeVerificationForm({
  otp,
  loading,
  onOtpChange,
  onSubmit,
  onResendCode,
  timeLeft,
  resendCooldown,
}: CodeVerificationFormProps) {
  useEffect(() => {
    if (otp.length === 6 && !loading) {
      onSubmit();
    }
  }, [otp, loading, onSubmit]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      onSubmit();
    }
  };

  return (
    <div className="relative pt-6">
      <div className="gap-md mb-5 flex flex-col items-center justify-center">
        <p className="text-xs text-gray-500">
          Ingresa el código de 6 digitos enviado al correo
        </p>
        <p>
          {timeLeft === 0 ? (
            <span className="text-error">código expirado</span>
          ) : (
            formatTime(timeLeft)
          )}
        </p>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col justify-center gap-10">
          <OtpInput value={otp} onChange={onOtpChange} maxLength={6} />
          <Button
            onClick={onResendCode}
            disabled={loading || resendCooldown > 0}
            variant="secondary"
            className="border-none"
          >
            {resendCooldown > 0
              ? `Reenviar código (${resendCooldown}s)`
              : 'Reenviar código'}
          </Button>
        </div>
      </form>
    </div>
  );
}
