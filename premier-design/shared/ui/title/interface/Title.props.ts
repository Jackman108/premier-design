import type { CustomHeadProps } from '@shared/interface/seoHead.props';
import type { TitleProps } from '@entities/title';

export type { TitleProps };

export interface TitleStyleProps extends TitleProps {
	titleStyle: 'title-white' | 'title-black';
	descriptionStyle: 'description-white' | 'description-black';
}

export interface TitlePage extends TitleProps, CustomHeadProps {}
