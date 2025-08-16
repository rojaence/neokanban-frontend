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
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>{t('logIn')}</h2>
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
