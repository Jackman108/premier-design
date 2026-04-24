import type {CustomHeadProps} from '@shared/interface/seoHead.props';

export interface TitleProps {
	id?: number;
	title: string;
	shortTitle: string;
	description: string;
}

export interface TitleStyleProps extends TitleProps {
	titleStyle: 'title-white' | 'title-black';
	descriptionStyle: 'description-white' | 'description-black';
}

export interface TitlePage extends TitleProps, CustomHeadProps {}
