/** @jest-environment node */
import type {NextApiRequest} from 'next';

import {SITE_PUBLIC_ORIGIN} from '@shared/constants/company';
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

const getReq = (method = 'GET'): Pick<NextApiRequest, 'method'> => ({method});

describe('/api/sitemap handler', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns 405 for non-GET', async () => {
		const res = createRes();
		await handler(getReq('POST') as NextApiRequest, res as never);

		expect(res.setHeader).toHaveBeenCalledWith('Allow', 'GET');
		expect(res.setHeader).toHaveBeenCalledWith('X-Correlation-Id', expect.any(String));
		expect(res.status).toHaveBeenCalledWith(405);
		expect(res.json).toHaveBeenCalledWith({message: 'Method not allowed.'});
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
		await handler(getReq() as NextApiRequest, res as never);

		expect(res.setHeader).toHaveBeenCalledWith('X-Correlation-Id', expect.any(String));
		expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/xml');
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledTimes(1);

		const payload = res.send.mock.calls[0][0] as string;
		expect(payload).toContain('<urlset');
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/design`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/portfolio`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/calculator`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/services`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/sitemap`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/services/renovation`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/services/renovation/flooring`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/services/related/cleaning`);
	});

	it('returns 500 when data structure is invalid', async () => {
		const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
		mockedGetData.mockResolvedValue({
			prices: {repairs: 'invalid'},
			relatedServices: [],
		} as never);

		const res = createRes();
		await handler(getReq() as NextApiRequest, res as never);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			status: 'error',
			message: 'Не удалось сформировать sitemap',
			correlationId: expect.any(String),
		});
		errorSpy.mockRestore();
	});
});
