import React from 'react';
import Link from 'next/link';
import { MenuStyleProps } from '../MenuData/MenuData.props';
import headerStyles from './HeaderMenu.module.css';
import footerStyles from './FooterMenu.module.css';

const DesktopMenu = ({ data, menuStyle }: MenuStyleProps): JSX.Element => {
    const stylesToUse = menuStyle === 'footer' ? footerStyles : headerStyles;
    return (
        <nav className={stylesToUse.menu} >
            <ul className={stylesToUse.menu__container}>
                {data?.menu?.map(({ id, title, ruTitle }: MenuProps) => (
                    <li key={id} className={stylesToUse.menu__links}>
                        <Link className={stylesToUse.menu__link} href={`/${title === 'Home' ? '' : title.toLowerCase()}`}>
                            <div className={stylesToUse.menu__item}>{ruTitle}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default DesktopMenu;
