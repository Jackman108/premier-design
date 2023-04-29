import { HTMLAttributes } from 'react';

export interface TitleProps 
extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
id: number;
title: string;
description: string;
titleStyle: 'title-white' | 'title-black';
descriptionStyle: 'description-white' | 'description-black';
}