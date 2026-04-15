import {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {CostingCardProps} from "@features/coasting/interface/Costing.props";
import {calculateEstimate, DEFAULT_TAB_COSTS, parseAreaValue} from '@shared/ui/calculator-modal/utils/calculateEstimate';

const useCalculatorHandlers = (card: CostingCardProps) => {
    const [selectedTab, setSelectedTab] = useState<number>(card.id || 0);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [propertyType, setPropertyType] = useState<string>('new');
    const [repairType, setRepairType] = useState<string>('standard');
    const [serviceType, setServiceType] = useState<string>('design_repair');

    const tabCosts = useMemo(() => DEFAULT_TAB_COSTS, []);
    const inputValueAsNumber = useMemo(() => parseAreaValue(inputValue), [inputValue]);

    const handleTabChange = useCallback((id: number) => {
        setSelectedTab((prevTab) => (prevTab !== id ? id : prevTab));
    }, []);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }, []);

    const handleTypeChange = useCallback((value: string, type: 'repair' | 'property' | 'service') => {
        if (type === 'repair') setRepairType(value);
        if (type === 'property') setPropertyType(value);
        if (type === 'service') setServiceType(value);
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
    }, [selectedTab, inputValue, propertyType]);

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
        handleInputChange,
        handleTypeChange,
        handleCalculate,
    };
};

export default useCalculatorHandlers;
