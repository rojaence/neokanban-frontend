import { ChangePasswordForm } from '../components/forms/ChangePasswordForm';
import { EmailForm } from '../components/forms/EmailForm';
import { PasswordCodeForm } from '../components/forms/PasswordCodeForm';
import { useForgotPasswordState } from '../state/forgotPasswordState';

export const ForgotPassword = () => {
  const { step } = useForgotPasswordState();

  if (step === 'SEND_EMAIL') {
    return <EmailForm />;
  }

  if (step === 'RECOVERY_CODE') {
    return <PasswordCodeForm />;
  }

  if (step === 'CHANGE_PASSWORD') {
    return <ChangePasswordForm />;
  }
};
