import z from 'zod';
import { otpProcessTypeValues } from '../models/otp';
import { translate } from '@/translation/translationService';

export const OtpProcessSchema = z.enum(
  otpProcessTypeValues as [string, ...string[]],
);

export const RecoveryCodeSchema = z.object({
  code: z.string({ error: translate('common:validations.required') }),
});
