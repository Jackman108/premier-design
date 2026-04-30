// ShareBanner.tsx
import React, { type CSSProperties, FC } from 'react';
import styles from './ShareBanner.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { findItemByTitle } from '@shared/utils/findItemByTitle';
import { useShareBanner } from '@features/banner/share/hooks/useShareBanner';
import { ShareBannerDataProps, ShareBannerProps } from '@features/banner/share/interface/ShareBanner.props';

const ShareBanner: FC<ShareBannerProps> = ({ isSticky, shares }) => {
	const shareData = findItemByTitle(shares, 'share_electric') || ({} as ShareBannerDataProps);
	const { link, imageDesc, imageMob }: ShareBannerDataProps = shareData;
	const { isClosed, handleClose } = useShareBanner();

	if (isSticky || isClosed) {
		return null;
	}

	// Один слот по aspect-ratio + fill: иначе два img в потоке меняют высоту при switch desktop/mobile → CLS в Lighthouse mobile.
	const mediaStyle = {
		'--share-aspect-desktop': `${imageDesc.width} / ${imageDesc.height}`,
		'--share-aspect-mobile': `${imageMob.width} / ${imageMob.height}`,
	} as CSSProperties;

	return (
		<div id="share-banner" className={styles.share__banner}>
			<div className={styles.banner__container}>
				<Link className={styles.banner__link} href={link} rel="noopener noreferrer">
					<span className={styles.banner__media} style={mediaStyle}>
						<Image
							priority
							fill
							src={imageDesc.src}
							alt={imageDesc.alt}
							quality={imageDesc.quality}
							placeholder="empty"
							sizes="100vw"
							className={`${styles.banner__img} ${styles.banner__imgDesktop}`}
						/>
						<Image
							src={imageMob.src}
							alt={imageDesc.alt}
							quality={imageDesc.quality}
							fill
							placeholder="empty"
							loading="lazy"
							sizes="100vw"
							className={`${styles.banner__img} ${styles.banner__imgMobile}`}
						/>
					</span>
				</Link>
				<button className={styles.banner__close} onClick={handleClose} type="button">
					&times;
				</button>
			</div>
		</div>
	);
};

export default ShareBanner;
