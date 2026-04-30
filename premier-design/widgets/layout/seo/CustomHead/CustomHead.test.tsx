/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import CustomHead from './CustomHead';
import { generateStructuredData } from '@shared/lib/seo/generateStructuredData';
import { getFullCanonicalUrl } from '@shared/utils/getFullCanonicalUrl';

jest.mock('next/script', () => ({
	__esModule: true,
	default: ({
		id,
		dangerouslySetInnerHTML,
	}: {
		id: string;
		dangerouslySetInnerHTML: { __html: string };
	}) => (
		<script id={id} type="application/ld+json">
			{dangerouslySetInnerHTML.__html}
		</script>
	),
}));

jest.mock('@shared/lib/seo/generateStructuredData', () => ({
	generateStructuredData: jest.fn(),
}));

jest.mock('@shared/utils/getFullCanonicalUrl', () => ({
	getFullCanonicalUrl: jest.fn(),
}));

const mockedGenerateStructuredData = jest.mocked(generateStructuredData);
const mockedGetFullCanonicalUrl = jest.mocked(getFullCanonicalUrl);

describe('CustomHead (StructuredDataScript)', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedGenerateStructuredData.mockReturnValue({
			'@context': 'https://schema.org',
			'@graph': [{ '@type': 'LocalBusiness', name: 'Premium Design' }],
		});
		mockedGetFullCanonicalUrl.mockReturnValue('https://example.com/logo.png');
	});

	it('renders structured data script', () => {
		const { container } = render(
			<CustomHead
				metaTitle="Дизайн интерьера под ключ"
				metaDescription="Полный цикл работ по ремонту и дизайну"
				canonical="https://example.com/design"
			/>,
		);

		expect(mockedGenerateStructuredData).toHaveBeenCalledTimes(1);
		expect(mockedGenerateStructuredData).toHaveBeenCalledWith({
			faqItems: undefined,
			aggregateRating: undefined,
			service: undefined,
		});
		expect(container.querySelector('#structured-data')).toHaveTextContent('LocalBusiness');
	});
});
