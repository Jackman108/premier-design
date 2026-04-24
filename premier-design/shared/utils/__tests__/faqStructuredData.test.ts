import {mapFaqEntriesToStructuredData} from '@shared/utils/faqStructuredData';

describe('mapFaqEntriesToStructuredData', () => {
	it('maps question/answer for CustomHead / JSON-LD', () => {
		const out = mapFaqEntriesToStructuredData([{question: 'A?', answer: 'B'}]);
		expect(out).toEqual([{question: 'A?', answer: 'B'}]);
	});
});
