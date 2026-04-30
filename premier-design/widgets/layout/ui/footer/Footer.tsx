'use client';

import { News } from '@features/news';
import { Papers } from '@features/papers';
import Copyrighting from '@shared/ui/copyrighting/Copyrighting';
import { LegalRequisites } from '@shared/ui/legal-requisites';
import Menu from '@shared/ui/menu/ui/Menu';
import CookiesBanner from '@widgets/cookies-banner/ui/CookiesBanner';
import useResizeEffects from '@widgets/layout/hooks/useResizeEffects';
import { FooterProps } from '@widgets/layout/interface/Footer.props';
import DeveloperCredit from '@widgets/layout/ui/footer/DeveloperCredit/DeveloperCredit';
import { type FC } from 'react';
import styles from './Footer.module.css';

const Footer: FC<FooterProps> = ({ papers, news, menu, newsHashSyncOnMount = true }) => {
	const { isMobileMenuOpen, toggleMobileMenu } = useResizeEffects();

	return (
		<footer className={styles.footer}>
			<div className={styles.footer__container}>
				<div className={styles.footer__papers}>
					<Papers papers={papers} />
				</div>
				<div className={styles.footer__news}>
					<News news={news} newsStyle="footer" syncHashOnMount={newsHashSyncOnMount} />
				</div>
				<Menu
					menu={menu}
					menuStyle="footer"
					isMobileMenuOpen={isMobileMenuOpen}
					toggleMobileMenu={toggleMobileMenu}
				/>
			</div>
			<div className={styles.footer__meta}>
				<div className={styles.footer__metaLeft}>
					<LegalRequisites />
				</div>
				<div className={styles.footer__metaCenter}>
					<Copyrighting />
				</div>
				<div className={styles.footer__metaRight}>
					<DeveloperCredit />
				</div>
			</div>
			<CookiesBanner papers={papers} />
		</footer>
	);
};

export default Footer;
