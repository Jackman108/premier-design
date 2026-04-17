/** @jest-environment node */
const dynamicMock = jest.fn((importer: () => unknown) => ({importer}));

jest.mock('next/dynamic', () => ({
	__esModule: true,
	default: (importer: () => unknown) => dynamicMock(importer),
}));

describe('dynamicImports', () => {
	it('registers all dynamic feature chunks', async () => {
		const mod = await import('../dynamicImports');

		expect(dynamicMock).toHaveBeenCalledTimes(19);
		expect(mod.Features).toBeDefined();
		expect(mod.Services).toBeDefined();
		expect(mod.RelatedServices).toBeDefined();
		expect(mod.Reviews).toBeDefined();
	});
});
