import { TitleProps } from '@shared/ui/title/interface/Title.props';
import type { ButtonProps } from '@entities/button';
import { ServiceCardProps } from './ServiceCard.props';

export interface ServicesProps {
	title: TitleProps;
	buttons: ButtonProps[];
	servicesCard: ServiceCardProps[];
}
