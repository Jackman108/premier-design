import React from 'react';
import styles from './MenuButton.module.css';
import {MenuButtonProps} from "../../interface/MenuButton.props";

const MenuButton: React.FC<MenuButtonProps> = ({isMobileMenuOpen, toggleMobileMenu}) => (
    <div
        className={`${styles.menu__button} ${isMobileMenuOpen ? styles.active : ''}`}
        onClick={toggleMobileMenu}
    >
        <span></span>
        <span></span>
        <span></span>
    </div>
);

export default MenuButton; 