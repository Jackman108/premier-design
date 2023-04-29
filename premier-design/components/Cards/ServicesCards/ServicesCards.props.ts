import {  HTMLAttributes } from 'react';

export interface ServicesCardsProps 
extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
    id: number;
    text: string;
    image: string;
}