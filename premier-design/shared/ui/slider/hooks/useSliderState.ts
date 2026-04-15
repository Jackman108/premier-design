import {useMemo, useState} from 'react';
import {useKeenSlider} from 'keen-slider/react';

interface UseSliderStateParams {
    isMobile?: boolean;
    slidesPerView: number;
}

export const useSliderState = ({isMobile, slidesPerView}: UseSliderStateParams) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [slideCount, setSlideCount] = useState(0);

    const slidesToShow = isMobile === undefined ? 1 : isMobile ? 1 : slidesPerView;
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
            setSlideCount(slider.track.details.slides.length);
        },
        created(slider) {
            setLoaded(true);
            setSlideCount(slider.track.details.slides.length);
        },
        slides: {
            perView: slidesToShow,
            spacing: 15,
        },
    });

    const dots = useMemo(() => (
        [...Array(isMobile ? slideCount : Math.max(0, slideCount - 2)).keys()]
    ), [isMobile, slideCount]);

    const goPrev = () => {
        instanceRef.current?.prev();
    };

    const goNext = () => {
        instanceRef.current?.next();
    };

    const moveTo = (idx: number) => {
        instanceRef.current?.moveToIdx(idx);
    };

    return {
        currentSlide,
        loaded,
        slideCount,
        sliderRef,
        dots,
        goPrev,
        goNext,
        moveTo,
    };
};
