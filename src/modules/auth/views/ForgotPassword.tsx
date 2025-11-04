import { ChangePasswordForm } from '../components/forms/ChangePasswordForm';
import { EmailForm } from '../components/forms/EmailForm';
import { PasswordCodeForm } from '../components/forms/PasswordCodeForm';
import { useOtpProcessState } from '../state/otpProcessState';

export const ForgotPassword = () => {
  const { step } = useOtpProcessState();

  if (step === 'SEND_EMAIL') {
    return <EmailForm />;
  }

  if (step === 'RECOVERY_CODE') {
    return <PasswordCodeForm />;
  }

  if (step === 'VERIFIED_CODE') {
    return <ChangePasswordForm />;
  }
};
