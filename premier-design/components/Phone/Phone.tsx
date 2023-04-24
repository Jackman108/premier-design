import React from 'react';
import Link from 'next/link';
import { FaPhoneVolume } from 'react-icons/fa';
import styles from './Phone.module.css';

function Phone(): JSX.Element {
    return (
        <div className={styles.phone}>
            <Link 
            href="tel:+375291942881" 
            className={styles.phone__container}>
                <div className={styles.phone__logo}>
                    <FaPhoneVolume />
                </div>
                <div className={styles.phone__number}>
                    <p>+375(29)194-28-81</p>
                </div>
            </Link>
        </div>
    );
}

export default Phone;