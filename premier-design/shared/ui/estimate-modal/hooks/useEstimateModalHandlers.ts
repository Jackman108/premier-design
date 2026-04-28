/**
 * Состояние и обработчики модалки сметы: связь UI с `calculateEstimate` и конфигом.
 * Сами расчёты — в `utils/calculateEstimate`, база/коэффициенты — в `configs/factorsConfig`.
 */
import {type ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import type {CostingCardProps} from '@shared/interface/CostingCard.props';
import {BASE_COST_PER_SQM_BY_CARD_ID} from '@shared/ui/estimate-modal/configs/factorsConfig';
import {calculateEstimate, parseAreaValue} from '@shared/ui/estimate-modal/utils/calculateEstimate';

const useEstimateModalHandlers = (card: CostingCardProps) => {
	const [selectedTab, setSelectedTab] = useState<number>(card.id || 0);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [propertyType, setPropertyType] = useState<string>('new');
    const [repairType, setRepairType] = useState<string>('standard');
    const [serviceType, setServiceType] = useState<string>('design_repair');

    const tabCosts = BASE_COST_PER_SQM_BY_CARD_ID;
    const inputValueAsNumber = useMemo(() => parseAreaValue(inputValue), [inputValue]);

    const handleTabChange = useCallback((id: number) => {
        setSelectedTab((prevTab) => (prevTab !== id ? id : prevTab));
    }, []);

    const handleObjectCardIdSelect = useCallback(
        (id: string) => {
            const next = Number.parseInt(id, 10);
            if (Number.isNaN(next)) {
                return;
            }
            handleTabChange(next);
        },
        [handleTabChange],
    );

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }, []);

    const handleTypeChange = useCallback((value: string, type: 'property' | 'repair' | 'service') => {
        switch (type) {
            case 'property':
                setPropertyType(value);
                break;
            case 'repair':
                setRepairType(value);
                break;
            case 'service':
                setServiceType(value);
                break;
        }
    }, []);


    const handleCalculate = useCallback(async () => {
        setIsLoading(true);
        try {
            const totalCost = calculateEstimate({
                tabCosts,
                selectedTab,
                area: inputValueAsNumber,
                propertyType,
                repairType,
                serviceType,
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setResult(totalCost);
            setError('');
        } catch {
            setError('Произошла ошибка при расчёте стоимости. Пожалуйста, попробуйте ещё раз или обратитесь к нам.');
        } finally {
            setIsLoading(false);
        }
    }, [propertyType, repairType, selectedTab, inputValueAsNumber, serviceType, tabCosts]);

    useEffect(() => {
        setResult(0);
    }, [inputValue, propertyType, repairType, selectedTab, serviceType]);

    useEffect(() => {
        setSelectedTab(card.id);
    }, [card.id]);

    return {
        selectedTab,
        inputValue,
        isLoading,
        result,
        error,
        propertyType,
        repairType,
        serviceType,
        inputValueAsNumber,
        handleTabChange,
        handleObjectCardIdSelect,
        handleInputChange,
        handleTypeChange,
        handleCalculate,
    };
};

export default useEstimateModalHandlers;
