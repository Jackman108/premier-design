import type { LayoutData, LayoutProps } from '../interface/Layout.props';
import type { HeaderVariant } from '../interface/Header.props';

export type BuildLayoutPropsOptions = {
	headerVariant?: HeaderVariant;
};

export const buildLayoutProps = (
	data: LayoutData,
	options: BuildLayoutPropsOptions = {},
): Omit<LayoutProps, 'children'> => ({
	headerProps: {
		menu: data.menu,
		shares: data.shares,
		...(options.headerVariant && { variant: options.headerVariant }),
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
