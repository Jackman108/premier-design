import Logo from '../../Logo/Logo';
import Phone from '../../Phone/Phone';
import SocialIcons from '../../SocialIcons/SocialIcons';
import useResizeEffects from '../../hooks/useResizeEffects';
import useMobileMenu from '../../hooks/useMobileMenu';
import Menu from '../../Menu/Menu';
import MenuButton from '../../UX/MenuButton/MenuButton';
import ThemeButton from '../../UX/ThemeButton/ThemeButton';
import styles from './Header.module.css';


const Header: React.FC<{ data: DataProps }> = ({
    data
}): JSX.Element => {
    const { currentTheme, toggleTheme } = useResizeEffects();
    const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu(false);
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Logo />
                <Menu
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
