import type { translateFunc } from '@/translation/translationConfig';
import * as z from 'zod';

export const loginSchema = (t: translateFunc) =>
  z.object({
    username: z.string({ error: t('auth.errors.invalidUsername') }),
    password: z.string(),
  });
