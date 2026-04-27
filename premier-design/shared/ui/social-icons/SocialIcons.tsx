import Link from 'next/link';
import { FaInstagram, FaTelegram } from 'react-icons/fa';
import { SlSocialVkontakte } from 'react-icons/sl';
import {SITE_SOCIAL} from '@shared/constants/company';
import styles from './SocialIcons.module.css';
import { ReactElement } from "react";

const SocialIcons = (): ReactElement => {
    return (
        <div className={styles.social__icons}>
            <Link href={SITE_SOCIAL.telegram} aria-label="Мы в телеграм">
                <FaTelegram className={styles.icons} />
            </Link>
            <Link href={SITE_SOCIAL.vk} aria-label="Мы в вконтакте">
                <SlSocialVkontakte className={styles.icons} />
            </Link>
            <Link href={SITE_SOCIAL.instagram} aria-label="Мы в инстаграм">
                <FaInstagram className={styles.icons} />
            </Link>

        </div>
    );
}
export default SocialIcons;