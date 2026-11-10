import { translations, type TranslationKey } from './translations';
import type { L, Locale, Text } from '../data/types';

export type { L, Locale, Text, TranslationKey };
export const LOCALES: Locale[] = ['en', 'pt-br'];

export function useTranslations(locale: string) {
  const lang = (locale in translations ? locale : 'en') as Locale;
  return function t(key: TranslationKey): string {
    return translations[lang][key] ?? translations['en'][key] ?? key;
  };
}

/** Resolve a `Text` (plain string or per-locale pair) for a locale. */
export function tr(value: Text, locale: Locale): string {
  return typeof value === 'string' ? value : value[locale];
}

/** "A (X) and B (Y)" / "A (X) e B (Y)", with each person's affiliation. */
export function joinPeople(people: { name: string; affiliation?: string }[], locale: Locale): string {
  const names = people.map((p) => (p.affiliation ? `${p.name} (${p.affiliation})` : p.name));
  return new Intl.ListFormat(htmlLang(locale), { style: 'long', type: 'conjunction' }).format(names);
}

/** Like joinPeople, but each name links to its `url` when there is one (trusted HTML). */
export function peopleHtml(people: { name: string; url?: string }[], locale: Locale): string {
  const names = people.map((p) =>
    p.url ? `<a href="${p.url}" class="link" target="_blank" rel="noopener noreferrer">${p.name}</a>` : p.name,
  );
  return new Intl.ListFormat(htmlLang(locale), { style: 'long', type: 'conjunction' }).format(names);
}

/** Resolve a per-locale pair of anything. */
export function pick<T>(value: L<T>, locale: Locale): T {
  return value[locale];
}

/** Site path for a locale: `/projects` → `/pt-br/projects` in Portuguese. */
export function getLocalePath(locale: string, path: string): string {
  if (locale === 'en') return path;
  return `/pt-br${path === '/' ? '' : path}`;
}

export function getOtherLocale(locale: string): Locale {
  return locale === 'en' ? 'pt-br' : 'en';
}

/** The HTML `lang` value. The locale key is `pt-br`, but the attribute is `pt-BR`. */
export function htmlLang(locale: Locale): 'en' | 'pt-BR' {
  return locale === 'pt-br' ? 'pt-BR' : 'en';
}

/** Locale of the page being rendered, from Astro.currentLocale. */
export function asLocale(value: string | undefined): Locale {
  return value === 'pt-br' ? 'pt-br' : 'en';
}

// Month names as in the PDF CVs (cv/_cv.lua).
const MONTHS: Record<Locale, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  'pt-br': ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
};

/** "02/2026 – present" → "Feb 2026 – present": spells out every MM/YYYY in a date label. */
export function monthNames(label: string, locale: Locale): string {
  return label.replace(/\b(0[1-9]|1[0-2])\/(\d{4})\b/g, (_, m, y) => `${MONTHS[locale][Number(m) - 1]} ${y}`);
}
