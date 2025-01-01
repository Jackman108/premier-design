import {TitleProps} from "./Title.props";

export interface Review {
    id: number;
    name: string;
    city: string;
    text: string;
    photoUrl: string;
}

export interface ReviewsProps {
    reviews: Review[];
    titles: TitleProps[];
}