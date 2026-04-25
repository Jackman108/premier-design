/** @jest-environment node */
import {getCommonProps} from '../getCommonProps';

describe('getCommonProps', () => {
	it('maps required fields from data payload', () => {
		const result = getCommonProps({
			menu: [{id: 1}],
			papers: [{id: 2}],
			news: [{id: 3}],
			costingCard: [{id: 4}],
			button: [{id: 5}],
			panel: [{id: 6}],
			shares: [{id: 7}],
			title: [],
			bannersImages: [],
			trustSignals: {
				metrics: [],
				structuredDataRating: {ratingValue: '5', reviewCount: 1, bestRating: '5'},
			},
		} as never);

		expect(result).toEqual({
			menuData: [{id: 1}],
			papersData: [{id: 2}],
			newsData: [{id: 3}],
			costingData: [{id: 4}],
			buttonData: [{id: 5}],
			panelData: [{id: 6}],
			sharesData: [{id: 7}],
			structuredDataRating: {ratingValue: '5', reviewCount: 1, bestRating: '5'},
			appealSection: expect.objectContaining({titleItem: expect.anything(), buttonItem: expect.anything(), bannerItem: expect.anything()}),
		});
	});
});
