import React from 'react';
import { MenuProps } from '../MenuItems/MenuItems.props';
import styles from './MobileMenu.module.css';
import Link from 'next/link';


const MobileMenu = ({ MenuItems, isMobileMenuOpen, toggleMobileMenu }: MenuProps): JSX.Element => {
    return (
        <nav className={`${styles.mobile__menu} ${isMobileMenuOpen ? styles.open : ''}`}>
            <ul className={styles.menu__items}>
                {MenuItems.map((menuItem, index) => (
                    <li key={index} className={styles.menu__item}>
                        <Link href={`/${menuItem.title == 'Home' ? "" : menuItem.title.toLowerCase()}`} onClick={toggleMobileMenu} className={styles.item}>
                            {menuItem.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MobileMenu;
