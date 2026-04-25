import type {DataProps} from '@shared/validates/dataPropsSchema';
import {selectAppealSectionData} from '@shared/hooks/usePageData';

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
		/** Единый CTA `Appeal` (те же `shortTitle`, что и на `repairs` / `design`). */
		appealSection: selectAppealSectionData(data.title, data.button, data.bannersImages),
	};
};
