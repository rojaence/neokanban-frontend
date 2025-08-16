/* eslint-disable prettier/prettier */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonES from './locales/es/common.json';
import authES from './locales/es/auth.json';

import commonEN from './locales/en/common.json';
import authEN from './locales/en/auth.json';

export const translationResources = {
  es: {
    common: commonES,
    auth: authES
  },
  en: {
    common: commonEN,
    auth: authEN
  }
} as const;

void i18n
.use(initReactI18next).init({
  lng: 'es',
  debug: true,
  fallbackLng: 'en',
  ns: ['common', 'auth'],
  defaultNS: 'common',
  resources: translationResources,
  interpolation: {
    escapeValue: false,
  }
});

export type translateFunc = (key: string) => string;
const translate = i18n.t;
export { translate };
export default i18n;
