import { useForm, type SubmitHandler } from 'react-hook-form';
import { Form } from '@/shared/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/authSchema';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useLogin } from '../../services/authService';
import type { AuthLoginDto } from '../../models/AuthLogin';
import { ApiError } from '@/api/HttpError';
import { toast } from 'sonner';

interface Props {
  onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: Props) => {
  const { t } = useTranslation(['auth', 'common']);
  const mutation = useLogin();
  const form = useForm({
    resolver: zodResolver(loginSchema()),
    defaultValues: {
      password: '',
      username: '',
    },
  });

  const onSubmit: SubmitHandler<AuthLoginDto> = async (data) => {
    await mutation.mutateAsync(data, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (err) => {
        if (err instanceof ApiError) {
          toast.error(err.response.error);
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth:labels.username')}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t('auth:placeholders.username')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth:labels.password')}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit" disabled={mutation.isPending}>
            {t('auth:logIn')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
