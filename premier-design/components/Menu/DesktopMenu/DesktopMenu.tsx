import React from 'react';
import styles from './DesktopMenu.module.css';
import Link from 'next/link';
import { MenuProps } from '../MenuItems/MenuItems.props';

const DesktopMenu = ({ MenuItems }: MenuProps): JSX.Element => {
    return (
        <nav className={`${styles.menu} nav`}>
            <ul className={styles.menu__container}>
                {MenuItems.map((menuItem, index) => (
                    <li key={index} className={styles.menu__links}>
                        <Link className={styles.menu__link} href={`/${menuItem.title == 'Home' ? "" : menuItem.title.toLowerCase()}`}>
                            <div className={styles.menu__item}>{menuItem.title}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default DesktopMenu;
