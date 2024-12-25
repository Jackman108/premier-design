'use client'
import {memo, ReactElement, useCallback, useMemo} from 'react';
import Link from 'next/link';
import {MenuMobileProps, MenuProps, MenuStyleProps} from '../../interface/Menu.props';
import headerStyles from './HeaderMenu.module.css';
import footerStyles from './FooterMenu.module.css';
import mobileStyles from './MobileMenu.module.css';

const getMenuStyles = (menuStyle: string) => {
    switch (menuStyle) {
        case 'footer':
            return footerStyles;
        case 'mobile':
            return mobileStyles;
        default:
            return headerStyles;
    }
};

const Menu = memo(({
                       data,
                       menuStyle,
                       isMobileMenuOpen,
                       toggleMobileMenu
                   }: MenuStyleProps & MenuMobileProps
): ReactElement => {
    const memoizedMenu = useMemo(() => data.menu || [], [data.menu]);
    const stylesToUse = getMenuStyles(menuStyle);
    const isMobile = menuStyle === 'mobile';


    const handleClick = useCallback(() => {
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    }, [isMobileMenuOpen, toggleMobileMenu]);


    return (
        <nav className={`${stylesToUse.menu} 
        ${isMobile && isMobileMenuOpen ? mobileStyles.open : ''}`}
        >
            <ul className={stylesToUse.menu__container}>
                {memoizedMenu.map(({id, title, ruTitle}: MenuProps) => (
                    <li
                        key={id}
                        className={stylesToUse.menu__links}
                    >
                        <Link
                            className={stylesToUse.menu__link}
                            href={`/${title === 'Home' ? '' : title.toLowerCase()}`}
                            onClick={isMobileMenuOpen ? handleClick : undefined}
                            passHref
                        >
                            <div className={stylesToUse.menu__item}>
                                {ruTitle}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
});
Menu.displayName = "Menu";
export default Menu;
