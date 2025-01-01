'use client'
import {memo, ReactElement, useCallback} from 'react';
import Link from 'next/link';
import {MenuMobileProps, MenuProps, MenuStyleProps} from '../../interface/Menu.props';
import headerStyles from './HeaderMenu.module.css';
import footerStyles from './FooterMenu.module.css';
import mobileStyles from './MobileMenu.module.css';

const styleMap: Record<string, Record<string, string>> = {
    footer: footerStyles,
    mobile: mobileStyles,
    header: headerStyles,
    default: headerStyles,
};

const Menu = memo(({menu, menuStyle, isMobileMenuOpen, toggleMobileMenu}: MenuStyleProps & MenuMobileProps
): ReactElement => {
    const stylesToUse = styleMap[menuStyle] || styleMap.default;

    const handleClick = useCallback(() => {
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    }, [isMobileMenuOpen, toggleMobileMenu]);


    return (
        <nav className={`${stylesToUse.menu} ${isMobileMenuOpen ? mobileStyles.open : ''}`}>
            <ul className={stylesToUse.menu__container}>
                {menu.map(({id, title, ruTitle}: MenuProps) => (
                    <li key={id} className={stylesToUse.menu__links}>
                        <Link
                            className={stylesToUse.menu__link}
                            href={`/${title === 'Home' ? '' : title.toLowerCase()}`}
                            onClick={isMobileMenuOpen ? handleClick : undefined}
                            passHref
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
