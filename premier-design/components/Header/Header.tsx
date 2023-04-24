import React from 'react';
import styles from './Header.module.css';
import MenuItems from '../Menu/MenuItems/MenuItems';
import MobileMenu from '../Menu/MobileMenu/MobileMenu';
import DesktopMenu from '../Menu/DesktopMenu/DesktopMenu';
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
            <div className={`${styles.header__container} container`}>
                <Logo />
                <DesktopMenu MenuItems={MenuItems} />               
                <Phone/>
                <SocialIcons />
                <ThemeButton currentTheme={currentTheme} toggleTheme={toggleTheme} />
                <MenuButton toggleMobileMenu={toggleMobileMenu} />
                <MobileMenu MenuItems={MenuItems} isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

            </div>
        </header>
    );
}

export default Header;
