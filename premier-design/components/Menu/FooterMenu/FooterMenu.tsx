import React from 'react';
import styles from './FooterMenu.module.css';
import Link from 'next/link';
import { MenuProps } from '../MenuItems/MenuItems.props';

const FooterMenu: React.FC<MenuProps> = ({ MenuItems }) => {
    return (
        <nav className={`${styles.nav} nav`}>
            <ul className={styles.menu}>
                {MenuItems.map((menuItem, index) => (
                    <li key={index}>
                        <Link href={`/${menuItem.title == 'Home' ? "" : menuItem.title.toLowerCase()}`}>
                            <div className={styles.menuItem}>{menuItem.title}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default FooterMenu;
