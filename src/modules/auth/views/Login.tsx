import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/Card';
import { LoginForm } from '../components/forms/LoginForm';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const { t } = useTranslation('auth');
  return (
    <section>
      <Card className="w-full max-w-xl md:w-xl mx-auto bg-slate-100 border-none">
        <CardHeader>
          <CardTitle className="text-center">
            <h2 className="text-3xl">{t('logIn')}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="justify-center">
          <p>{t('forgotPassword')}</p>
        </CardFooter>
      </Card>
    </section>
  );
};
