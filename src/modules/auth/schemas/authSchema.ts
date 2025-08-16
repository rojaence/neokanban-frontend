import { translate } from '@/translation/translationService';
import * as z from 'zod';

export const loginSchema = () =>
  z.object({
    username: z
      .string()
      .nonempty({ error: translate('common:validations.required') }),
    password: z
      .string()
      .nonempty({ error: translate('common:validations.required') }),
  });
