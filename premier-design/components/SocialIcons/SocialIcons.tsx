import React from 'react';
import Link from 'next/link';
import { FaTelegram, FaInstagram } from 'react-icons/fa';
import { SlSocialVkontakte } from 'react-icons/sl';
import styles from './SocialIcons.module.css';

function SocialIcons(): JSX.Element {
    return (
        <div className={`${styles.socialIcons} socialIcons`}>
            <Link href="#">
                <FaTelegram />
            </Link>
            <Link href="#">
                <SlSocialVkontakte />
            </Link>
            <Link href="#">
                <FaInstagram />
            </Link>
        </div>
    );
}

export default SocialIcons;