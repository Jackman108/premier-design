import Logo from '../../components/Logo/Logo';
import Phone from '../../components/Phone/Phone';
import SocialIcons from '../../components/SocialIcons/SocialIcons';
import useThemeToggle from '../../hooks/useThemeToggle';
import useMobileMenu from '../../hooks/useMobileMenu';
import Menu from '../../components/Menu/Menu';
import MenuButton from '../../components/UX/MenuButton/MenuButton';
import ThemeButton from '../../components/UX/ThemeButton/ThemeButton';
import styles from './Header.module.css';
import { FC } from 'react';


const Header: FC<GetDataProps> = ({ data }): JSX.Element => {
    const { currentTheme, toggleTheme } = useThemeToggle();
    const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu(false);
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Logo />
                <Menu
                isMobileMenuOpen={isMobileMenuOpen}
                toggleMobileMenu={toggleMobileMenu}
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
                <Menu data={data}
                    menuStyle='mobile'
                    isMobileMenuOpen={isMobileMenuOpen}
                    toggleMobileMenu={toggleMobileMenu} />
            </div>
        </header>
    );
}
export default Header;
