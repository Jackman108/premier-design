import React, {ReactElement} from 'react';
import Link from 'next/link';
import LogoImage from '../../../public/logo.svg';
import styles from './Logo.module.css';
import Image from 'next/image';

const Logo = (): ReactElement => {
    return (
        <div className={styles.logo}>
            <Link
                href="/public"
                className={styles.logo__image}
                aria-label="Перейти на главную"
            >
                <Image
                    src={LogoImage}
                    alt="Logo"
                    placeholder='empty'
                    width={2000}
                    height={160}
                    sizes="
                    (max-width: 600px) 100vw,
                    (max-width: 1440px) 60vw,
                    1935px
                    "
                    className={styles.image}
                />
            </Link>
        </div>
    );
}

export default Logo;