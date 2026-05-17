import { translations, type Locale, type TranslationKey } from './translations';

export function useTranslations(locale: string) {
  const lang = (locale in translations ? locale : 'en') as Locale;
  return function t(key: TranslationKey): string {
    return translations[lang][key] ?? translations['en'][key] ?? key;
  };
}

export function getLocalePath(locale: string, path: string): string {
  if (locale === 'en') return path;
  return `/pt-br${path === '/' ? '' : path}`;
}

export function getOtherLocale(locale: string): string {
  return locale === 'en' ? 'pt-br' : 'en';
}
