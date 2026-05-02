import { TitleProps } from '@shared/ui/title/interface/Title.props';
import type { ButtonProps } from '@entities/button';

export interface BusinessServiceCard {
	category: string;
	image: string;
	details: string[];
}

export interface BusinessServicesCardProps {
	category: string;
	details: string[];
	image: string;
}

interface CallToAction {
	headline: string;
	reasons: string[];
}

export interface BusinessServices {
	callToAction: CallToAction;
}

export interface BusinessServicesProps {
	titles: TitleProps[];
	businessServices: BusinessServices;
	businessServiceCard: BusinessServiceCard[];
	buttonData: ButtonProps[];
	buttonStyle: 'button-white' | 'button-black' | 'button-panel' | 'button-none';
}
