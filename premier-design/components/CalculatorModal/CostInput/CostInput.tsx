'use strict'
import React, { FC, useState } from 'react';
import styles from './CostInput.module.css';
import { CostInputProps } from './CostInput.props';

const CostInput: FC<CostInputProps> = ({
    inputValue,
    handleInputChange
}) => {
    const [isEmpty, setIsEmpty] = useState<boolean>(inputValue === '');

    const handleInputBlur = () => {
        setIsEmpty(inputValue === '');
    };
    const handleInputClick = () => {
        setIsEmpty(false);
    };
    const inputValueAsNumber = parseInt(inputValue, 10);
    return (    
            <div className={styles.input_container}>
                <input
                    placeholder='Количество  м2. '
                    type="number"
                    id="input"
                    min={1}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onClick={handleInputClick}
                    className={`${styles.input_area} ${isEmpty ? styles.empty : ''}`}
                />
                {(isEmpty || inputValueAsNumber <= 0) && <div className={styles.error}>Введите площадь помещения</div>}
            </div>
        
    );
};

export default CostInput;
