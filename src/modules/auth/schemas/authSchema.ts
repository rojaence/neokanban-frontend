import { translate } from '@/translation/translationService';
import * as z from 'zod';

export const passwordSchema = z
  .string()
  .nonempty({ error: translate('common:validations.required') })
  .min(8, { error: translate('auth:passwordValidations.minLength') })
  .refine((val) => /[A-Z]/.test(val), {
    error: translate('auth:passwordValidations.capitalChar'),
  })
  .refine((val) => /\d/.test(val), {
    error: translate('auth:passwordValidations.numberChar'),
  })
  .refine((val) => /[^\da-zA-Z]/.test(val), {
    error: translate('auth:passwordValidations.specialChar'),
  });

export const loginSchema = () =>
  z.object({
    username: z
      .string()
      .nonempty({ error: translate('common:validations.required') }),
    password: z
      .string()
      .nonempty({ error: translate('common:validations.required') }),
  });

export const sendRecoveryPasswordSchema = z.object({
  email: z.email({ error: translate('common:validations.invalidEmail') }),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z
      .string()
      .nonempty({ error: translate('common:validations.required') }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: translate('auth:passwordValidations.confirmPassword'),
    path: ['confirmPassword', 'password'],
  });

export type SendRecoveryPasswordFormData = z.infer<
  typeof sendRecoveryPasswordSchema
>;

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
