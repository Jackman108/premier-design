import {useMemo, useState} from 'react';

import {ExampleCardProps} from '@features/examples/interface/Examples.props';

export const useBeforeAfterSlider = (cases: ExampleCardProps[]) => {
    const [activeCaseId, setActiveCaseId] = useState<number>(cases[0]?.id ?? 0);
    const [sliderValue, setSliderValue] = useState<number>(55);

    const activeCase = useMemo(
        () => cases.find((item) => item.id === activeCaseId) ?? cases[0],
        [activeCaseId, cases],
    );

    const beforeImage = activeCase?.images[0] ?? activeCase?.background ?? '';
    const afterImage = activeCase?.images[activeCase.images.length - 1] ?? activeCase?.background ?? '';

    return {
        activeCase,
        activeCaseId,
        sliderValue,
        setActiveCaseId,
        setSliderValue,
        beforeImage,
        afterImage,
    };
};
