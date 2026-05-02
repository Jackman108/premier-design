'use client';

import { setSiteLocaleCookie } from '@shared/lib/server-actions/set-site-locale';
import { SUPPORTED_SITE_LOCALES, type SiteLocale } from '@shared/site-data/site-locale';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState, useTransition, type ReactNode } from 'react';

import { LocaleContext } from './locale-context';
import type { UiMessageKey, UiTemplateKey, UiTemplateVars } from './ui-message-keys';
import { formatUiMessage, getUiMessage } from './ui-messages';

export function LocaleProvider({ children, initialLocale }: { children: ReactNode; initialLocale: SiteLocale }) {
	const router = useRouter();
	const [locale, setLocaleState] = useState<SiteLocale>(initialLocale);
	const [isPending, startTransition] = useTransition();

	const setLocale = useCallback(
		(next: SiteLocale) => {
			if (next === locale) return;
			setLocaleState(next);
			startTransition(async () => {
				await setSiteLocaleCookie(next);
				router.refresh();
			});
		},
		[locale, router],
	);

	const value = useMemo(
		() => ({
			locale,
			setLocale,
			t: (key: UiMessageKey) => getUiMessage(locale, key),
			tf: <K extends UiTemplateKey>(key: K, vars: UiTemplateVars<K>) =>
				formatUiMessage(locale, key, vars as Record<string, string>),
			locales: SUPPORTED_SITE_LOCALES,
			isLocalePending: isPending,
		}),
		[locale, setLocale, isPending],
	);

	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
