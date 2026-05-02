/** @jest-environment node */
import { staticPropsHandler } from '../staticPropsHandler';
import { getData } from '@shared/lib/getStaticData';
import { findService } from '@shared/lib/staticProps/findService';
import { getCommonProps } from '@shared/lib/staticProps/getCommonProps';

jest.mock('@shared/lib/getStaticData', () => ({
	getData: jest.fn(),
}));

jest.mock('@shared/lib/staticProps/findService', () => ({
	findService: jest.fn(),
}));

jest.mock('@shared/lib/staticProps/getCommonProps', () => ({
	getCommonProps: jest.fn(),
}));

const mockedGetData = jest.mocked(getData);
const mockedFindService = jest.mocked(findService);
const mockedGetCommonProps = jest.mocked(getCommonProps);

describe('staticPropsHandler', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedGetData.mockResolvedValue({ seed: true } as never);
		mockedGetCommonProps.mockReturnValue({ menuData: [] } as never);
	});

	it('returns props for service detail page', async () => {
		mockedFindService.mockReturnValue({ service: { id: 1 } } as never);

		const getStaticProps = staticPropsHandler();
		const result = await getStaticProps({ params: { categoryId: 'repair', serviceId: 'walls' } } as never);

		expect(mockedFindService).toHaveBeenCalledWith({ seed: true }, 'repair', 'walls');
		expect(result).toEqual({
			props: {
				service: { id: 1 },
				menuData: [],
			},
			revalidate: 3600,
		});
	});

	it('returns notFound when result is empty or on error', async () => {
		const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
		mockedFindService.mockReturnValue(null as never);
		const getStaticProps = staticPropsHandler();
		const notFoundResult = await getStaticProps({ params: { categoryId: 'repair' } } as never);
		expect(notFoundResult).toEqual({ notFound: true });

		mockedGetData.mockRejectedValue(new Error('boom'));
		const errorResult = await getStaticProps({ params: { categoryId: 'repair' } } as never);
		expect(errorResult).toEqual({ notFound: true });
		errorSpy.mockRestore();
	});
});
