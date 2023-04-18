import React from 'react';
import styles from './Header.module.css';
import MenuItems from '../MenuItems/MenuItems';
import MobileMenu from '../MobileMenu/MobileMenu';
import DesktopMenu from '../DesktopMenu/DesktopMenu';
import Logo from '../Logo/Logo';
import Phone from '../Phone/Phone';
import SocialIcons from '../SocialIcons/SocialIcons';
import useHeaderEffects from '../hooks/useHeaderEffects';
import useMobileMenu from '../hooks/useMobileMenu';
import ThemeButton from '../UX/ThemeButton/ThemeButton';
import MenuButton from '../UX/MenuButton/MenuButton';

function Header(): JSX.Element { 
    const { currentTheme, toggleTheme } = useHeaderEffects();
    const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu(false);
    return (
        <header className={styles.header}>
            <div className={`${styles.container} container`}>
                <Logo />
                <MobileMenu MenuItems={MenuItems} isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
                <DesktopMenu MenuItems={MenuItems} />               
                <Phone/>
                <SocialIcons />
                <ThemeButton currentTheme={currentTheme} toggleTheme={toggleTheme} />
                <MenuButton toggleMobileMenu={toggleMobileMenu} />
            </div>
        </header>
    );
}

export default Header;
