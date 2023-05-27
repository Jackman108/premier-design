import { TitleProps } from "../../pages/[types]/Data";

export interface TitleStyleProps extends TitleProps{
    titleStyle: 'title-white' | 'title-black';
    descriptionStyle: 'description-white' | 'description-black';
} 