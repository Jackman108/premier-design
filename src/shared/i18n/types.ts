import type { SiteLocale } from '@shared/site-data/site-locale';

import type { UiMessageKey, UiTemplateKey, UiTemplateVars } from './ui-message-keys';

/** Контекст локали и UI-строк из `data/locales/<locale>/ui.json` (подход как во Feb Code: `LocaleProvider` / `useLocale`). */
export interface LocaleContextValue {
	locale: SiteLocale;
	setLocale: (locale: SiteLocale) => void;
	t: (key: UiMessageKey) => string;
	tf: <K extends UiTemplateKey>(key: K, vars: UiTemplateVars<K>) => string;
	locales: readonly SiteLocale[];
	isLocalePending: boolean;
}
