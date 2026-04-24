'use strict'
import React, { FC } from 'react';
import styles from './CostInput.module.css';
import { CostInputProps } from '@shared/ui/calculator-modal/interface/CalculatorModal.props';
import {useCostInputFieldState} from '@shared/ui/calculator-modal/hooks/useCostInputFieldState';

const CostInput: FC<CostInputProps> = ({
    inputValue,
    handleInputChange
}) => {
    const {isEmpty, handleInputBlur, handleInputClick, inputValueAsNumber} = useCostInputFieldState(inputValue);
    return (    
            <div className={styles.input_container}>
                <label className={styles.visually_hidden} htmlFor="calculator-area-input">
                    Площадь помещения в квадратных метрах
                </label>
                <input
                    placeholder='Количество  м2. '
                    type="number"
                    id="calculator-area-input"
                    min={1}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onClick={handleInputClick}
                    className={`${styles.input_area} ${isEmpty ? styles.empty : ''}`}
                    autoComplete="off"
                    aria-label="Площадь помещения в квадратных метрах"
                    aria-invalid={isEmpty || inputValueAsNumber <= 0 ? 'true' : undefined}
                    aria-errormessage={isEmpty || inputValueAsNumber <= 0 ? 'calculator-area-error' : undefined}
                />
                {(isEmpty || inputValueAsNumber <= 0) && <div id="calculator-area-error" className={styles.error} role="alert">Введите площадь помещения</div>}
            </div>
        
    );
};

export default CostInput;
