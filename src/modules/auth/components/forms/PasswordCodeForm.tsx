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
import { useOtpProcessState } from '../../state/otpProcessState';
import { ResendOtpCode } from '../ResendOtpCode';

export const PasswordCodeForm = () => {
  const { t } = useTranslation(['auth', 'common']);
  const mutation = useVerifyCodeByEmail();
  const {
    setStep,
    setOtpToken,
    email: userEmail,
    setIsPending,
  } = useOtpProcessState();
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
    setIsPending(true);
    await mutation.mutateAsync(payload, {
      onSuccess: (res) => {
        setOtpToken(res.data!.otpToken);
        setStep('VERIFIED_CODE');
      },
      onError: (err) => {
        if (err instanceof ApiError) {
          toast.error(err.response.message);
        }
      },
      onSettled: () => {
        setIsPending(false);
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
            <div className="flex justify-center flex-col items-center gap-2">
              <Button loading={mutation.isPending} type="submit">
                {t('common:actions.verify')}
              </Button>
              <ResendOtpCode />
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
