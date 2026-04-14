import Link from 'next/link';
import {FaInstagram, FaTelegram} from 'react-icons/fa';
import {SlSocialVkontakte} from 'react-icons/sl';
import styles from './SocialIcons.module.css';
import {ReactElement} from "react";

const SocialIcons = (): ReactElement => {
    return (
        <div className={styles.social__icons}>
            <Link href="https://t.me/PremiumInterior" aria-label="Мы в телеграм">
                <FaTelegram className={styles.icons}/>
            </Link>
            <Link href="https://vk.com/premium_interior_zhl" aria-label="Мы в вконтакте">
                <SlSocialVkontakte className={styles.icons}/>
            </Link>
            <Link href="https://instagram.com/proremont_zhl" aria-label="Мы в инстаграм">
                <FaInstagram className={styles.icons}/>
            </Link>

        </div>
    );
}

export default SocialIcons;