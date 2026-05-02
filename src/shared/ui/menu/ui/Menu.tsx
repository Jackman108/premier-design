'use client';

import Link from 'next/link';
import { memo, type ReactElement } from 'react';

import { UI, useLocale } from '@shared/i18n';
import type { SiteLocale } from '@shared/site-data/site-locale';
import { MenuItem, MenuProps } from '@shared/ui/menu/interface/Menu.props';
import headerStyles from './HeaderMenu.module.css';
import footerStyles from './FooterMenu.module.css';
import mobileStyles from './MobileMenu.module.css';

function menuLinkLabel(item: MenuItem, locale: SiteLocale): string {
	return locale === 'en' ? item.title : item.ruTitle;
}

const styleMap: Record<string, Record<string, string>> = {
	footer: footerStyles,
	mobile: mobileStyles,
	header: headerStyles,
	default: headerStyles,
};

const Menu = memo(({ menu, menuStyle, isMobileMenuOpen, toggleMobileMenu, headerOnHero }: MenuProps): ReactElement => {
	const { locale, t, tf } = useLocale();
	const stylesToUse = styleMap[menuStyle] || styleMap.default;
	const onHeroNavClass = menuStyle === 'header' && headerOnHero ? headerStyles.menu_onHero : '';

	return (
		<nav
			className={`${stylesToUse.menu} ${onHeroNavClass} ${isMobileMenuOpen ? mobileStyles.open : ''}`}
			id={menuStyle === 'mobile' ? 'site-mobile-nav' : undefined}
			aria-label={menuStyle === 'mobile' ? t(UI.menuMobileNavAriaLabel) : undefined}
		>
			<ul className={stylesToUse.menu__container}>
				{menu.map((item: MenuItem) => {
					const { id, title } = item;
					const label = menuLinkLabel(item, locale);
					return (
						<li key={id} className={stylesToUse.menu__links}>
							<Link
								className={stylesToUse.menu__link}
								href={`/${title === 'Home' ? '' : title.toLowerCase()}`}
								onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
								passHref
								aria-label={tf(UI.menuSectionLinkAriaLabel, { section: label })}
							>
								<div className={stylesToUse.menu__item}> {label} </div>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
});
Menu.displayName = 'Menu';
export default Menu;
