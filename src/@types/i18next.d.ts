import type { translationResources } from '@/translation/translationService';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: (typeof translationResources)['es'];
  }
}
