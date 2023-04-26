import React from 'react';
import Link from 'next/link';
import { FaTelegram, FaInstagram } from 'react-icons/fa';
import { TfiEmail } from 'react-icons/tfi';
import { SlSocialVkontakte } from 'react-icons/sl';
import styles from './SocialIcons.module.css';

function SocialIcons(): JSX.Element {
    return (
        <div className={styles.social__icons}>
            <Link href="#">
                <FaTelegram className={styles.icons}/>
            </Link>
            <Link href="#">
                <SlSocialVkontakte className={styles.icons}/>
            </Link>
            <Link href="#">
                <FaInstagram className={styles.icons}/>
            </Link>
            <Link href="#">
                <TfiEmail className={styles.icons}/>
            </Link>
        </div>
    );
}

export default SocialIcons;