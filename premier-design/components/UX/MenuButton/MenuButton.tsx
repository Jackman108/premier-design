import React from 'react';
import { FaBars } from 'react-icons/fa';
import styles from './MenuButton.module.css';
import { MenuButtonProps } from './MenuButton.props';



const MenuButton: React.FC<MenuButtonProps> = ({ toggleMobileMenu }) => {
    return (
        <div className={`${styles.menuIcon} menuIcon`} onClick={toggleMobileMenu}>
            <FaBars />
        </div>
    );
};
export default MenuButton;