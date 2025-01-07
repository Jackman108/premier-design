import React, {ReactElement} from 'react';
import Link from 'next/link';
import LogoImage from '../../../public/logo.svg';
import styles from './Logo.module.css';
import Image from 'next/image';

const Logo = (): ReactElement => {
    return (
        <div className={styles.logo}>
            <Link
                href="/"
                className={styles.logo__image}
                aria-label="Перейти на главную"
            >
                <Image
                    src={LogoImage}
                    alt="Logo"
                    className={styles.image}
                />
            </Link>
        </div>
    );
}

export default Logo;