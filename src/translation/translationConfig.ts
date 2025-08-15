/* eslint-disable prettier/prettier */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonES from './locales/es/common.json';
import authES from './locales/es/auth.json';

import commonEN from './locales/en/common.json';
import authEN from './locales/en/auth.json';

void i18n
.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'en',
  ns: ['common', 'auth'],
  defaultNS: 'common',
  resources: {
    es: {
      common: commonES,
      auth: authES
    },
    en: {
      common: commonEN,
      auth: authEN
    }, 
  },
  interpolation: {
    escapeValue: false,
  }
});

export type translateFunc = (key: string) => string;

export default i18n;
