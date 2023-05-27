import React from 'react';
import { FaBars } from 'react-icons/fa';
import styles from './MenuButton.module.css';
import { MenuDataProps } from '../../Menu/MenuData.props';

const MenuButton: React.FC<MenuDataProps> = ({ toggleMobileMenu }) => {
    const handleClick = () => {
        if (toggleMobileMenu) {
            toggleMobileMenu();
        }
    };
    return (
        <div className={styles.menu__icon} onClick={handleClick}>
            <FaBars className={styles.icon}/>
        </div>
    );
};
export default MenuButton; 