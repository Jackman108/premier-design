'use client';

import dynamic from 'next/dynamic';
import type {SliderProps} from '@shared/ui/slider/interface/Slider.props';

const SliderLazy = dynamic<SliderProps>(() => import('./Slider'), {
    ssr: false,
});

SliderLazy.displayName = 'SliderLazy';

export default SliderLazy;
