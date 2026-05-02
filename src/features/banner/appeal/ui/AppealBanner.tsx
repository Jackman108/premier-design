import { type FC, type ReactElement } from 'react';

import type { AppealBannerProps } from '../interface/AppealBannerProps';
import OrderButton from '@shared/ui/order/ui/OrderButton/OrderButton';
import Title from '@shared/ui/title/ui/Title';
import NextImage from 'next/image';

import styles from './AppealBanner.module.css';

const APPEAL_BANNER_SIZES = '(max-width: 600px) 100vw, (max-width: 1440px) 60vw, 1935px';

const AppealBanner: FC<AppealBannerProps> = ({
	titleItem,
	buttonItem,
	bannerItem,
	sectionId,
	'aria-label': ariaLabel,
}): ReactElement => {
	return (
		<section aria-label={ariaLabel} className={styles.appeal} id={sectionId}>
			<NextImage
				alt={bannerItem.alt}
				className={styles.appeal__background}
				height={508}
				loading="lazy"
				placeholder="empty"
				quality={bannerItem.quality}
				sizes={APPEAL_BANNER_SIZES}
				src={bannerItem.src}
				width={bannerItem.width}
			/>
			<div aria-hidden className={styles.appeal__scrim} />
			<div className={styles.appeal__container}>
				<Title
					description={titleItem.description}
					descriptionStyle="description-black"
					shortTitle={titleItem.shortTitle}
					title={titleItem.title}
					titleStyle="title-black"
				/>
				<OrderButton buttonData={buttonItem.buttonHeader} buttonStyle="button-black" />
			</div>
		</section>
	);
};

export default AppealBanner;
