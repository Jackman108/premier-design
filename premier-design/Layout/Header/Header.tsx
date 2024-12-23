import Logo from '../../components/UX/Logo/Logo';
import Phone from '../../components/UX/Phone/Phone';
import SocialIcons from '../../components/UX/SocialIcons/SocialIcons';
import useThemeToggle from '../../hooks/useThemeToggle';
import useMobileMenu from '../../hooks/useMobileMenu';
import Menu from '../../components/Menu/Menu';
import MenuButton from '../../components/UX/MenuButton/MenuButton';
import ThemeButton from '../../components/UX/ThemeButton/ThemeButton';
import styles from './Header.module.css';
import {FC, ReactElement} from 'react';
import {GetDataProps} from '../../interface/interfaceData';


const Header: FC<GetDataProps> = ({data}): ReactElement => {
    const {currentTheme, toggleTheme} = useThemeToggle();
    const {isMobileMenuOpen, toggleMobileMenu} = useMobileMenu(false);
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Logo/>
                <Menu
                    isMobileMenuOpen={isMobileMenuOpen}
                    toggleMobileMenu={toggleMobileMenu}
                    data={data}
                    menuStyle='header'/>
                <div className={styles.contact__container}>
                    <Phone/>
                    <SocialIcons/>
                </div>
                <div className={styles.buttons__container}>
                    <ThemeButton
                        currentTheme={currentTheme}
                        toggleTheme={toggleTheme}/>
                    <MenuButton data={data}
                                isMobileMenuOpen={isMobileMenuOpen}
                                toggleMobileMenu={toggleMobileMenu}/>
                </div>
                <Menu data={data}
                      menuStyle='mobile'
                      isMobileMenuOpen={isMobileMenuOpen}
                      toggleMobileMenu={toggleMobileMenu}/>
            </div>
        </header>
    );
}
export default Header;
