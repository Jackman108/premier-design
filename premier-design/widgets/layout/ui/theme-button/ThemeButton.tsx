'use client';

import type React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

import { UI, useLocale } from '@shared/i18n';

import { ThemeButtonProps } from '../../interface/ThemeButton.props';
import styles from './ThemeButton.module.css';

const ThemeButton: React.FC<ThemeButtonProps> = ({ currentTheme, toggleTheme }) => {
	const { t } = useLocale();
	return (
		<button className={styles.theme__button} onClick={toggleTheme} aria-label={t(UI.themeToggleAria)}>
			{currentTheme === 'light' ? <FaMoon /> : <FaSun />}
		</button>
	);
};

export default ThemeButton;
