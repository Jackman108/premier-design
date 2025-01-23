'use client'
import {memo, ReactElement} from 'react';
import Link from 'next/link';
import {MenuItem, MenuProps} from '@shared/ui/menu/interface/Menu.props';
import headerStyles from './HeaderMenu.module.css';
import footerStyles from './FooterMenu.module.css';
import mobileStyles from './MobileMenu.module.css';

const styleMap: Record<string, Record<string, string>> = {
    footer: footerStyles,
    mobile: mobileStyles,
    header: headerStyles,
    default: headerStyles,
};

const Menu = memo(({menu, menuStyle, isMobileMenuOpen, toggleMobileMenu}: MenuProps
): ReactElement => {
    const stylesToUse = styleMap[menuStyle] || styleMap.default;

    return (
        <nav className={`${stylesToUse.menu} ${isMobileMenuOpen ? mobileStyles.open : ''}`}>
            <ul className={stylesToUse.menu__container}>
                {menu.map(({id, title, ruTitle}: MenuItem) => (
                    <li key={id} className={stylesToUse.menu__links}>
                        <Link
                            className={stylesToUse.menu__link}
                            href={`/${title === 'Home' ? '' : title.toLowerCase()}`}
                            onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
                            passHref
                            aria-label={`Перейти к разделу ${ruTitle}`}
                        >
                            <div className={stylesToUse.menu__item}> {ruTitle} </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
});
Menu.displayName = "Menu";
export default Menu;
