/**
 * Публичные алиасы к типу корня `data.json`.
 * Источник истины: `DataProps` из `dataPropsSchema` (`@shared/validates/dataPropsSchema`).
 */
import type {DataProps} from '@shared/validates/dataPropsSchema';

export type {DataProps};

export type GetDataProps = {
	data: DataProps;
};

export type FaqContentByPage = DataProps['faqContent'];
export type TrustSignalsConfig = DataProps['trustSignals'];
export type HomeVideoSpotlightConfig = DataProps['homeVideoSpotlight'];
export type HomePageSectionAriaKey = keyof DataProps['homePage']['sectionAriaLabels'];
export type HomePageData = DataProps['homePage'];
export type ContactsPageUspAsideData = DataProps['contactsPage']['uspAside'];
export type ContactsPageData = DataProps['contactsPage'];
