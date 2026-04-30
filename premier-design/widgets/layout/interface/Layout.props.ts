import { ReactNode } from 'react';
import { MenuItem } from '@shared/ui/menu/interface/Menu.props';
import type { NewsProps } from '@features/news';
import type { Paper } from '@features/papers';
import type { ButtonProps } from '@entities/button';
import type { CostingCardProps } from '@features/coasting';
import type { PanelProps } from '@features/buttons-panel';
import { HeaderProps } from './Header.props';
import { FooterProps } from './Footer.props';
import type { ShareBannerDataProps } from '@features/banner';

export interface LayoutData {
	menu: MenuItem[];
	papers: Paper[];
	news: NewsProps[];
	costingCard: CostingCardProps[];
	button: ButtonProps[];
	panel: PanelProps[];
	shares: ShareBannerDataProps[];
}

export interface LayoutProps {
	children: ReactNode;
	headerProps: HeaderProps;
	footerProps: FooterProps;
	additionalData: {
		costingCards: CostingCardProps[];
		buttonData: ButtonProps[];
		panelData: PanelProps[];
	};
	/** Только для `/about`: передать `false`, иначе `useRouter` в футере ломает `app/*` и не нужен. */
	footerNewsHashSyncOnMount?: boolean;
}
