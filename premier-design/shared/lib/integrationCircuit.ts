/**
 * In-process circuit breaker for внешние интеграции (RISK-10).
 * Снижает «шторм» к сбойным сервисам: после N полных неуспехов операции — отказ
 * на openDurationMs, затем одна проба (half-open). В serverless состояние на воркер; в long-running — на инстанс.
 */
export class CircuitOpenError extends Error {
	readonly name = 'CircuitOpenError';
	readonly code = 'CIRCUIT_OPEN' as const;

	constructor(readonly circuitName: string) {
		super(`Интеграция «${circuitName}» временно отключена из-за сбоев. Повторите позже.`);
	}
}

export const isIntegrationCircuitOpenError = (e: unknown): e is CircuitOpenError => e instanceof CircuitOpenError;

export type IntegrationCircuitConfig = {
	/** Включить (для отладки можно отключить через env). */
	enabled: boolean;
	failureThreshold: number;
	openDurationMs: number;
};

type CircuitState = {
	state: 'closed' | 'open' | 'half_open';
	/** Считает неудачи в состоянии closed. */
	consecutiveFailures: number;
	/** Когда open истекает и разрешён half-open. */
	openUntil: number;
};

const circuits = new Map<string, CircuitState>();

const getState = (name: string): CircuitState => {
	const existing = circuits.get(name);
	if (existing) {
		return existing;
	}
	const initial: CircuitState = { state: 'closed', consecutiveFailures: 0, openUntil: 0 };
	circuits.set(name, initial);
	return initial;
};

/** Только для unit-тестов. */
export const resetIntegrationCircuitsForTests = (): void => {
	circuits.clear();
};

/** Только для unit-тестов: снимок состояния (без чувствительных данных). */
export const getIntegrationCircuitStateForTest = (
	circuitName: string,
): {
	state: CircuitState['state'];
	consecutiveFailures: number;
} | null => {
	const s = circuits.get(circuitName);
	if (!s) {
		return null;
	}
	return { state: s.state, consecutiveFailures: s.consecutiveFailures };
};

const logTripped = (name: string, openUntilEpochMs: number) => {
	console.error(`[integration-circuit] name=${name} state=open reopenAt=${new Date(openUntilEpochMs).toISOString()}`);
};

export const runWithIntegrationCircuit = async <T>(
	circuitName: string,
	config: IntegrationCircuitConfig,
	operation: () => Promise<T>,
): Promise<T> => {
	if (!config.enabled || config.failureThreshold < 1) {
		return operation();
	}

	const s = getState(circuitName);
	const now = Date.now();

	if (s.state === 'open') {
		// openUntil — момент времени, до которого разомкнуто; после — одна проба.
		if (now < s.openUntil) {
			throw new CircuitOpenError(circuitName);
		}
		s.state = 'half_open';
	}

	const onSuccess = () => {
		s.state = 'closed';
		s.consecutiveFailures = 0;
		s.openUntil = 0;
	};

	try {
		const value = await operation();
		onSuccess();
		return value;
	} catch (e) {
		if (e instanceof CircuitOpenError) {
			throw e;
		}

		if (s.state === 'half_open') {
			s.state = 'open';
			s.consecutiveFailures = 0;
			s.openUntil = now + config.openDurationMs;
			logTripped(circuitName, s.openUntil);
			throw e;
		}

		s.consecutiveFailures += 1;
		if (s.consecutiveFailures >= config.failureThreshold) {
			s.state = 'open';
			s.consecutiveFailures = 0;
			s.openUntil = now + config.openDurationMs;
			logTripped(circuitName, s.openUntil);
		}
		throw e;
	}
};
