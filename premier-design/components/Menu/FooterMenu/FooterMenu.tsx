import React from 'react';
import styles from './FooterMenu.module.css';
import Link from 'next/link';
import { MenuProps } from '../MenuItems/MenuItems.props';

const FooterMenu = ({MenuItems}: MenuProps): JSX.Element => {
    return (
        <nav className={`${styles.navigation} nav`}>
            <ul className={styles.navigation__menu}>
                {MenuItems.map((menuItem, index) => (
                    <li key={index}>
                        <Link href={`/${menuItem.title == 'Home' ? "" : menuItem.title.toLowerCase()}`}>
                            <div className={styles.menu__item}>{menuItem.title}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default FooterMenu;
