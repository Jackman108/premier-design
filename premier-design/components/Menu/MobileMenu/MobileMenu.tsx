import React from 'react';
import { MenuProps } from '../MenuItems/MenuItems.props';
import styles from './MobileMenu.module.css';
import Link from 'next/link';



const MobileMenu: React.FC<MenuProps> = ({ MenuItems, isMobileMenuOpen, toggleMobileMenu }) => {
    return (
        <nav className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
            <ul>
                {MenuItems.map((menuItem, index) => (
                    <li key={index}>
                        <Link href={`/${menuItem.title == 'Home' ? "" : menuItem.title.toLowerCase()}`} onClick={toggleMobileMenu}>
                            {menuItem.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MobileMenu;
