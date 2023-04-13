import React from 'react';
import MenuItems from '../MenuItems/MenuItems';
import styles from './MobileMenu.module.css';
import Link from 'next/link';

interface MobileMenuProps {
    MenuItems: typeof MenuItems;
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ MenuItems, isMobileMenuOpen, toggleMobileMenu }) => {
    return (
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
            <ul>
                {MenuItems.map((menuItem, index) => (
                    <li key={index}>
                        <Link href={`/${menuItem.title == 'Home' ? "" : menuItem.title.toLowerCase()}`} onClick={toggleMobileMenu}>
                            {menuItem.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MobileMenu;
