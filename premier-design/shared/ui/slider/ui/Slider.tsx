'use client';
import React, { Children, FC, memo, ReactElement } from 'react';

import { UI, useLocale } from '@shared/i18n';
import { SliderProps } from '@shared/ui/slider/interface/Slider.props';
import Arrow from '@shared/ui/slider/ui/Arrow';
import { useSliderState } from '@shared/ui/slider/hooks/useSliderState';

const Slider: FC<SliderProps> = memo(({ children, slidesPerView, isMobile }): ReactElement => {
	const { t } = useLocale();
	const { currentSlide, loaded, slideCount, sliderRef, dots, goPrev, goNext, moveTo } = useSliderState({
		isMobile,
		slidesPerView,
	});

	return (
		<>
			<div ref={sliderRef} className="keen-slider">
				{Children.map(children, (child, index) => (
					<div className="keen-slider__slide" key={index}>
						{child}
					</div>
				))}
				{loaded && slideCount > 0 && (
					<>
						<Arrow
							left
							onActivate={(e) => {
								e.stopPropagation();
								goPrev();
							}}
							disabled={currentSlide === 0}
						/>
						<Arrow
							onActivate={(e) => {
								e.stopPropagation();
								goNext();
							}}
							disabled={currentSlide === slideCount - 1}
						/>
					</>
				)}
			</div>
			{loaded && slideCount > 0 && (
				<div className="dots">
					{dots.map((idx) => {
						return (
							<button
								key={idx}
								onClick={() => {
									moveTo(idx);
								}}
								className={'dot' + (currentSlide === idx ? ' active' : '')}
								aria-label={t(UI.sliderOpenSlideAria)}
							>
								{}
							</button>
						);
					})}
				</div>
			)}
		</>
	);
});

Slider.displayName = 'Slider';
export default Slider;
