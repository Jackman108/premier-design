/** @jest-environment node */
import {findService} from '../findService';

const baseData = (): Parameters<typeof findService>[0] =>
	({
		prices: {
			repairs: [
				{
					id: 'cat-a',
					title: 'Категория',
					description: 'd',
					image: {src: '/x', alt: 'a', quality: 75, width: 1, height: 1},
					priceList: [{service: 's', unit: 'u', price: '1', canonical: '/services/cat-a/my-service'}],
				},
			],
			design: [],
		},
	} as unknown as Parameters<typeof findService>[0]);

describe('findService', () => {
	it('returns service and category props when ids match canonical segment', () => {
		const data = baseData();
		const {service, categoryProps} = findService(data, 'cat-a', 'my-service');
		expect(service.canonical).toBe('/services/cat-a/my-service');
		expect(categoryProps.title).toBe('Категория');
	});

	it('throws when category is missing', () => {
		expect(() => findService(baseData(), 'missing', 'my-service')).toThrow('Category with id missing not found');
	});

	it('throws when service slug does not match', () => {
		expect(() => findService(baseData(), 'cat-a', 'wrong')).toThrow('Service with id wrong not found');
	});

	it('throws when repairs data absent', () => {
		const data = {prices: {repairs: undefined, design: []}} as unknown as Parameters<typeof findService>[0];
		expect(() => findService(data, 'cat-a', 'my-service')).toThrow('No repairs data found');
	});
});
