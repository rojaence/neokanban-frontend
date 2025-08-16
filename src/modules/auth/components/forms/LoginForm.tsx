import { useForm, type SubmitHandler } from 'react-hook-form';
import { Form } from '@/shared/components/ui/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/authSchema';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/ui/Button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/components/ui/Form';
import { Input } from '@/shared/components/ui/Input';
import { useLogin } from '../../services/authService';
import type { AuthLogin } from '../../models/AuthLogin';
import { ApiError } from '@/api/HttpError';

export const LoginForm = () => {
  const { t } = useTranslation(['auth', 'common']);
  const mutation = useLogin();
  const form = useForm({
    resolver: zodResolver(loginSchema()),
    defaultValues: {
      password: '',
      username: '',
    },
  });

  const onSubmit: SubmitHandler<AuthLogin> = async (data) => {
    await mutation.mutateAsync(data, {
      onSuccess: () => {
        alert('Login correcto');
      },
      onError: (err) => {
        if (err instanceof ApiError) {
          alert(err.response.error);
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
