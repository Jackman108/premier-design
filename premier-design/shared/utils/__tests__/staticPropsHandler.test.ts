/** @jest-environment node */
import {staticPropsHandler} from '../staticPropsHandler';
import {getData} from '@lib/getStaticData';
import {findRelatedService} from '@features/related-services/utils/findRelatedService';
import {findService} from '@features/services/utils/findService';
import {getCommonProps} from '../getCommonProps';

jest.mock('../../../lib/getStaticData', () => ({
	getData: jest.fn(),
}));

jest.mock('../../../features/related-services/utils/findRelatedService', () => ({
	findRelatedService: jest.fn(),
}));

jest.mock('../../../features/services/utils/findService', () => ({
	findService: jest.fn(),
}));

jest.mock('../getCommonProps', () => ({
	getCommonProps: jest.fn(),
}));

const mockedGetData = jest.mocked(getData);
const mockedFindRelatedService = jest.mocked(findRelatedService);
const mockedFindService = jest.mocked(findService);
const mockedGetCommonProps = jest.mocked(getCommonProps);

describe('staticPropsHandler', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedGetData.mockResolvedValue({seed: true} as never);
		mockedGetCommonProps.mockReturnValue({menuData: []} as never);
	});

	it('returns props for regular service page', async () => {
		mockedFindService.mockReturnValue({service: {id: 1}} as never);

		const getStaticProps = staticPropsHandler(false);
		const result = await getStaticProps({params: {categoryId: 'repair', serviceId: 'walls'}} as never);

		expect(mockedFindService).toHaveBeenCalledWith({seed: true}, 'repair', 'walls');
		expect(result).toEqual({
			props: {
				service: {id: 1},
				menuData: [],
			},
			revalidate: 3600,
		});
	});

	it('returns props for related service page', async () => {
		mockedFindRelatedService.mockReturnValue({relatedService: {id: 2}} as never);

		const getStaticProps = staticPropsHandler(true);
		const result = await getStaticProps({params: {categoryId: 'cleaning'}} as never);

		expect(mockedFindRelatedService).toHaveBeenCalledWith({seed: true}, 'cleaning');
		expect(result).toEqual({
			props: {
				relatedService: {id: 2},
				menuData: [],
			},
			revalidate: 3600,
		});
	});

	it('returns notFound when result is empty or on error', async () => {
		const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
		mockedFindService.mockReturnValue(null);
		const getStaticProps = staticPropsHandler(false);
		const notFoundResult = await getStaticProps({params: {categoryId: 'repair'}} as never);
		expect(notFoundResult).toEqual({notFound: true});

		mockedGetData.mockRejectedValue(new Error('boom'));
		const errorResult = await getStaticProps({params: {categoryId: 'repair'}} as never);
		expect(errorResult).toEqual({notFound: true});
		errorSpy.mockRestore();
	});
});
