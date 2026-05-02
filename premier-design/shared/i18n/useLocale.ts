'use client';

import { useContext } from 'react';

import { DEFAULT_SITE_LOCALE, SUPPORTED_SITE_LOCALES } from '@shared/site-data/site-locale';

import type { UiMessageKey, UiTemplateKey, UiTemplateVars } from './ui-message-keys';
import { LocaleContext } from './locale-context';
import { formatUiMessage, getUiMessage } from './ui-messages';
import type { LocaleContextValue } from './types';

export function useLocale(): LocaleContextValue {
	const ctx = useContext(LocaleContext);

	if (!ctx) {
		if (process.env.NODE_ENV === 'development') {
			console.warn(
				'[useLocale] Вызов вне LocaleProvider: оберните приложение в <LocaleProvider initialLocale={…}> из @shared/i18n.',
			);
		}
		if (process.env.NODE_ENV === 'production') {
			throw new Error('useLocale должен вызываться внутри LocaleProvider');
		}

		const fallback = DEFAULT_SITE_LOCALE;
		return {
			locale: fallback,
			setLocale: () => {},
			t: (key: UiMessageKey) => getUiMessage(fallback, key),
			tf: <K extends UiTemplateKey>(key: K, vars: UiTemplateVars<K>) =>
				formatUiMessage(fallback, key, vars as Record<string, string>),
			locales: SUPPORTED_SITE_LOCALES,
			isLocalePending: false,
		};
	}

	return ctx;
}
