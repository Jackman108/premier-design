import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { SITE_OPERATOR } from '@shared/constants/company';

import { SITE_PATHNAME_HEADER } from './site-pathname-header';

/**
 * Путь для SEO (hreflang): в рантайме — из `proxy`; при статической генерации заголовка может не быть — **`/`**.
 */
export async function pathnameForMetadata(): Promise<string> {
	try {
		const h = await headers();
		return h.get(SITE_PATHNAME_HEADER) ?? '/';
	} catch {
		return '/';
	}
}

/**
 * Без отдельных URL на локаль (политика i18n ~~DATA-PREM-01~~): `ru` / `en` / `x-default` указывают на один канонический URL (язык — cookie **`pd_site_locale`**; префикс **`/en`** не используется).
 */
export function hreflangAlternatesForPath(pathname: string): Pick<Metadata, 'alternates'> {
	const base = SITE_OPERATOR.publicOrigin.replace(/\/$/, '');
	const normalized = pathname === '/' || pathname === '' ? '/' : pathname.startsWith('/') ? pathname : `/${pathname}`;
	const url = `${base}${normalized}`;
	return {
		alternates: {
			canonical: url,
			languages: {
				ru: url,
				en: url,
				'x-default': url,
			},
		},
	};
}
