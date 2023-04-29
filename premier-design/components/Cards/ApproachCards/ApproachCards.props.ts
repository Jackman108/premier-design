import { HTMLAttributes } from 'react';

export interface ApproachCardsProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
    id: number;
    image: string;
    title: string;
    description: string;
}