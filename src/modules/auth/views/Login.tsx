import { useTranslation } from 'react-i18next';

export const Login = () => {
  const { t } = useTranslation();

  return (
    <section>
      <h2>{t('auth:logIn')}</h2>
    </section>
  );
};
