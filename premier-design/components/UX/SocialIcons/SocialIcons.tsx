import Link from 'next/link';
import {FaTelegram, FaInstagram} from 'react-icons/fa';
import {SlSocialVkontakte} from 'react-icons/sl';
import styles from './SocialIcons.module.css';
import {ReactElement} from "react";

const SocialIcons = (): ReactElement => {
    return (
        <div className={styles.social__icons}>
            <Link href="https://t.me/PremiumInterior">
                <FaTelegram className={styles.icons}/>
            </Link>
            <Link href="https://vk.com/proremontzhl">
                <SlSocialVkontakte className={styles.icons}/>
            </Link>
            <Link href="https://instagram.com/proremont_zhl">
                <FaInstagram className={styles.icons}/>
            </Link>

        </div>
    );
}

export default SocialIcons;