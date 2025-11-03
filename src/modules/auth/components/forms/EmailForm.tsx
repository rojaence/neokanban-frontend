import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Link } from 'react-router';
import { AuthFullRoutePaths } from '../../constants/authRoutePaths';
import { useTranslation } from 'react-i18next';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  sendRecoveryPasswordSchema,
  type SendRecoveryPasswordFormData,
} from '../../schemas/authSchema';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useGenerateCodeByEmail } from '@/modules/otp/services/otpService';
import type { OtpEmailCodeReq } from '@/modules/otp/models/otp';
import { useForgotPasswordState } from '../../state/forgotPasswordState';

export const EmailForm = () => {
  const { t } = useTranslation('auth');
  const mutation = useGenerateCodeByEmail();
  const { setEmail, setStep } = useForgotPasswordState();
  const form = useForm({
    resolver: zodResolver(sendRecoveryPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<SendRecoveryPasswordFormData> = (data) => {
    const payload: OtpEmailCodeReq = {
      email: data.email,
      processType: 'CHANGE_PASSWORD',
    };
    mutation.mutate(payload);
    setEmail(data.email);
    setStep('RECOVERY_CODE');
  };

  return (
    <Card className="w-full max-w-xl md:w-xl mx-auto bg-slate-100 border-none">
      <CardHeader>
        <CardTitle className="text-center">
          <h2 className="text-3xl">{t('forgotPassword')}</h2>
        </CardTitle>
        <CardDescription className="text-center mt-5">
          {t('emailRecoveryCopy')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-10">
                  <FormLabel>{t('labels.email')}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t('placeholders.username')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit">{t('send')}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <Link to={AuthFullRoutePaths.login}>{t('goToLogin')}</Link>
      </CardFooter>
    </Card>
  );
};
