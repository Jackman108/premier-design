import React from 'react';
import styles from './DesktopMenu.module.css';
import Link from 'next/link';
import { MenuItem, MenuProps } from '../MenuItems/MenuItems.props';

const DesktopMenu = ({ data }: MenuProps): JSX.Element => {
    return (
        <nav className={styles.menu}>
            <ul className={styles.menu__container}>
                {data?.menu?.map(({id, title, ruTitle}: MenuItem) => (
                    <li key={id} className={styles.menu__links}>
                        <Link className={styles.menu__link} href={`/${title === 'Home' ? '' : title.toLowerCase()}`}>
                            <div className={styles.menu__item}>{ruTitle}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default DesktopMenu;
