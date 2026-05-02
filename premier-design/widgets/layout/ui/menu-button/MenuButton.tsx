'use client';

import React from 'react';

import { UI, useLocale } from '@shared/i18n';

import { MenuButtonProps } from '../../interface/MenuButton.props';
import styles from './MenuButton.module.css';

const MOBILE_NAV_PANEL_ID = 'site-mobile-nav';

const MenuButton: React.FC<MenuButtonProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
	const { t } = useLocale();
	return (
		<button
			type="button"
			className={`${styles.menu__button} ${isMobileMenuOpen ? styles.active : ''}`}
			onClick={toggleMobileMenu}
			aria-expanded={isMobileMenuOpen}
			aria-controls={MOBILE_NAV_PANEL_ID}
			aria-label={t(UI.layoutMenuToggleAria)}
		>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</button>
	);
};

export default MenuButton;
