'use server';

import { cookies } from 'next/headers';

import { isSupportedSiteLocale, type SiteLocale } from '@shared/site-data/site-locale';
import { PD_SITE_LOCALE_COOKIE } from '@shared/site-data/site-locale-cookie';

export async function setSiteLocaleCookie(locale: SiteLocale): Promise<void> {
	if (!isSupportedSiteLocale(locale)) return;
	const jar = await cookies();
	jar.set(PD_SITE_LOCALE_COOKIE, locale, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		sameSite: 'lax',
		httpOnly: false,
	});
}
