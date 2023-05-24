import styles from './CalculatorModal.module.css';
import {  FC,  useState } from 'react';
import { CalculatorModalProps } from './CalculatorModal.props';


const CalculatorModal: FC<CalculatorModalProps> = ({ onClose }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(0);

    const handleTabChange = (index: number) => {
        setSelectedTab(index);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleCalculate = () => {
        setIsLoading(true);
        // Имитация задержки для показа загрузки
        setTimeout(() => {
            let cost = 0;
            // Расчет стоимости в зависимости от выбранной вкладки
            if (selectedTab === 0) {
                cost = 100; // Пример стоимости для первой вкладки
            } else if (selectedTab === 1) {
                cost = 200; // Пример стоимости для второй вкладки
            } // Добавьте аналогичные условия для остальных вкладок

            // Расчет стоимости с учетом выбора нового или вторичного жилья
            const factor = (document.getElementById('radio-new') as HTMLInputElement)?.checked ? 1 : 1.1;
            const totalCost = cost * parseFloat(inputValue) * factor;

            setResult(totalCost);
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div className={styles.modal}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Калькулятор</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <div className="tabs">
                        <div
                            className={`tab ${selectedTab === 0 ? 'active' : ''}`}
                            onClick={() => handleTabChange(0)}
                        >
                            Вкладка 1
                        </div>
                        <div
                            className={`tab ${selectedTab === 1 ? 'active' : ''}`}
                            onClick={() => handleTabChange(1)}
                        >
                            Вкладка 2
                        </div>
                        {/* Добавьте аналогичные элементы для остальных вкладок */}
                    </div>
                    <div className="input-container">
                        <label htmlFor="input">Введите число:</label>
                        <input
                            type="number"
                            id="input"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="radio-container">
                        <label>
                            <input type="radio" id="radio-new" name="property-type" />
                            Новое жилье
                        </label>
                        <label>
                            <input type="radio" id="radio-secondary" name="property-type" />
                            Вторичное жилье
                        </label>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="calculate-button" onClick={handleCalculate}>
                        Рассчитать
                    </button>
                    {isLoading && <div className="loader">Загрузка...</div>}
                    {!isLoading && result > 0 && <div className="result">Результат: {result}</div>}
                </div>
            </div>
        </div>
    );
};

export default CalculatorModal;