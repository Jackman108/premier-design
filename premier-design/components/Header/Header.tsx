import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTelegram, FaInstagram, FaMoon, FaSun, FaPhoneVolume } from 'react-icons/fa';
import { SlSocialVkontakte } from 'react-icons/sl';
import { useTheme } from 'next-themes';
import styles from './Header.module.css';
import MenuItems from '../MenuItems/MenuItems';
import MobileMenu from '../MobileMenu/MobileMenu';
import Logo from '../assets/logo.png';

function Header(): JSX.Element {
    const { theme, setTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    function toggleMobileMenu(): void {
        setIsMobileMenuOpen(prevState => !prevState);
    }

    function changeTheme(): void {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className={styles.header}>
            <div className={`${styles.container} container`}>
                <div className={`${styles.logo} logo`}>
                    <Link href="/"><img src={Logo.src} /></Link>
                </div>

                <MobileMenu MenuItems={MenuItems} isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
                <nav className={`${styles.nav} nav ${isMobileMenuOpen ? styles.active : ''}`}>
                    <ul className={`${styles.menu} ${isMobileMenuOpen ? styles.mobileMenu : ''}`}>
                        {MenuItems.map((menuItem, index) => (
                            <li key={index}>
                                <Link href={`/${menuItem.title == 'Home' ? "" : menuItem.title.toLowerCase()}`}>
                                    <div className={styles.menuItem}>{menuItem.title}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className={`${styles.phone} phone`}>
                    <Link href="tel:+375291942881">
                        <FaPhoneVolume />
                        <p>+375(29)194-28-81</p>
                    </Link>
                    
                </div>
                <div className={`${styles.socialIcons} socialIcons`}>
                    <Link href="#">
                        <FaTelegram />
                    </Link>
                    <Link href="#">
                        <SlSocialVkontakte />
                    </Link>
                    <Link href="#">
                        <FaInstagram />
                    </Link>
                </div>
                <button className={styles.themeButton} onClick={changeTheme}>
                    {theme === 'light' ? <FaMoon /> : <FaSun />}                  
                </button>
                <div className={`${styles.menuIcon} menuIcon`} onClick={toggleMobileMenu}>
                    <FaBars />
                </div>
            </div>
        </header>
    );
}

export default Header;
