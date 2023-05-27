import type React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import styles from './ThemeButton.module.css'
import { type ThemeButtonProps } from '../../Menu/MenuData.props'

const ThemeButton: React.FC<ThemeButtonProps> = ({ currentTheme, toggleTheme }) => {
  return (
        <button className={styles.theme__button} onClick={toggleTheme}>
            {currentTheme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
  )
}

export default ThemeButton
