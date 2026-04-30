import { useMemo, useState } from 'react';

import { QuizAnswer } from '../interface/LeadQuiz.props';

const TOTAL_STEPS = 3;

export const useLeadQuiz = () => {
	const [step, setStep] = useState<number>(1);
	const [answers, setAnswers] = useState<QuizAnswer>({});

	const canMoveNext = useMemo(() => {
		if (step === 1) {
			return Boolean(answers.projectType);
		}

		if (step === 2) {
			return Boolean(answers.area);
		}

		if (step === 3) {
			return Boolean(answers.startWindow);
		}

		return false;
	}, [answers, step]);

	const setAnswer = (key: keyof QuizAnswer, value: string) => {
		setAnswers((prev) => ({ ...prev, [key]: value }));
	};

	const nextStep = () => {
		if (!canMoveNext) {
			return;
		}

		setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
	};

	const prevStep = () => {
		setStep((prev) => Math.max(prev - 1, 1));
	};

	return {
		step,
		answers,
		canMoveNext,
		setAnswer,
		nextStep,
		prevStep,
		totalSteps: TOTAL_STEPS,
	};
};
