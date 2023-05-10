import React from 'react';
import Link from 'next/link';
import LogoImage from '../../public/logo.svg';
import styles from './Logo.module.css';

const Logo = (): JSX.Element => {
    return (
        <div className={styles.logo}>
            <Link href="/" className={styles.logo__image}>
                <img src={LogoImage.src} alt="Logo" className={styles.image}/>
            </Link>
        </div>
    );
}

export default Logo;