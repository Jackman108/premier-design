import React from 'react';
import { MenuProps, MenuItem } from '../MenuItems/MenuItems.props';
import styles from './MobileMenu.module.css';
import Link from 'next/link';


const MobileMenu = ({ data, isMobileMenuOpen, toggleMobileMenu }: MenuProps): JSX.Element => {
    return (
        <nav className={`${styles.mobile__menu} ${isMobileMenuOpen ? styles.open : ''}`}>
            <ul className={styles.menu__items}>
            {data?.menu?.map(({id, title, ruTitle}: MenuItem) => (
                    <li key={id} className={styles.menu__item}>
                        <Link href={`/${ title.toLowerCase()}`} onClick={toggleMobileMenu} className={styles.item}>
                            {ruTitle}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MobileMenu;
