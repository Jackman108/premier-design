import Logo from '@shared/ui/logo/Logo';
import Phone from '@shared/ui/phone/Phone';
import SocialIcons from '@shared/ui/social-icons/SocialIcons';
import useThemeToggle from '../../hooks/useThemeToggle';
import useMobileMenu from '../../hooks/useMobileMenu';
import Menu from '@shared/ui/menu/ui/Menu';
import MenuButton from '../menu-button/MenuButton';
import ThemeButton from '../theme-button/ThemeButton';
import styles from './Header.module.css';
import {FC, ReactElement} from 'react';
import WorkHours from "@shared/ui/work-hours/WorkHours";
import {HeaderProps} from "../../interface/Header.props";


const Header: FC<HeaderProps> = ({menu}): ReactElement => {
    const {currentTheme, toggleTheme} = useThemeToggle();
    const {isMobileMenuOpen, toggleMobileMenu} = useMobileMenu(false);

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Logo/>
                <div className={styles.contact__container}>
                    <WorkHours />
                    <Phone/>
                    <SocialIcons/>
                </div>
                <div className={styles.buttons__container}>
                    <ThemeButton
                        currentTheme={currentTheme}
                        toggleTheme={toggleTheme}/>
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
                />
                <Menu
                    menu={menu}
                    menuStyle='mobile'
                    isMobileMenuOpen={isMobileMenuOpen}
                    toggleMobileMenu={toggleMobileMenu}
                />
            </div>
        </header>
    );
}
export default Header;
