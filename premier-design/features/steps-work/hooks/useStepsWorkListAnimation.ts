import { useRef } from 'react';

import useIntersectionObserver from '@features/steps-work/hooks/useIntersectionObserver';
import { useStepAnimation } from '@features/steps-work/hooks/useStepAnimation';

/** Скролл-контейнер + видимость + шаг анимации — логика вне `ui/StepsWork`. */
export const useStepsWorkListAnimation = (stepsLength: number) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const isVisible = useIntersectionObserver(containerRef, 0.1);
	const currentStep = useStepAnimation(stepsLength, 800, isVisible);
	return { containerRef, currentStep };
};
