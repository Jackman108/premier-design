import {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {factorConfig, PropertyType, RepairType, ServiceType} from "../configs/factorsConfig";
import {CostingCardProps} from "../interface/Cards.props";

const useCalculatorHandlers = (card: CostingCardProps) => {
    const [selectedTab, setSelectedTab] = useState<number>(card.id || 0);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [propertyType, setPropertyType] = useState<string>('new');
    const [repairType, setRepairType] = useState<string>('standard');
    const [serviceType, setServiceType] = useState<string>('design_repair');

    const tabCosts: number[] = useMemo(() => [0, 289, 319, 379, 409, 379], []);
    const inputValueAsNumber = useMemo(() => parseInt(inputValue, 10), [inputValue]);

    const {repairFactorMap, serviceFactorMap, propertyFactorMap} = factorConfig;


    const propertyFactor = propertyFactorMap[propertyType as PropertyType] ?? 1;
    const repairFactor = repairFactorMap[repairType as RepairType] ?? 1;
    const serviceFactor = serviceFactorMap[serviceType as ServiceType] ?? 1;

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
            const totalCost =
                tabCosts[selectedTab] *
                inputValueAsNumber *
                propertyFactor *
                repairFactor *
                serviceFactor;

            await new Promise((resolve) => setTimeout(resolve, 2000));
            setResult(Math.round(totalCost));
            setError('');
        } catch {
            setError('Произошла ошибка при расчёте стоимости. Пожалуйста, попробуйте ещё раз или обратитесь к нам.');
        } finally {
            setIsLoading(false);
        }
    }, [propertyFactor, repairFactor, serviceFactor, selectedTab, inputValueAsNumber, tabCosts]);

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
