import { HTMLAttributes } from 'react';

export interface CostingCardsProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
    id: number;
    title: string;
    image: string;
}