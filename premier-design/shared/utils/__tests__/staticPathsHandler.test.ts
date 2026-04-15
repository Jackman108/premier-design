/** @jest-environment node */
import {staticPathsHandler} from '../staticPathsHandler';
import {getData} from '@lib/getStaticData';

jest.mock('../../../lib/getStaticData', () => ({
	getData: jest.fn(),
}));

const mockedGetData = jest.mocked(getData);

describe('staticPathsHandler', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('builds service paths in default mode', async () => {
		mockedGetData.mockResolvedValue({
			prices: {
				repairs: [
					{
						id: 'repair',
						priceList: [
							{canonical: '/services/repair/walls'},
							{canonical: '/services/repair/floor'},
						],
					},
				],
			},
		} as never);

		const getStaticPaths = staticPathsHandler(false);
		const result = await getStaticPaths({} as never);

		expect(result).toEqual({
			paths: [
				{params: {categoryId: 'repair', serviceId: 'walls'}},
				{params: {categoryId: 'repair', serviceId: 'floor'}},
			],
			fallback: 'blocking',
		});
	});

	it('builds related service paths in related mode', async () => {
		mockedGetData.mockResolvedValue({
			relatedServices: [{canonical: '/services/related/cleaning'}],
		} as never);

		const getStaticPaths = staticPathsHandler(true);
		const result = await getStaticPaths({} as never);

		expect(result).toEqual({
			paths: [{params: {categoryId: 'cleaning'}}],
			fallback: 'blocking',
		});
	});

	it('returns empty paths when getData fails', async () => {
		const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
		mockedGetData.mockRejectedValue(new Error('boom'));

		const getStaticPaths = staticPathsHandler(false);
		const result = await getStaticPaths({} as never);

		expect(result).toEqual({paths: [], fallback: false});
		errorSpy.mockRestore();
	});
});
