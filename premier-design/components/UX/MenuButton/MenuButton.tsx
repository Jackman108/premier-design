import React from 'react';
import {FaBars} from 'react-icons/fa';
import styles from './MenuButton.module.css';
import {MenuMobileProps} from '../../../interface/Menu.props';

const MenuButton: React.FC<MenuMobileProps> = ({toggleMobileMenu}) => (
    <div className={styles.menu__icon} onClick={toggleMobileMenu}>
        <FaBars className={styles.icon}/>
    </div>
);

export default MenuButton; 