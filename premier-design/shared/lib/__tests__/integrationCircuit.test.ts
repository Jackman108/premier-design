import {
	CircuitOpenError,
	resetIntegrationCircuitsForTests,
	runWithIntegrationCircuit,
} from '../integrationCircuit';

const baseConfig = {
	enabled: true,
	failureThreshold: 2,
	openDurationMs: 60_000,
};

describe('runWithIntegrationCircuit', () => {
	beforeEach(() => {
		resetIntegrationCircuitsForTests();
		jest.spyOn(console, 'error').mockImplementation(() => undefined);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('trips to open after threshold failures, then short-circuits with CircuitOpenError', async () => {
		const c = {cb: 0, name: 'test-telegram'};

		await expect(
			runWithIntegrationCircuit(c.name, baseConfig, async () => {
				c.cb += 1;
				throw new Error('fail-1');
			}),
		).rejects.toThrow('fail-1');

		await expect(
			runWithIntegrationCircuit(c.name, baseConfig, async () => {
				c.cb += 1;
				throw new Error('fail-2');
			}),
		).rejects.toThrow('fail-2');

		await expect(
			runWithIntegrationCircuit(c.name, baseConfig, async () => {
				c.cb += 1;
				return 1;
			}),
		).rejects.toBeInstanceOf(CircuitOpenError);

		expect(c.cb).toBe(2);
	});

	it('if disabled, always runs the operation', async () => {
		const c = {n: 0, name: 't2'};
		for (let i = 0; i < 5; i += 1) {
			await runWithIntegrationCircuit(
				c.name,
				{enabled: false, failureThreshold: 1, openDurationMs: 1},
				async () => {
					c.n += 1;
					throw new Error('nope');
				},
			).catch(() => undefined);
		}
		expect(c.n).toBe(5);
	});
});
