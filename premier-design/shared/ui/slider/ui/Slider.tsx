'use client'
import React, {Children, FC, KeyboardEvent, memo, MouseEvent, ReactElement, useState} from 'react';
import {SliderProps} from '@shared/ui/slider/interface/Slider.props';
import {useKeenSlider} from "keen-slider/react";

const Slider: FC<SliderProps> = memo(({
                                          children,
                                          slidesPerView,
                                          isMobile
                                      }): ReactElement => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [slideCount, setSlideCount] = useState(0)
    const slidesToShow = isMobile === undefined ? 1 : isMobile ? 1 : slidesPerView;
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
            setSlideCount(slider.track.details.slides.length)
        },
        created(slider) {
            setLoaded(true)
            setSlideCount(slider.track.details.slides.length)
        },
        slides: {
            perView: slidesToShow,
            spacing: 15,
        },
    });

    return (
        <>
            <div ref={sliderRef} className="keen-slider">
                {Children.map(children, (child, index) => (
                    <div className="keen-slider__slide" key={index}>{child}</div>
                ))}
                {loaded && slideCount > 0 && (
                    <>
                        <Arrow
                            left
                            onActivate={(e) => {
                                e.stopPropagation();
                                if (instanceRef.current) {
                                    instanceRef.current.prev();
                                }
                            }}
                            disabled={currentSlide === 0}
                        />
                        <Arrow
                            onActivate={(e) => {
                                e.stopPropagation();
                                if (instanceRef.current) {
                                    instanceRef.current.next();
                                }
                            }}
                            disabled={currentSlide === slideCount - 1}
                        />
                    </>
                )}
            </div>
            {loaded && slideCount > 0 && (
                <div className="dots">
                    {[
                        ...Array(
                            isMobile ? slideCount :
                                Math.max(0, slideCount - 2)).keys(),
                    ].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx)
                                }}
                                className={"dot" + (currentSlide === idx ? " active" : "")}
                                aria-label="Открыть слайд"
                            >{}</button>
                        )
                    })}
                </div>
            )}
        </>
    )
});

function Arrow(props: {
    disabled: boolean
    left?: boolean
    onActivate: (e: MouseEvent<SVGSVGElement> | KeyboardEvent<SVGSVGElement>) => void
}) {
    const disabled = props.disabled ? " arrow--disabled" : ""
    const handleKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
        if (props.disabled) {
            return;
        }
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            props.onActivate(event);
        }
    };
    return (
        <svg
            onClick={(e) => {
                if (!props.disabled) {
                    props.onActivate(e);
                }
            }}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={props.disabled ? -1 : 0}
            aria-label={props.left ? "Предыдущий слайд" : "Следующий слайд"}
            aria-disabled={props.disabled}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"
            } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
            )}
        </svg>
    )
}

Slider.displayName = "Slider";
export default Slider;