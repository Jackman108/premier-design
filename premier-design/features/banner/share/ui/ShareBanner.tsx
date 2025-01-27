// ShareBanner.tsx
import React, {FC} from 'react';
import styles from './ShareBanner.module.css';
import Link from "next/link";
import Image from "next/image";
import {findItemByTitle} from "@shared/utils/findItemByTitle";
import {useShareBanner} from "@features/banner/share/hooks/useShareBanner";
import {ShareBannerDataProps, ShareBannerProps} from "@features/banner/share/interface/ShareBanner.props";


const ShareBanner: FC<ShareBannerProps> = ({isSticky, shares}) => {
    const shareData = findItemByTitle(shares, "share_electric") || {} as ShareBannerDataProps;
    const {link, imageDesc, imageMob}: ShareBannerDataProps = shareData
    const {isClosed, handleClose} = useShareBanner();

    if (isSticky || isClosed) {
        return null;
    }

    return (
        <div id="share-banner" className={styles.share__banner}>
            <div className={styles.banner__container}>
                <Link
                    className={styles.banner__link}
                    href={link}
                    rel="noopener noreferrer"
                >
                    <Image
                        priority={true}
                        src={imageDesc.src}
                        alt={imageDesc.alt}
                        quality={imageDesc.quality}
                        width={imageDesc.width}
                        height={imageDesc.height}
                        placeholder='empty'
                        className={styles.banner__img + ' ' + styles.banner__imgDesktop}
                    />
                    <Image
                        priority={true}
                        src={imageMob.src}
                        alt={imageDesc.alt}
                        quality={imageDesc.quality}
                        width={imageDesc.width}
                        height={imageDesc.height}
                        placeholder='empty'
                        className={styles.banner__img + ' ' + styles.banner__imgMobile}
                    />
                </Link>
                <button
                    className={styles.banner__close}
                    onClick={handleClose}
                    type="button"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ShareBanner;
