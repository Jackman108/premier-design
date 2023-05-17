import Logo from '../../Logo/Logo';
import Phone from '../../Phone/Phone';
import SocialIcons from '../../SocialIcons/SocialIcons';
import useResizeEffects from '../../hooks/useResizeEffects';
import useMobileMenu from '../../hooks/useMobileMenu';
import DesktopMenu from '../../Menu/DesktopMenu/DesktopMenu';
import MobileMenu from '../../Menu/MobileMenu/MobileMenu';
import MenuButton from '../../UX/MenuButton/MenuButton';
import ThemeButton from '../../UX/ThemeButton/ThemeButton';
import styles from './Header.module.css';

const Header: React.FC<{ data: DataProps }> = ({ data }): JSX.Element => {
    const { currentTheme, toggleTheme } = useResizeEffects();
    const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu(false);
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Logo />
                <DesktopMenu 
                data={data} 
                menuStyle='header' />
                <Phone />
                <SocialIcons />
                <ThemeButton
                    currentTheme={currentTheme}
                    toggleTheme={toggleTheme} />
                <MenuButton data={data}
                    isMobileMenuOpen={isMobileMenuOpen}
                    toggleMobileMenu={toggleMobileMenu} />
                <MobileMenu data={data}
                    isMobileMenuOpen={isMobileMenuOpen}
                    toggleMobileMenu={toggleMobileMenu} />
            </div>
        </header>
    );
}

export default Header;
