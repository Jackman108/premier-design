import React from 'react';
import Link from 'next/link';
import LogoImage from '../assets/logo.png';
import styles from './Logo.module.css';

function Logo(): JSX.Element {
    return (
        <div className={styles.logo}>
            <Link href="/" className={styles.logo__image}>
                <img src={LogoImage.src} alt="Logo" />
            </Link>
        </div>
    );
}

export default Logo;