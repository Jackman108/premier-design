/** @jest-environment node */
import handler from '../../pages/api/sitemap';
import {getData} from '@lib/getStaticData';

jest.mock('../../lib/getStaticData', () => ({
	getData: jest.fn(),
}));

const mockedGetData = jest.mocked(getData);

type MockResponse = {
	setHeader: jest.Mock;
	status: jest.Mock;
	send: jest.Mock;
	json: jest.Mock;
};

const createRes = (): MockResponse => {
	const res = {
		setHeader: jest.fn(),
		status: jest.fn(),
		send: jest.fn(),
		json: jest.fn(),
	};
	res.status.mockReturnValue(res);
	return res;
};

describe('/api/sitemap handler', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns xml sitemap with static and dynamic urls', async () => {
		mockedGetData.mockResolvedValue({
			prices: {
				repairs: [
					{
						id: 'renovation',
						priceList: [{canonical: '/services/renovation/flooring'}],
					},
				],
			},
			relatedServices: [{canonical: '/services/related/cleaning'}],
		} as never);

		const res = createRes();
		await handler({} as never, res as never);

		expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/xml');
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledTimes(1);

		const payload = res.send.mock.calls[0][0] as string;
		expect(payload).toContain('<urlset');
		expect(payload).toContain('https://premier-design.by/design');
		expect(payload).toContain('https://premier-design.by/services/renovation/flooring');
		expect(payload).toContain('https://premier-design.by/services/related/cleaning');
	});

	it('returns 500 when data structure is invalid', async () => {
		const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
		mockedGetData.mockResolvedValue({
			prices: {repairs: 'invalid'},
			relatedServices: [],
		} as never);

		const res = createRes();
		await handler({} as never, res as never);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({error: 'Не удалось сформировать sitemap'});
		errorSpy.mockRestore();
	});
});
