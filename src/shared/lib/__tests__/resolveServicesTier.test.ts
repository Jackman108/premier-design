/** @jest-environment node */
import { resolveServicesTier } from '../resolveServicesTier';
import type { DataProps } from '@shared/validates/dataPropsSchema';

const baseCategory = {
	id: 'construction-works',
	title: 'Строительные работы',
	description: 'Описание',
	image: { src: '/c.webp', alt: '', quality: 90, width: 1, height: 1 },
	priceList: [],
};

describe('resolveServicesTier', () => {
	it('resolves repair category by id first', () => {
		const data = {
			prices: { repairs: [baseCategory] },
			relatedServices: [
				{
					canonical: '/services/expertise',
					id: 'x',
					title: '',
					subTitle: '',
					description: '',
					image: '',
					benefits: [],
					text: '',
					triggers: [],
				},
			],
		} as unknown as DataProps;

		expect(resolveServicesTier(data, 'construction-works')).toEqual({
			kind: 'repair',
			category: baseCategory,
		});
	});

	it('resolves related service by canonical tail', () => {
		const data = {
			prices: { repairs: [] },
			relatedServices: [
				{
					id: 'expertise',
					title: 'Экспертиза',
					subTitle: '',
					description: 'd',
					image: '/i.webp',
					canonical: '/services/expertise',
					benefits: [],
					text: '',
					triggers: [],
				},
			],
		} as unknown as DataProps;

		const r = resolveServicesTier(data, 'expertise');
		expect(r?.kind).toBe('related');
		if (r?.kind === 'related') {
			expect(r.relatedService.id).toBe('expertise');
		}
	});

	it('returns null when slug missing', () => {
		const data = { prices: { repairs: [] }, relatedServices: [] } as unknown as DataProps;
		expect(resolveServicesTier(data, 'unknown')).toBeNull();
	});
});
