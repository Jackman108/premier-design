import Logo from '@shared/ui/logo/Logo';
import Phone from '@shared/ui/phone/Phone';
import SocialIcons from '@shared/ui/social-icons/SocialIcons';
import Menu from '@shared/ui/menu/ui/Menu';
import MenuButton from '../menu-button/MenuButton';
import ThemeButton from '../theme-button/ThemeButton';
import styles from './Header.module.css';
import {FC, ReactElement} from 'react';
import WorkHours from '@shared/ui/work-hours/WorkHours';
import {HeaderProps} from '../../interface/Header.props';
import {ShareBanner} from '@features/banner';
import {useHeaderLayout} from '../../hooks/useHeaderLayout';

const Header: FC<HeaderProps> = ({menu, shares}): ReactElement => {
    const {
        headerRef,
        currentTheme,
        toggleTheme,
        isMobileMenuOpen,
        toggleMobileMenu,
        isSticky,
        hasShareBanner,
        placeholderStyle,
    } = useHeaderLayout({menu, shares});

    return (
        <>
            <ShareBanner isSticky={isSticky} shares={shares}/>
            <header
                ref={headerRef}
                className={`${styles.header} ${isSticky ? styles.sticky : ''} ${hasShareBanner ? styles.withShareBanner : ''}`}
            >
                <div className={styles.header__container}>
                    <Logo/>
                    <div className={styles.contact__container}>
                        <WorkHours/>
                        <Phone/>
                        <SocialIcons/>
                    </div>
                    <div className={styles.buttons__container}>
                        <ThemeButton
                            currentTheme={currentTheme}
                            toggleTheme={toggleTheme}
                        />
                        <MenuButton
                            isMobileMenuOpen={isMobileMenuOpen}
                            toggleMobileMenu={toggleMobileMenu}
                        />
                    </div>
                    <Menu
                        isMobileMenuOpen={isMobileMenuOpen}
                        toggleMobileMenu={toggleMobileMenu}
                        menu={menu}
                        menuStyle='header'
                        headerOnHero={!isSticky}
                    />
                </div>
            </header>
            <Menu
                menu={menu}
                menuStyle='mobile'
                isMobileMenuOpen={isMobileMenuOpen}
                toggleMobileMenu={toggleMobileMenu}
            />
            {isSticky && (
                <div
                    className={styles.stickyPlaceholder}
                    style={placeholderStyle}
                />
            )}
        </>
    );
};

export default Header;
