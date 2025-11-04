import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { LoginForm } from '../components/forms/LoginForm';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { AuthFullRoutePaths } from '../constants/authRoutePaths';
import { useOtpProcessState } from '../state/otpProcessState';
import { useEffect } from 'react';

export const Login = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { setStep } = useOtpProcessState();
  const navigateToDashboard = () => navigate('/dashboard');

  useEffect(() => {
    return () => {
      setStep('SEND_EMAIL');
    };
  }, [setStep]);

  return (
    <section>
      <Card className="w-full max-w-xl md:w-xl mx-auto bg-slate-100 border-none">
        <CardHeader>
          <CardTitle className="text-center">
            <h2 className="text-3xl">{t('logIn')}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm onSuccess={navigateToDashboard} />
        </CardContent>
        <CardFooter className="justify-center">
          <Link to={AuthFullRoutePaths.forgotPassword}>
            {t('forgotPassword')}
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};
