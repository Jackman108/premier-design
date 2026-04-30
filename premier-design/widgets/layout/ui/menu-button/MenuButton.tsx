import React from 'react';
import styles from './MenuButton.module.css';
import { MenuButtonProps } from '../../interface/MenuButton.props';

const MOBILE_NAV_PANEL_ID = 'site-mobile-nav';

const MenuButton: React.FC<MenuButtonProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => (
	<button
		type="button"
		className={`${styles.menu__button} ${isMobileMenuOpen ? styles.active : ''}`}
		onClick={toggleMobileMenu}
		aria-expanded={isMobileMenuOpen}
		aria-controls={MOBILE_NAV_PANEL_ID}
		aria-label="Открыть или закрыть меню"
	>
		<span aria-hidden="true" />
		<span aria-hidden="true" />
		<span aria-hidden="true" />
	</button>
);

export default MenuButton;
