/**
 * Локаль контента: **`ru`** — канон; **`en`** — валидный бандл. Выбор — cookie **`pd_site_locale`**, переключатель в хедере, `<html lang>`; полный продуктовый перевод и `hreflang` — **DATA-PREM-01**.
 */
export type SiteLocale = 'ru' | 'en';

/** Локаль по умолчанию для текущего деплоя (контент и UI-копирайт в основном RU). */
export const SITE_LOCALE: SiteLocale = 'ru';

export const DEFAULT_SITE_LOCALE: SiteLocale = SITE_LOCALE;

export const SUPPORTED_SITE_LOCALES: readonly SiteLocale[] = ['ru', 'en'];

export function isSupportedSiteLocale(value: string): value is SiteLocale {
	return value === 'ru' || value === 'en';
}
