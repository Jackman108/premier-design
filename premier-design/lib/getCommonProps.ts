import type {DataProps} from '@shared/validates/dataPropsSchema';

/** Фрагмент пропсов лейаута для SSG-страниц (`DataProps` из `dataPropsSchema`). */
export const getCommonProps = (data: DataProps) => {
	const {menu, papers, news, costingCard, button, panel, shares} = data;
	return {
		menuData: menu,
		papersData: papers,
		newsData: news,
		costingData: costingCard,
		buttonData: button,
		panelData: panel,
		sharesData: shares,
		structuredDataRating: data.trustSignals.structuredDataRating,
	};
};
