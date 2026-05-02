import { useMemo } from 'react';

import { QuizAnswer } from '../interface/LeadQuiz.props';

type LeadQuizQuestion = 'projectType' | 'area' | 'startWindow';

type UseLeadQuizViewModelParams = {
	answers: QuizAnswer;
	setAnswer: (key: LeadQuizQuestion, value: string) => void;
	trackAnswerSelect: (question: LeadQuizQuestion, value: string) => void;
};

// Хранит "view-model" квиза (summary + обработчик ответов), чтобы UI-компонент
// оставался преимущественно декларативным слоем.
export const useLeadQuizViewModel = ({ answers, setAnswer, trackAnswerSelect }: UseLeadQuizViewModelParams) => {
	const quizSummary = useMemo(
		() =>
			[
				'Квиз-заявка с сайта.',
				`Тип проекта: ${answers.projectType ?? '-'}`,
				`Площадь: ${answers.area ?? '-'}`,
				`Срок старта: ${answers.startWindow ?? '-'}`,
			].join('\n'),
		[answers.area, answers.projectType, answers.startWindow],
	);

	const handleAnswerSelect = (key: LeadQuizQuestion, value: string) => {
		setAnswer(key, value);
		trackAnswerSelect(key, value);
	};

	return {
		handleAnswerSelect,
		quizSummary,
	};
};
