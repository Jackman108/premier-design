import React, { ReactNode } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

interface Props {
    children: ReactNode;
    slidesPerView: number;
    isMobile: boolean;
}

const Slider = ({ children, slidesPerView, isMobile }: Props): JSX.Element => {

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