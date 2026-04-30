/**
 * Локаль контента сайта: сейчас поддерживается только **RU** (`data/locales/ru/`).
 * Другие языки — отдельные каталоги JSON + расширение типа и `load-site-data.ts`.
 */
export type SiteLocale = 'ru';

export const SITE_LOCALE: SiteLocale = 'ru';

export const DEFAULT_SITE_LOCALE: SiteLocale = SITE_LOCALE;
