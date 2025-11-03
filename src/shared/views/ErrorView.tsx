import { useTranslation } from 'react-i18next';

export const ErrorView = () => {
  const { t } = useTranslation('common');
  return (
    <article className="grid place-items-center min-h-screen w-full">
      {t('copy.errorViewMessage')}
    </article>
  );
};
