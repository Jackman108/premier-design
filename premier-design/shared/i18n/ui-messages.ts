import type { SiteLocale } from '@shared/site-data/site-locale';

import type { UiMessageKey, UiTemplateKey } from './ui-message-keys';

import en from '../../data/locales/en/ui.json';
import ru from '../../data/locales/ru/ui.json';

export const uiMessages: Record<SiteLocale, Record<string, string>> = {
	ru,
	en,
};

export function getUiMessage(locale: SiteLocale, key: UiMessageKey): string {
	return uiMessages[locale]?.[key] ?? uiMessages.ru[key] ?? key;
}

/** Подстановка `{name}` в строке словаря (только ключи с плейсхолдерами). */
export function formatUiMessage(locale: SiteLocale, key: UiTemplateKey, vars: Record<string, string>): string {
	let s = getUiMessage(locale, key as UiMessageKey);
	for (const [k, v] of Object.entries(vars)) {
		s = s.split(`{${k}}`).join(v);
	}
	return s;
}
