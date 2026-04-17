/** @jest-environment jsdom */
import {fireEvent, render, screen} from '@testing-library/react';
import type {ImgHTMLAttributes, ReactNode} from 'react';
import ShareBanner from './ShareBanner';
import {findItemByTitle} from '@shared/utils/findItemByTitle';
import {useShareBanner} from '@features/banner/share/hooks/useShareBanner';

jest.mock('next/link', () => ({
	__esModule: true,
	default: ({href, children, ...rest}: {href: string; children: ReactNode}) => (
		<a href={href} {...rest}>
			{children}
		</a>
	),
}));

jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: ImgHTMLAttributes<HTMLImageElement> & {priority?: boolean; fill?: boolean}) => {
		const {src, alt, width, height, className, sizes, loading, decoding} = props;
		return (
			// next/image в тесте заменён на нативный img; пропсы вроде priority не в DOM.
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
		mockedUseShareBanner.mockReturnValue({isClosed: false, isReady: true, handleClose});

		render(<ShareBanner isSticky={false} shares={[]} />);
		expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');

		fireEvent.click(screen.getByRole('button'));
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it('returns null when not ready or sticky or closed', () => {
		mockedFindItemByTitle.mockReturnValue({} as never);
		mockedUseShareBanner.mockReturnValue({isClosed: false, isReady: false, handleClose: jest.fn()});
		const {container, rerender} = render(<ShareBanner isSticky={false} shares={[]} />);
		expect(container.firstChild).toBeNull();

		mockedUseShareBanner.mockReturnValue({isClosed: true, isReady: true, handleClose: jest.fn()});
		rerender(<ShareBanner isSticky={false} shares={[]} />);
		expect(container.firstChild).toBeNull();
	});
});
