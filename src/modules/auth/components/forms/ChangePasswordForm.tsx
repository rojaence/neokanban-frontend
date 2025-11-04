import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Link, useNavigate } from 'react-router';
import { AuthFullRoutePaths } from '../../constants/authRoutePaths';
import { useTranslation } from 'react-i18next';
import { useResetPassword } from '../../services/authService';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  resetPasswordSchema,
  type ResetPasswordType,
} from '../../schemas/authSchema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { ResetPasswordReq } from '@/shared/models/auth';
import { useOtpProcessState } from '../../state/otpProcessState';
import { toast } from 'sonner';
import { ApiError } from '@/api/HttpError';
import { confirmService } from '@/shared/services/confirm/confirmService';

export const ChangePasswordForm = () => {
  const { t } = useTranslation('auth');
  const { email: userEmail, otpToken } = useOtpProcessState();
  const mutation = useResetPassword();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
  });

  const handleSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
    const payload: ResetPasswordReq = {
      ...data,
      email: userEmail!,
      otpToken: otpToken!,
    };
    await mutation.mutateAsync(payload, {
      onSuccess: async () => {
        await confirmService({
          title: t('resetPassword'),
          message: t('resetPasswordSuccess'),
          variant: 'default',
        });
        await navigate(AuthFullRoutePaths.login);
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
          <h2 className="text-3xl">{t('resetPassword')}</h2>
        </CardTitle>
        <CardDescription className="text-center mt-5">
          {t('resetPasswordCopy')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-10">
                  <FormLabel>{t('labels.password')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="my-10">
                  <FormLabel>{t('labels.confirmPassword')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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
