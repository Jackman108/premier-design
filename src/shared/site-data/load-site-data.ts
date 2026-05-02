import siteDataEn from '../../data/locales/en/data.json';
import siteDataRu from '../../data/locales/ru/data.json';

import type { DataProps } from '@shared/validates/dataPropsSchema';
import { dataPropsSchema, formatDataPropsParseError } from '@shared/validates/dataPropsSchema';

import type { SiteLocale } from './site-locale';
import { DEFAULT_SITE_LOCALE } from './site-locale';

function parseSiteDataJson(raw: unknown, label: string): DataProps {
	const parsed = dataPropsSchema.safeParse(raw);
	if (!parsed.success) {
		throw new Error(`${label}: ${formatDataPropsParseError(parsed.error)}`);
	}
	return parsed.data;
}

const bundles: Record<SiteLocale, unknown> = {
	ru: siteDataRu,
	en: siteDataEn,
};

/** Контент сайта по локали: `data/locales/<locale>/data.json`, проходит `dataPropsSchema`. */
export function loadSiteData(locale: SiteLocale = DEFAULT_SITE_LOCALE): DataProps {
	const raw = bundles[locale];
	const label = `data/locales/${locale}/data.json`;
	return parseSiteDataJson(raw, label);
}
