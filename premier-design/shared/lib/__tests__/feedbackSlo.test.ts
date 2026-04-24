import {getFeedbackApiTimeoutMs} from '@shared/lib/feedbackSlo';

const assign = (key: string, value: string | undefined) => {
	const e = process.env as Record<string, string | undefined>;
	if (value === undefined) {
		delete e[key];
	} else {
		e[key] = value;
	}
};

describe('getFeedbackApiTimeoutMs', () => {
	const prev = {timeout: process.env.FEEDBACK_API_TIMEOUT_MS, nodeEnv: process.env.NODE_ENV};

	afterEach(() => {
		assign('FEEDBACK_API_TIMEOUT_MS', prev.timeout);
		assign('NODE_ENV', prev.nodeEnv);
	});

	it('uses explicit FEEDBACK_API_TIMEOUT_MS when set', () => {
		assign('FEEDBACK_API_TIMEOUT_MS', '5000');
		expect(getFeedbackApiTimeoutMs()).toBe(5000);
	});

	it('defaults to 30s in development', () => {
		assign('FEEDBACK_API_TIMEOUT_MS', undefined);
		assign('NODE_ENV', 'development');
		expect(getFeedbackApiTimeoutMs()).toBe(30_000);
	});

	it('defaults to 20s outside development', () => {
		assign('FEEDBACK_API_TIMEOUT_MS', undefined);
		assign('NODE_ENV', 'production');
		expect(getFeedbackApiTimeoutMs()).toBe(20_000);
	});
});
