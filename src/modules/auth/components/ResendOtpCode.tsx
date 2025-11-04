import { useGenerateCodeByEmail } from '@/modules/otp/services/otpService';
import { Button } from '@/shared/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useOtpProcessState } from '../state/otpProcessState';
import { useCountdown } from '@/shared/hooks/use-countdown';
import { useEffect } from 'react';
import { ApiError } from '@/api/HttpError';
import { toast } from 'sonner';

interface Props {
  loading?: boolean;
}

export const ResendOtpCode = ({ loading = false }: Props) => {
  const mutation = useGenerateCodeByEmail();
  const { setIsPending, email, processType } = useOtpProcessState();
  const { t } = useTranslation('common');
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000,
  });

  const handleResend = async () => {
    setIsPending(true);
    resetCountdown();
    startCountdown();
    if (!email || !processType) return;
    await mutation.mutateAsync(
      { email, processType },
      {
        onSettled: () => {
          setIsPending(false);
        },
        onError: (err) => {
          if (err instanceof ApiError) {
            toast.error(err.response.message);
          }
        },
      },
    );
  };

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  return (
    <div>
      <Button
        loading={loading || mutation.isPending || count > 0}
        type="button"
        variant={'secondary'}
        onClick={handleResend}
      >
        {count > 0 && <span>{count}s</span>}
        <span>{t('actions.resendCode')}</span>
      </Button>
    </div>
  );
};
