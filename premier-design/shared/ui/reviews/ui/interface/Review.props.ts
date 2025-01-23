import {TitleProps} from "@shared/ui/title/interface/Title.props";

export interface Review {
    id: number;
    name: string;
    city: string;
    text: string;
    photoUrl: string;
}

export interface ReviewsProps {
    reviews: Review[];
    title: TitleProps;
}