/** @jest-environment node */
import {processFeedback} from '../processFeedback';
import {submitFeedback} from '../../features/feedback/useCases/submitFeedback';

jest.mock('../../features/feedback/useCases/submitFeedback', () => ({
	submitFeedback: jest.fn(),
}));

const mockedSubmitFeedback = jest.mocked(submitFeedback);

describe('processFeedback', () => {
	it('delegates payload to submitFeedback', async () => {
		mockedSubmitFeedback.mockResolvedValue(undefined);

		await processFeedback({
			name: 'Иван',
			phone: '375291234567',
			email: 'test@mail.com',
			message: 'test',
			consent: true,
		});

		expect(mockedSubmitFeedback).toHaveBeenCalledWith({
			name: 'Иван',
			phone: '375291234567',
			email: 'test@mail.com',
			message: 'test',
			consent: true,
		});
	});
});
