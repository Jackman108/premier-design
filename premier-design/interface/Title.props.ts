import {CustomHeadProps} from "../components/CustomHead/CustomHead.props";

export interface TitleProps {
    id?: number;
    title: string;
    shortTitle: string;
    description: string;
}

export interface TitlePage extends TitleProps, CustomHeadProps {
}
