/** @jest-environment node */
import { getServicesTierStaticPaths, getServicesTierStaticProps } from '../servicesTierStatic';
import { getData } from '@shared/lib/getStaticData';
import { getCommonProps } from '@shared/lib/staticProps/getCommonProps';

jest.mock('@shared/lib/getStaticData', () => ({
	getData: jest.fn(),
}));

jest.mock('@shared/lib/staticProps/getCommonProps', () => ({
	getCommonProps: jest.fn(),
}));

const mockedGetData = jest.mocked(getData);
const mockedGetCommonProps = jest.mocked(getCommonProps);

const repairCategory = {
	id: 'cat-a',
	title: 'A',
	description: 'd',
	image: { src: '/x.webp', alt: '', quality: 90, width: 1, height: 1 },
	priceList: [{ canonical: '/services/cat-a/job', service: 'J', unit: 'm', price: '1' }],
};

const relatedEntry = {
	id: 'expertise',
	title: 'T',
	subTitle: '',
	description: 'd',
	image: '/i.webp',
	canonical: '/services/expertise',
	benefits: [],
	text: '',
	triggers: [],
};

describe('servicesTierStatic', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('getServicesTierStaticPaths', () => {
		it('merges repair category ids and related canonical tails; repairs win on duplicate slug', async () => {
			mockedGetData.mockResolvedValue({
				prices: { repairs: [{ ...repairCategory, id: 'expertise' }] },
				relatedServices: [relatedEntry],
			} as never);

			const result = await getServicesTierStaticPaths({} as never);

			expect(result).toEqual({
				paths: [{ params: { categoryId: 'expertise' } }],
				fallback: 'blocking',
			});
		});

		it('includes related-only slugs when not overlapping repairs', async () => {
			mockedGetData.mockResolvedValue({
				prices: { repairs: [repairCategory] },
				relatedServices: [relatedEntry],
			} as never);

			const result = await getServicesTierStaticPaths({} as never);
			expect(result).toEqual({
				paths: [{ params: { categoryId: 'cat-a' } }, { params: { categoryId: 'expertise' } }],
				fallback: 'blocking',
			});
		});

		it('returns empty paths when getData fails', async () => {
			const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
			mockedGetData.mockRejectedValue(new Error('boom'));
			const result = await getServicesTierStaticPaths({} as never);
			expect(result).toEqual({ paths: [], fallback: false });
			errorSpy.mockRestore();
		});
	});

	describe('getServicesTierStaticProps', () => {
		beforeEach(() => {
			mockedGetCommonProps.mockReturnValue({ menuData: [] } as never);
		});

		it('returns repair tier props when category matches repairs', async () => {
			mockedGetData.mockResolvedValue({
				prices: { repairs: [repairCategory] },
				relatedServices: [],
			} as never);

			const result = await getServicesTierStaticProps({
				params: { categoryId: 'cat-a' },
			} as never);

			expect(result).toEqual({
				props: {
					menuData: [],
					tierKind: 'repair',
					category: repairCategory,
				},
				revalidate: 3600,
			});
		});

		it('returns related tier props when slug matches relatedServices', async () => {
			mockedGetData.mockResolvedValue({
				prices: { repairs: [] },
				relatedServices: [relatedEntry],
			} as never);

			const result = await getServicesTierStaticProps({
				params: { categoryId: 'expertise' },
			} as never);

			expect(result).toEqual({
				props: {
					menuData: [],
					tierKind: 'related',
					relatedService: relatedEntry,
				},
				revalidate: 3600,
			});
		});

		it('returns notFound for unknown slug', async () => {
			mockedGetData.mockResolvedValue({
				prices: { repairs: [] },
				relatedServices: [],
			} as never);

			const result = await getServicesTierStaticProps({
				params: { categoryId: 'nope' },
			} as never);

			expect(result).toEqual({ notFound: true });
		});
	});
});
