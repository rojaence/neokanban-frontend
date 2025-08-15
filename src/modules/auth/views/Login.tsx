import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/Card';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../components/forms/LoginForm';
export const Login = () => {
  const { t } = useTranslation();

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>{t('auth:logIn')}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="justify-center">
          <p>{t('auth:forgotPassword')}</p>
        </CardFooter>
      </Card>
    </section>
  );
};
