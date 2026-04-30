import siteDataRu from '../../data/locales/ru/data.json';

import type { DataProps } from '@shared/validates/dataPropsSchema';
import { dataPropsSchema, formatDataPropsParseError } from '@shared/validates/dataPropsSchema';

function parseSiteDataJson(raw: unknown, label: string): DataProps {
	const parsed = dataPropsSchema.safeParse(raw);
	if (!parsed.success) {
		throw new Error(`${label}: ${formatDataPropsParseError(parsed.error)}`);
	}
	return parsed.data;
}

/** Контент сайта (RU): `data/locales/ru/data.json`, проходит `dataPropsSchema`. */
export function loadSiteData(): DataProps {
	return parseSiteDataJson(siteDataRu, 'data/locales/ru/data.json');
}
