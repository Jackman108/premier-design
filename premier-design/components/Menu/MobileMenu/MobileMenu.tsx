import React from 'react';
import { MenuDataProps } from '../MenuData/MenuData.props';
import styles from './MobileMenu.module.css';
import Link from 'next/link';


const MobileMenu = ({ data, isMobileMenuOpen, toggleMobileMenu }: MenuDataProps): JSX.Element => {
    return (
        <nav className={`${styles.mobile__menu} ${isMobileMenuOpen ? styles.open : ''}`}>
            <ul className={styles.menu__items}>
                {data?.menu?.map(({ id, title, ruTitle }: MenuProps) => (
                    <li key={id} className={styles.menu__item}>
                        <Link href={`/${title === 'Home' ? '' : title.toLowerCase()}`} onClick={toggleMobileMenu} className={styles.item}>
                            {ruTitle}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MobileMenu;
