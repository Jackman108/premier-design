'use client';

import React, { KeyboardEvent } from 'react';

import { UI, useLocale } from '@shared/i18n';
import { SliderArrowProps } from '@shared/ui/slider/interface/Slider.props';

const Arrow = ({ disabled, left, onActivate }: SliderArrowProps) => {
	const { t } = useLocale();
	const disabledClass = disabled ? ' arrow--disabled' : '';

	const handleKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
		if (disabled) {
			return;
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onActivate(event);
		}
	};

	return (
		<svg
			onClick={(e) => {
				if (!disabled) {
					onActivate(e);
				}
			}}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={disabled ? -1 : 0}
			aria-label={left ? t(UI.sliderPrevSlideAria) : t(UI.sliderNextSlideAria)}
			aria-disabled={disabled}
			className={`arrow ${left ? 'arrow--left' : 'arrow--right'}${disabledClass}`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			{left ? (
				<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
			) : (
				<path d="M7.33 0l12.17 11.996-12.17 11.996-2.83-2.829 9.339-9.167-9.339-9.175z" />
			)}
		</svg>
	);
};

export default Arrow;
