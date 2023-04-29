import {  HTMLAttributes } from 'react';

export interface ExamplesCardsProps 
extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
    id: number;
    background: string;
    address: string;
    deadlines: string;
    bathroomIcon: string;
    bathroomOption: number;
    areaIcon: string;
    areaOption: number;
    areaSquare: string; 
}