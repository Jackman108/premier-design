import React, { KeyboardEvent } from 'react';
import { SliderArrowProps } from '@shared/ui/slider/interface/Slider.props';

const Arrow = ({ disabled, left, onActivate }: SliderArrowProps) => {
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
			aria-label={left ? 'Предыдущий слайд' : 'Следующий слайд'}
			aria-disabled={disabled}
			className={`arrow ${left ? 'arrow--left' : 'arrow--right'} ${disabledClass}`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			{left ? (
				<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
			) : (
				<path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
			)}
		</svg>
	);
};

export default Arrow;
