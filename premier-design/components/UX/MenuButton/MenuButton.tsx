import React from 'react';
import styles from './MenuButton.module.css';
import {MenuMobileProps} from '../../../interface/Menu.props';

const MenuButton: React.FC<MenuMobileProps> = ({isMobileMenuOpen, toggleMobileMenu}) => (
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