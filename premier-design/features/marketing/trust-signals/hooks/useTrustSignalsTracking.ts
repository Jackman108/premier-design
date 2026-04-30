import { useEffect, useRef } from 'react';

import { trackMarketingEvent } from '@shared/analytics/trackMarketingEvent';

// Инкапсулирует маркетинговый трекинг trust-блока:
// - impression при реальном попадании в viewport,
// - единые обработчики интеракций по метрикам/бенефитам.
export const useTrustSignalsTracking = () => {
	const sectionRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section || typeof IntersectionObserver === 'undefined') {
			return;
		}

		// threshold 0.35 снижает шум от "мимолетного" появления блока.
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						trackMarketingEvent('trust_signals_view', { block: 'trust_signals' });
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.35 },
		);

		observer.observe(section);
		return () => observer.disconnect();
	}, []);

	const handleMetricInteraction = (metric: string) => {
		trackMarketingEvent('trust_metric_click', { metric });
	};

	const handleBenefitInteraction = (benefit: string) => {
		trackMarketingEvent('trust_benefit_click', { benefit });
	};

	return {
		handleBenefitInteraction,
		handleMetricInteraction,
		sectionRef,
	};
};
