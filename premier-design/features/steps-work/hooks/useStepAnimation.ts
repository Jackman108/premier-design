import {useEffect, useState} from "react";

export const useStepAnimation = (totalSteps: number, delay: number, isActive: boolean) => {
    const [currentStep, setCurrentStep] = useState(-1);

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep < totalSteps - 1 ? prevStep + 1 : prevStep));
        }, delay);

        return () => clearInterval(interval);
    }, [totalSteps, delay, isActive]);

    return currentStep;
};
