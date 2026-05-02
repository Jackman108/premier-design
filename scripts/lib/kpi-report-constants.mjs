/** Константы KPI-отчёта (FB-R-08). */

export const METRIC_DEFINITIONS = [
	{ key: 'visitorToLeadCr', label: 'Visitor -> Lead CR (%)', direction: 'higher' },
	{ key: 'mqlRate', label: 'MQL Rate (%)', direction: 'higher' },
	{ key: 'leadToDealCr', label: 'Lead -> Deal CR (%)', direction: 'higher' },
	{ key: 'serpCtr', label: 'SERP CTR (%)', direction: 'higher' },
	{ key: 'quizFunnelCr', label: 'Quiz Step View -> Submit Success (%)', direction: 'higher' },
	{ key: 'lcp', label: 'LCP (ms)', direction: 'lower' },
	{ key: 'inp', label: 'INP (ms)', direction: 'lower' },
	{ key: 'cls', label: 'CLS', direction: 'lower' },
];

export const WEB_VITAL_BUDGETS = {
	lcp: 2500,
	inp: 200,
	cls: 0.1,
};

export const STABLE_THRESHOLD_PERCENT = 1;
