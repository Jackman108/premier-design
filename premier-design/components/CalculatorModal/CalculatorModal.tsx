'use client'
import { ChangeEvent, Dispatch, FC, useCallback, useEffect, useMemo, useState } from 'react';
import CollapsibleContainer from './CollapsibleContainer/CollapsibleContainer';
import CostInput from './CostInput/CostInput';
import Logo from '../UX/Logo/Logo';
import ModalTabs from './ModalTabs/ModalTabs';
import Preloader from '../UX/Preloader/Preloader';
import { CalculatorModalProps } from '../../interface/CalculatorModal.props';
import styles from './CalculatorModal.module.css';

// Компонент CalculatorModal
const CalculatorModal: FC<CalculatorModalProps> = ({
    data,
    card,
    onClose
}) => {
    // Состояния компонента
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<number>(0);
    const [propertyType, setPropertyType] = useState<string>('new');
    const [repairType, setRepairType] = useState<string>('standard');
    const [serviceType, setServiceType] = useState<string>('design_repair');
    const [error, setError] = useState<string>('');

    // Вычисляемые значения
    const inputValueAsNumber = useMemo(() => parseInt(inputValue, 10), [inputValue]);
    const tabCosts: number[] = useMemo(() => [0, 289, 319, 379, 409, 379], []);

    // Элементы факторов
    const repairFactorMap: { [key: string]: number } = {
        standard: 1,
        comfort: 1.5,
        business: 2.1
    };
    const serviceFactorMap: { [key: string]: number } = {
        design_repair: 1.2,
        repair: 1,
        design: 0.2
    };

    // Массивы опций для выбора типов
    const repairTypeItems = useMemo(() => [
        { label: 'Стандартный ремонт', value: 'standard' },
        { label: 'Комфортный ремонт', value: 'comfort' },
        { label: 'Бизнес ремонт', value: 'business' }
    ], []);

    const propertyTypeItems = useMemo(() => [
        { label: 'Новое жилье', value: 'new' },
        { label: 'Вторичное жилье', value: 'secondary' }
    ], []);

    const serviceTypeItems = useMemo(() => [
        { label: 'Дизайн & Ремонт', value: 'design_repair' },
        { label: 'Ремонт', value: 'repair' },
        { label: 'Дизайн', value: 'design' }
    ], []);

    //Вычисляемые факторы:
    const propertyFactor = propertyType === 'new' ? 1 : 1.1;
    const repairFactor = repairFactorMap[repairType] ?? 1;
    const serviceFactor = serviceFactorMap[serviceType] ?? 1;

    //Вызывается при изменении selectedTab, inputValue или propertyType и устанавливает результат в 0.
    useEffect(() => {
        setResult(0);
    }, [selectedTab, inputValue, propertyType]);

    //Вызывается при изменении card.id и устанавливает выбранную вкладку. устанавливает результат в 0.
    useEffect(() => {
        setSelectedTab(card.id);
    }, [card.id]);

    //Обработчик изменения вкладки.
    const handleTabChange = useCallback(
        (id: number) => {
            setSelectedTab((prevTab) => (prevTab === id ? prevTab : id));
        }, []);

    //Обработчик изменения значения ввода.
    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
        }, []);

    //функция для получения метки по значению из массива элементов.
    const getLabelByValue = useCallback(
        (value: string, items: { label: string; value: string }[]): string => {
            const item = items.find((item) => item.value === value);
            return item ? item.label : '';
        }, []);
    //Обработчик изменения типа с использованием функции setter.
    const handleTypeChange = useCallback(
        (type: string, setter: Dispatch<React.SetStateAction<string>>) => {
            setter(type);
        }, []);

    //Обработчик расчета стоимости.
    const handleCalculate = useCallback(async () => {
        setIsLoading(true);
        try {
            const totalCost =
                tabCosts[selectedTab] *
                inputValueAsNumber *
                propertyFactor *
                repairFactor *
                serviceFactor;

            await new Promise((resolve) => setTimeout(resolve, 2000));
            setResult(Math.round(totalCost));
            setError('');
        } catch (error) {
            setError('Произошла ошибка при расчёте стоимости. Пожалуйста, попробуйте ещё раз или обратитесь к нам.');
        } finally {
            setIsLoading(false);
        }
    }, [propertyFactor, repairFactor, serviceFactor, selectedTab, inputValueAsNumber, tabCosts]);
    return (
        <div className={styles.modal_overlay} onClick={() => onClose()}>
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modal_header}>
                    <h2 className={styles.header_title}>
                        Рассчитайте стоимость Вашего ремонта
                    </h2>
                    <button
                        className={styles.header_close}
                        onClick={() => onClose()}
                    >
                        &times;
                    </button>
                </div>
                <div className={styles.modal_body}>
                    <div className={styles.body_control}>
                        <ModalTabs
                            handleTabChange={handleTabChange}
                            selectedTab={selectedTab}
                            data={data}
                        />
                        <CollapsibleContainer
                            items={serviceTypeItems}
                            activeItem={serviceType}
                            activeLabel={getLabelByValue(serviceType, serviceTypeItems)}
                            onItemClick={(type: string) => handleTypeChange(type, setServiceType)}
                        />
                        <CollapsibleContainer
                            items={propertyTypeItems}
                            activeItem={propertyType}
                            activeLabel={getLabelByValue(propertyType, propertyTypeItems)}
                            onItemClick={(type: string) => handleTypeChange(type, setPropertyType)}
                        />
                        <CollapsibleContainer
                            items={repairTypeItems}
                            activeItem={repairType}
                            activeLabel={getLabelByValue(repairType, repairTypeItems)}
                            onItemClick={(type: string) => handleTypeChange(type, setRepairType)}
                        />
                        < CostInput
                            handleInputChange={handleInputChange}
                            inputValue={inputValue}
                        />
                    </div>
                    <div className={styles.body_result}>
                        <div className={styles.result_direction}>
                            <Logo />
                        </div>
                        {isLoading &&
                            <div className={styles.calculate_loader}>
                                <Preloader />
                            </div>
                        }
                        {!isLoading && error &&
                            <div className={styles.error_message}>
                                {error}
                            </div>
                        }
                        {!isLoading && result > 0 &&
                            <div className={styles.calculate_result}>
                                <p>
                                    Предварительная оценка стоимости ремонта:
                                </p>
                                <p>
                                    {result} бел.руб.
                                </p>
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.modal_footer}>
                    <button
                        className={styles.calculate_button}
                        onClick={handleCalculate}
                        disabled={isLoading || inputValueAsNumber <= 0 || inputValue === ''}
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalculatorModal;