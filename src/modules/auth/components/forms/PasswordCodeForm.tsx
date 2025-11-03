import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Link } from 'react-router';
import { AuthFullRoutePaths } from '../../constants/authRoutePaths';
import { useTranslation } from 'react-i18next';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RecoveryCodeSchema } from '@/modules/otp/schemas/otpSchema';
import { useVerifyCodeByEmail } from '@/modules/otp/services/otpService';
import type { VerifyOtpEmailReq, VerifyOtpReq } from '@/modules/otp/models/otp';
import { ApiError } from '@/api/HttpError';
import { toast } from 'sonner';
import { useForgotPasswordState } from '../../state/forgotPasswordState';

export const PasswordCodeForm = () => {
  const { t } = useTranslation('auth');
  const mutation = useVerifyCodeByEmail();
  const { setStep, setOtpToken, email: userEmail } = useForgotPasswordState();
  const form = useForm({
    resolver: zodResolver(RecoveryCodeSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit: SubmitHandler<Pick<VerifyOtpReq, 'code'>> = async (data) => {
    const payload: VerifyOtpEmailReq = {
      email: userEmail!,
      processType: 'CHANGE_PASSWORD',
      code: data.code,
    };
    await mutation.mutateAsync(payload, {
      onSuccess: (res) => {
        setOtpToken(res.data!.otpToken);
        setStep('CHANGE_PASSWORD');
      },
      onError: (err) => {
        if (err instanceof ApiError) {
          toast.error(err.response.message);
        }
      },
    });
  };

  return (
    <Card className="w-full max-w-xl md:w-xl mx-auto bg-slate-100 border-none">
      <CardHeader>
        <CardTitle className="text-center">
          <h2 className="text-3xl">{t('recoveryCode')}</h2>
        </CardTitle>
        <CardDescription className="text-center mt-5">
          {t('recoveryCodeCopy')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="my-10">
                  <FormLabel>{t('labels.code')}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
