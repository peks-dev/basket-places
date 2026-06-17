import { motion, AnimatePresence } from 'motion/react';
import { contentVariants } from '../utils/animations';
import { SuccessIcon } from '@/app/components/ui/svgs';
import IconBox from '@/app/components/ui/IconBox';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ExpiredCodeMessage from './ExpiredCodeMessage';
import EmailForm from './EmailForm';
import CodeVerificationForm from './CodeVerificationForm';

interface FormContentProps {
  state: string;
  email: string;
  otp: string;
  loading: boolean;
  timeLeft: number;
  resendCooldown: number;
  onEmailChange: (email: string) => void;
  onOtpChange: (value: string) => void;
  onSendOTP: (e: React.FormEvent) => void;
  onVerifyOTP: (e?: React.FormEvent) => void;
  onResendCode: () => void;
  onResetFlow: () => void;
}

export const FormContent = ({
  state,
  email,
  otp,
  loading,
  timeLeft,
  resendCooldown,
  onEmailChange,
  onOtpChange,
  onSendOTP,
  onVerifyOTP,
  onResendCode,
  onResetFlow,
}: FormContentProps) => {
  const isCodeVerificationVisible =
    state === 'code_sent' || state === 'verifying';

  const renderStateContent = () => {
    switch (state) {
      case 'success':
        return (
          <motion.div
            key="success"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-center justify-center py-8"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              <IconBox
                icon={<SuccessIcon />}
                size="xl"
                className="text-success"
              />
            </motion.div>
          </motion.div>
        );

      case 'verifying':
        return (
          <motion.div
            key="verifying"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <LoadingSpinner message="analizando código..." />
          </motion.div>
        );

      case 'expired':
        return (
          <motion.div
            key="expired"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ExpiredCodeMessage onResendCode={onResendCode} />
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="forms"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="space-y-4">
              <motion.div
                animate={{
                  opacity: isCodeVerificationVisible ? 0.5 : 1,
                  scale: isCodeVerificationVisible ? 0.98 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <EmailForm
                  email={email}
                  loading={loading}
                  onEmailChange={onEmailChange}
                  onSubmit={onSendOTP}
                  isCollapsed={isCodeVerificationVisible}
                  onShowEmailForm={onResetFlow}
                />
              </motion.div>

              <AnimatePresence initial={false}>
                {isCodeVerificationVisible && (
                  <motion.div
                    key="otp-form"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <CodeVerificationForm
                      otp={otp}
                      loading={loading}
                      onOtpChange={onOtpChange}
                      onSubmit={onVerifyOTP}
                      onResendCode={onResendCode}
                      timeLeft={timeLeft}
                      resendCooldown={resendCooldown}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {renderStateContent()}
    </AnimatePresence>
  );
};
