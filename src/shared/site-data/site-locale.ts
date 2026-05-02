/**
 * Локаль контента: **`ru`** — канон; **`en`** — полный бандл **`data.json`** + **`ui.json`** (базовая редакционная вычитка EN — ~~DATA-PREM-01~~). Выбор — cookie **`pd_site_locale`**, переключатель в хедере, `<html lang>`; **`hreflang`** без префикса **`/en`** — см. **`hreflangAlternates`**.
 */
export type SiteLocale = 'ru' | 'en';

/** Локаль по умолчанию для текущего деплоя (контент и UI-копирайт в основном RU). */
export const SITE_LOCALE: SiteLocale = 'ru';

export const DEFAULT_SITE_LOCALE: SiteLocale = SITE_LOCALE;

export const SUPPORTED_SITE_LOCALES: readonly SiteLocale[] = ['ru', 'en'];

export function isSupportedSiteLocale(value: string): value is SiteLocale {
	return value === 'ru' || value === 'en';
}
