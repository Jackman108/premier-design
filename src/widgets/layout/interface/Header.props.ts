import type { MenuItem } from '@shared/ui/menu/interface/Menu.props';
import type { ShareBannerDataProps } from '@features/banner';

export type HeaderVariant = 'default' | 'solidDark';

export interface HeaderProps {
	menu: MenuItem[];
	shares: ShareBannerDataProps[];
	/**
	 * Тёмная плашка (фон + светлое меню) для маршрутов без full-screen hero: `app/documents/*`,
	 * SSG-страницы категории/детали услуги, related — см. `buildLayoutProps` / `useLayoutProps(..., { headerVariant: 'solidDark' })`.
	 * Локаль UI — **`LocaleProvider`** / **`useLocale`** (`@shared/i18n`).
	 * `default` — прозрачный хедер до прокрутки, как на лендингах с `HeroBanner`.
	 */
	variant?: HeaderVariant;
}
