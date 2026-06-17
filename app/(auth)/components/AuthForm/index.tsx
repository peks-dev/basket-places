'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useAuthFlow } from '@/auth/hooks/useAuthFlow';
import HeaderContainer from '@/components/ui/Header';
import { useMeasure } from './hooks/useMeasure';
import { AnimatedTitle } from './components/AnimatedTitle';
import { FormContent } from './components/FormContent';

export default function AuthForm() {
  const {
    state,
    email,
    otp,
    loading,
    handleSendOTP,
    handleVerifyOTP,
    handleResendCode,
    handleResetFlow,
    handleEmailChange,
    handleOtpChange,
    timeLeft,
    resendCooldown,
  } = useAuthFlow();

  const [contentRef, contentHeight] = useMeasure();

  // Type adapters for EmailForm props
  const onEmailChangeAdapter = (newEmail: string) => {
    handleEmailChange(newEmail);
  };

  const onSendOTPAdapter = (e: React.FormEvent) => {
    handleSendOTP(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, delay: 0.3 }}
      className="w-md space-y-6"
    >
      <HeaderContainer>
        <AnimatedTitle state={state} />
      </HeaderContainer>

      <motion.div
        className="transparent-container relative overflow-hidden"
        animate={{
          height: contentHeight > 0 ? contentHeight : 'auto',
          x: state === 'expired' ? [0, -5, 5, -5, 5, 0] : 0,
        }}
        transition={{
          height: { type: 'spring', stiffness: 300, damping: 30 },
          x: { duration: 0.4 },
        }}
      >
        <div ref={contentRef} className="p-md flex flex-col">
          <FormContent
            state={state}
            email={email}
            otp={otp}
            loading={loading}
            timeLeft={timeLeft}
            resendCooldown={resendCooldown}
            onEmailChange={onEmailChangeAdapter}
            onOtpChange={handleOtpChange}
            onSendOTP={onSendOTPAdapter}
            onVerifyOTP={handleVerifyOTP}
            onResendCode={handleResendCode}
            onResetFlow={handleResetFlow}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
