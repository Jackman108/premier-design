/** @jest-environment node */
const dynamicMock = jest.fn((importer: () => unknown) => ({importer}));

jest.mock('next/dynamic', () => ({
	__esModule: true,
	default: (importer: () => unknown) => dynamicMock(importer),
}));

describe('dynamicSectionImports', () => {
	it('registers all dynamic feature chunks', async () => {
		const mod = await import('../dynamicSectionImports');

		expect(dynamicMock).toHaveBeenCalledTimes(21);
		expect(mod.Features).toBeDefined();
		expect(mod.Services).toBeDefined();
		expect(mod.RelatedServices).toBeDefined();
		expect(mod.Reviews).toBeDefined();
		expect(mod.FaqSection).toBeDefined();
		expect(mod.VideoSpotlight).toBeDefined();
	});
});
