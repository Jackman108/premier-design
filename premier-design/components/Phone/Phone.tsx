import React from 'react';
import Link from 'next/link';
import { FaPhoneVolume } from 'react-icons/fa';
import styles from './Phone.module.css';

function Phone(): JSX.Element {
    return (
        <div className={styles.phone}>
            <Link href="tel:+375291942881">            
                    <FaPhoneVolume />
                    <p>+375(29)194-28-81</p>            
            </Link>
        </div>
    );
}

export default Phone;