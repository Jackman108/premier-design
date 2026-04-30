/** @jest-environment node */
import { findRelatedService } from '../findRelatedService';

const dataWithRelated = (): Parameters<typeof findRelatedService>[0] =>
	({
		relatedServices: [
			{
				id: '1',
				title: 'T',
				subTitle: 'S',
				description: 'D',
				image: '/i',
				canonical: '/related/foo/bar-baz',
				benefits: [],
				text: '',
				triggers: [],
			},
		],
	}) as unknown as Parameters<typeof findRelatedService>[0];

describe('findRelatedService', () => {
	it('returns related service when canonical tail matches categoryId', () => {
		const { relatedService } = findRelatedService(dataWithRelated(), 'bar-baz');
		expect(relatedService.id).toBe('1');
	});

	it('throws when relatedServices missing', () => {
		const data = {} as unknown as Parameters<typeof findRelatedService>[0];
		expect(() => findRelatedService(data, 'x')).toThrow('No related services data found');
	});

	it('throws when no match', () => {
		expect(() => findRelatedService(dataWithRelated(), 'unknown')).toThrow(
			'Related service with id unknown not found',
		);
	});
});
