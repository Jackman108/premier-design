import Logo from '@shared/ui/logo/Logo';
import Phone from '@shared/ui/phone/Phone';
import SocialIcons from '@shared/ui/social-icons/SocialIcons';
import useThemeToggle from '../../hooks/useThemeToggle';
import useMobileMenu from '../../hooks/useMobileMenu';
import Menu from '@shared/ui/menu/ui/Menu';
import MenuButton from '../menu-button/MenuButton';
import ThemeButton from '../theme-button/ThemeButton';
import styles from './Header.module.css';
import {CSSProperties, FC, ReactElement, useRef} from 'react';
import WorkHours from '@shared/ui/work-hours/WorkHours';
import {HeaderProps} from '../../interface/Header.props';
import {useStickyHeader} from '../../hooks/useStickyHeader';
import ShareBanner from '@features/banner/share/ui/ShareBanner';
import {useShareBanner} from '@features/banner/share/hooks/useShareBanner';
import {useShareBannerHeight} from '@shared/hooks/useShareBannerHeight';
import {useHeaderPlaceholderHeight} from '../../hooks/useHeaderPlaceholderHeight';

const Header: FC<HeaderProps> = ({menu, shares}): ReactElement => {
    const headerRef = useRef<HTMLElement>(null);
    const {currentTheme, toggleTheme} = useThemeToggle();
    const {isMobileMenuOpen, toggleMobileMenu} = useMobileMenu(false);
    const {isSticky} = useStickyHeader();
    const {isClosed} = useShareBanner();
    const fallbackPlaceholderPx = isClosed ? 102 : 162;
    const measuredHeaderPx = useHeaderPlaceholderHeight(headerRef, isSticky);
    const placeholderHeightPx = isSticky && measuredHeaderPx != null ? measuredHeaderPx : fallbackPlaceholderPx;
    const hasShareBanner = !isClosed && !isSticky;
    useShareBannerHeight(hasShareBanner);

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
                    style={{'--header-placeholder-height': `${placeholderHeightPx}px`} as CSSProperties}
                />
            )}
        </>
    );
};

export default Header;
