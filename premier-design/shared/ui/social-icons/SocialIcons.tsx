'use client';

import Link from 'next/link';
import { FaInstagram, FaTelegram } from 'react-icons/fa';
import { SlSocialVkontakte } from 'react-icons/sl';
import { type ReactElement } from 'react';

import { UI, useLocale } from '@shared/i18n';
import { SITE_SOCIAL } from '@shared/constants/company';

import styles from './SocialIcons.module.css';

const SocialIcons = (): ReactElement => {
	const { t } = useLocale();
	return (
		<div className={styles.social__icons}>
			<Link href={SITE_SOCIAL.telegram} aria-label={t(UI.socialTelegramAria)}>
				<FaTelegram className={styles.icons} />
			</Link>
			<Link href={SITE_SOCIAL.vk} aria-label={t(UI.socialVkAria)}>
				<SlSocialVkontakte className={styles.icons} />
			</Link>
			<Link href={SITE_SOCIAL.instagram} aria-label={t(UI.socialInstagramAria)}>
				<FaInstagram className={styles.icons} />
			</Link>
		</div>
	);
};
export default SocialIcons;
