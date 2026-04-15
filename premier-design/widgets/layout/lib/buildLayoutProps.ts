import type {LayoutData, LayoutProps} from '../interface/Layout.props';

export const buildLayoutProps = (data: LayoutData): Omit<LayoutProps, 'children'> => ({
	headerProps: {
		menu: data.menu,
		shares: data.shares,
	},
	footerProps: {
		papers: data.papers,
		news: data.news,
		menu: data.menu,
	},
	additionalData: {
		costingCards: data.costingCard,
		buttonData: data.button,
		panelData: data.panel,
	},
});
