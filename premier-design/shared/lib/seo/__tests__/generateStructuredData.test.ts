import {SITE_PUBLIC_ORIGIN} from '@shared/constants/company';
import {generateStructuredData} from '../generateStructuredData';

describe('generateStructuredData', () => {
	it('returns @graph with LocalBusiness and absolute logo', () => {
		const data = generateStructuredData() as {
			'@context': string;
			'@graph': Array<Record<string, unknown>>;
		};
		expect(data['@context']).toBe('https://schema.org');
		expect(Array.isArray(data['@graph'])).toBe(true);
		const lb = data['@graph'][0] as {'@type': string; logo: string};
		expect(lb['@type']).toBe('LocalBusiness');
		expect(lb.logo).toBe(`${SITE_PUBLIC_ORIGIN}/logo.png`);
	});

	it('adds FAQPage when faqItems provided', () => {
		const data = generateStructuredData({
			faqItems: [{question: 'Q?', answer: 'A.'}],
		}) as {'@graph': Array<Record<string, unknown>>};
		expect(data['@graph']).toHaveLength(2);
		expect(data['@graph'][1]['@type']).toBe('FAQPage');
	});

	it('adds aggregateRating when option set', () => {
		const data = generateStructuredData({
			aggregateRating: {ratingValue: '5', reviewCount: 4, bestRating: '5'},
		}) as {'@graph': Array<Record<string, unknown>>};
		const lb = data['@graph'][0] as {aggregateRating: {'@type': string}};
		expect(lb.aggregateRating['@type']).toBe('AggregateRating');
	});

	it('adds Service node when service option set', () => {
		const data = generateStructuredData({
			service: {
				name: 'Покраска',
				description: 'Работы малярные',
				url: `${SITE_PUBLIC_ORIGIN}/services/renovation/paint`,
			},
		}) as {'@graph': Array<Record<string, unknown>>};
		const svc = data['@graph'][1] as {'@type': string; provider: {'@id': string}};
		expect(svc['@type']).toBe('Service');
		expect(svc.provider['@id']).toContain('localbusiness');
	});
});
