import {generateStructuredData} from '../generateStructuredData';

describe('generateStructuredData', () => {
	it('exposes absolute logo URL', () => {
		const data = generateStructuredData() as {logo: string};
		expect(data.logo).toBe('https://premium-interior.by/logo.png');
	});

	it('uses Organization schema', () => {
		const data = generateStructuredData() as {'@type': string};
		expect(data['@type']).toBe('Organization');
	});
});
