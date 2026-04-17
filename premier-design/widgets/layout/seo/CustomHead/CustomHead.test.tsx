/** @jest-environment jsdom */
import {render} from '@testing-library/react';
import type {ReactNode} from 'react';
import CustomHead from './CustomHead';
import {generateStructuredData} from '../utils/generateStructuredData';
import {getFullCanonicalUrl} from '../utils/getFullCanonicalUrl';

const headMock = jest.fn(({children}: {children: ReactNode}) => <div data-testid="mock-head">{children}</div>);

jest.mock('next/head', () => ({
	__esModule: true,
	default: (props: {children: ReactNode}) => headMock(props),
}));

jest.mock('next/script', () => ({
	__esModule: true,
	default: ({
		id,
		dangerouslySetInnerHTML,
	}: {
		id: string;
		dangerouslySetInnerHTML: {__html: string};
	}) => (
		<script id={id} type="application/ld+json">
			{dangerouslySetInnerHTML.__html}
		</script>
	),
}));

jest.mock('../utils/generateStructuredData', () => ({
	generateStructuredData: jest.fn(),
}));

jest.mock('../utils/getFullCanonicalUrl', () => ({
	getFullCanonicalUrl: jest.fn(),
}));

const mockedGenerateStructuredData = jest.mocked(generateStructuredData);
const mockedGetFullCanonicalUrl = jest.mocked(getFullCanonicalUrl);

describe('CustomHead', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedGenerateStructuredData.mockReturnValue({
			'@context': 'https://schema.org',
			'@graph': [{'@type': 'LocalBusiness', name: 'Premier Design'}],
		});
		mockedGetFullCanonicalUrl.mockReturnValue('https://example.com/logo.png');
	});

	it('renders seo meta tags, canonical and structured data', () => {
		const {container} = render(
			<CustomHead
				metaTitle="Дизайн интерьера под ключ"
				metaDescription="Полный цикл работ по ремонту и дизайну"
				canonical="https://example.com/design"
			/>,
		);

		expect(headMock).toHaveBeenCalledTimes(1);
		expect(mockedGenerateStructuredData).toHaveBeenCalledTimes(1);
		expect(mockedGenerateStructuredData).toHaveBeenCalledWith({
			faqItems: undefined,
			aggregateRating: undefined,
			service: undefined,
		});
		expect(mockedGetFullCanonicalUrl).toHaveBeenCalledWith('/logo.png');
		expect(container.querySelector('#structured-data')).toHaveTextContent('LocalBusiness');
	});
});
