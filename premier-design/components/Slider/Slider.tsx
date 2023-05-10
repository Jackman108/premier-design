import React from 'react';
import { SliderProps } from './Slider.props';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"


const Slider: React.FC<SliderProps> = ({ children, slidesPerView, isMobile }): JSX.Element => {

    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: "free-snap",
        slides: {
            perView: isMobile ? 1 : slidesPerView,
            spacing: 15,
        },
    })
    return (
        <div ref={ref} className="keen-slider">
            {React.Children.map(children, (child, index) => (
                <div className="keen-slider__slide" key={index}>{child}</div>
            ))}
        </div>
    )
}
export default Slider;