import { type FC, type ReactElement } from 'react';
import { format } from 'date-fns';
import { SITE_OPERATOR } from '@shared/constants/company';
import Logo from '@shared/ui/logo/Logo';
import SocialIcons from '@shared/ui/social-icons/SocialIcons';
import styles from './Copyrighting.module.css';

const Copyrighting: FC = (): ReactElement => {
	return (
		<section className={styles.footer__contacts}>
			<div className={styles.footer__logo}>
				<Logo />
			</div>
			<div className={styles.footer__socialIcons}>
				<SocialIcons />
			</div>
			<div className={styles.footer__copy}>
				&copy; {SITE_OPERATOR.brandName}, {SITE_OPERATOR.copyrightStartYear} - {format(new Date(), 'yyyy')}.
				<br />
				Все права защищены
			</div>
		</section>
	);
};

export default Copyrighting;
