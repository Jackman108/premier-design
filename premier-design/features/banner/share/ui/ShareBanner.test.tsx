/** @jest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import type {ImgHTMLAttributes, ReactNode} from 'react';
import ShareBanner from './ShareBanner';
import {findItemByTitle} from '@shared/utils/findItemByTitle';
import {useShareBanner} from '@features/banner/share/hooks/useShareBanner';

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({href, children, className, rel}: {href: string; children: ReactNode; className?: string; rel?: string}) => (
		<a href={href} className={className} rel={rel}>
			{children}
		</a>
	),
}));

jest.mock('next/image', () => ({
	__esModule: true,
	default: (
		props: ImgHTMLAttributes<HTMLImageElement> & {
			priority?: boolean;
			fill?: boolean;
			quality?: number;
			placeholder?: string;
		},
	) => {
		// next/image-специфичные пропы не на нативный <img> (см. react-dom "non-boolean attribute `priority`").
		const {src, alt, width, height, className, sizes, loading, decoding, ...nextOnly} = props;
		void nextOnly;
		return (
			// next/image в тесте — нативный img; специфичные пропы Next не в DOM.
			// eslint-disable-next-line @next/next/no-img-element -- намеренный мок
			<img
				src={typeof src === 'string' ? src : undefined}
				alt={alt ?? ''}
				width={width}
				height={height}
				className={className}
				sizes={sizes}
				loading={loading}
				decoding={decoding}
			/>
		);
	},
}));

jest.mock('@shared/utils/findItemByTitle', () => ({
	findItemByTitle: jest.fn(),
}));

jest.mock('@features/banner/share/hooks/useShareBanner', () => ({
	useShareBanner: jest.fn(),
}));

const mockedFindItemByTitle = jest.mocked(findItemByTitle);
const mockedUseShareBanner = jest.mocked(useShareBanner);

describe('ShareBanner', () => {
	it('renders banner and handles close click', () => {
		const handleClose = jest.fn();
		mockedFindItemByTitle.mockReturnValue({
			link: 'https://example.com',
			imageDesc: {src: '/shares/share-el-d.webp', alt: 'desktop', quality: 80, width: 1200, height: 500},
			imageMob: {src: '/shares/share-el-m.webp', alt: 'mobile', quality: 80, width: 600, height: 400},
		} as never);
		mockedUseShareBanner.mockReturnValue({isClosed: false, handleClose});

		render(<ShareBanner isSticky={false} shares={[]} />);
		expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');

		fireEvent.click(screen.getByRole('button'));
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it('returns null when sticky or closed', () => {
		mockedFindItemByTitle.mockReturnValue({} as never);
		mockedUseShareBanner.mockReturnValue({isClosed: false, handleClose: jest.fn()});
		const {container, rerender} = render(<ShareBanner isSticky shares={[]} />);
		expect(container.firstChild).toBeNull();

		mockedUseShareBanner.mockReturnValue({isClosed: true, handleClose: jest.fn()});
		rerender(<ShareBanner isSticky={false} shares={[]} />);
		expect(container.firstChild).toBeNull();
	});
});
