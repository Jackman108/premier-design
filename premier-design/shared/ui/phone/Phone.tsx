import {type ReactElement} from 'react';
import Link from 'next/link';
import {FaPhoneVolume} from 'react-icons/fa';
import {SITE_OPERATOR} from '@shared/constants/company';
import styles from './Phone.module.css';

const Phone = (): ReactElement => {
    return (
        <div className={styles.phone}>
            <Link
                href={`tel:${SITE_OPERATOR.phone.tel}`}
                className={styles.phone__container}
                aria-label="Позвонить"
            >
                <div className={styles.phone__logo}>
                    <FaPhoneVolume />
                </div>
                <div className={styles.phone__number}>
                    <p>{SITE_OPERATOR.phone.display}</p>
                </div>
            </Link>
        </div>
    );
};

export default Phone;
