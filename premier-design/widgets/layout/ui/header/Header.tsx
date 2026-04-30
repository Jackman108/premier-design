import { type FC, type ReactElement } from 'react';

import { ShareBanner } from '@features/banner';
import Logo from '@shared/ui/logo/Logo';
import Menu from '@shared/ui/menu/ui/Menu';
import Phone from '@shared/ui/phone/Phone';
import SocialIcons from '@shared/ui/social-icons/SocialIcons';
import WorkHours from '@shared/ui/work-hours/WorkHours';
import { useHeaderLayout } from '@widgets/layout/hooks/useHeaderLayout';

import type { HeaderProps } from '../../interface/Header.props';
import MenuButton from '../menu-button/MenuButton';
import ThemeButton from '../theme-button/ThemeButton';
import styles from './Header.module.css';

const Header: FC<HeaderProps> = ({ menu, shares, variant = 'default' }): ReactElement => {
	const {
		headerRef,
		currentTheme,
		toggleTheme,
		isMobileMenuOpen,
		toggleMobileMenu,
		isSticky,
		hasShareBanner,
		placeholderStyle,
	} = useHeaderLayout({ menu, shares });
	const isSolidDark = variant === 'solidDark';
	const headerOnHero = isSolidDark || !isSticky;

	return (
		<>
			<ShareBanner isSticky={isSticky} shares={shares} />
			<header
				className={`${styles.header} ${isSticky ? styles.sticky : ''} ${hasShareBanner ? styles.withShareBanner : ''} ${isSolidDark ? styles.solidDark : ''}`}
				ref={headerRef}
			>
				<div className={styles.header__container}>
					<Logo />
					<div className={styles.contact__container}>
						<WorkHours />
						<Phone />
						<SocialIcons />
					</div>
					<div className={styles.buttons__container}>
						<ThemeButton currentTheme={currentTheme} toggleTheme={toggleTheme} />
						<MenuButton isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
					</div>
					<Menu
						headerOnHero={headerOnHero}
						isMobileMenuOpen={isMobileMenuOpen}
						menu={menu}
						menuStyle="header"
						toggleMobileMenu={toggleMobileMenu}
					/>
				</div>
			</header>
			<Menu
				isMobileMenuOpen={isMobileMenuOpen}
				menu={menu}
				menuStyle="mobile"
				toggleMobileMenu={toggleMobileMenu}
			/>
			{isSticky && <div className={styles.stickyPlaceholder} style={placeholderStyle} />}
		</>
	);
};

export default Header;
