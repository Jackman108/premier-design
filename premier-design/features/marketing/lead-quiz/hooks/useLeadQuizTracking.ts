import {useEffect, useRef} from 'react';

import {trackMarketingEvent} from '@shared/analytics/trackMarketingEvent';

type LeadQuizQuestion = 'projectType' | 'area' | 'startWindow';

type UseLeadQuizTrackingParams = {
	step: number;
	totalSteps: number;
};

export const useLeadQuizTracking = ({step, totalSteps}: UseLeadQuizTrackingParams) => {
	const startedRef = useRef(false);

	useEffect(() => {
		if (!startedRef.current) {
			trackMarketingEvent('lead_quiz_start', {step});
			startedRef.current = true;
			return;
		}

		trackMarketingEvent('lead_quiz_step_view', {step});
	}, [step]);

	useEffect(
		() => () => {
			if (step < totalSteps) {
				trackMarketingEvent('lead_quiz_dropoff', {step});
			}
		},
		[step, totalSteps],
	);

	const trackAnswerSelect = (question: LeadQuizQuestion, value: string) => {
		trackMarketingEvent('lead_quiz_answer_select', {step, question, value});
	};

	return {
		trackAnswerSelect,
	};
};
