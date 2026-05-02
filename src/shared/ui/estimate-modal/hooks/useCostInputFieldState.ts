import { useState } from 'react';

/** Подсветка «пустого» поля площади и связка с контролируемым `value` родителя. */
export const useCostInputFieldState = (inputValue: string) => {
	const [isEmpty, setIsEmpty] = useState<boolean>(inputValue === '');

	const handleInputBlur = () => {
		setIsEmpty(inputValue === '');
	};

	const handleInputClick = () => {
		setIsEmpty(false);
	};

	const inputValueAsNumber = parseInt(inputValue, 10);

	return { isEmpty, handleInputBlur, handleInputClick, inputValueAsNumber };
};
