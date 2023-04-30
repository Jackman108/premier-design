import React from 'react';
import styles from './FooterMenu.module.css';
import Link from 'next/link';
import { MenuItem, MenuProps } from '../MenuItems/MenuItems.props';

const FooterMenu = ({ data }: MenuProps): JSX.Element => {
    return (
        <nav className={styles.menu}>
            <ul className={styles.menu__container}>
            {data?.menu?.map(({id, title, ruTitle}: MenuItem) => (
                    <li key={id} className={styles.menu__links}>
                        <Link className={styles.menu__link} href={`/${ title.toLowerCase()}`}>
                            <div className={styles.menu__item}>{ruTitle}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default FooterMenu;
