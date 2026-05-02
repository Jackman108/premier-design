export interface MenuItem {
	id: number;
	title: string;
	ruTitle: string;
}

export interface MenuProps {
	menu: MenuItem[];
	/** Подписи пунктов: `ru` — `ruTitle`, `en` — `title`; строки a11y — `data/locales/* /ui.json` через `@shared/i18n`. **/
	menuStyle: 'header' | 'footer' | 'mobile';
	isMobileMenuOpen: boolean;
	toggleMobileMenu: () => void;
	/** Прозрачный хедер поверх hero: светлые пункты меню для контраста */
	headerOnHero?: boolean;
}
