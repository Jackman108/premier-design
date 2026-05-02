import { cookies } from 'next/headers';

import type { SiteLocale } from './site-locale';
import { DEFAULT_SITE_LOCALE, isSupportedSiteLocale } from './site-locale';
import { PD_SITE_LOCALE_COOKIE } from './site-locale-cookie';

/** Локаль из cookie запроса; вне контекста Next request (build, скрипты) — `DEFAULT_SITE_LOCALE`. */
export async function resolveRequestSiteLocale(): Promise<SiteLocale> {
	try {
		const jar = await cookies();
		const raw = jar.get(PD_SITE_LOCALE_COOKIE)?.value;
		if (raw && isSupportedSiteLocale(raw)) return raw;
	} catch {
		/* вне HTTP-запроса */
	}
	return DEFAULT_SITE_LOCALE;
}
