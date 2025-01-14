// RelatedServicesCards.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './RelatedServiceCard.module.css';
import {RelatedServiceCardProps} from "../../../interface/RelatedService.props";

const RelatedServiceCard: React.FC<RelatedServiceCardProps> = (relatedService) => {
    return (
        <Link
            key={relatedService.id}
            href={relatedService.canonical}
            rel="noopener noreferrer"
            className={styles.itemLink}
        >
            <div className={styles.item}>
                <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={relatedService.image}
                            alt={relatedService.title}
                            height={180}
                            width={410}
                            loading="lazy"
                            priority={false}
                            className={styles.image}
                        />
                    </div>
                    <h3 className={styles.title}>{relatedService.title}</h3>
                    <p className={styles.description}>{relatedService.subTitle}</p>
                </div>
            </div>

        </Link>

    )
        ;
};

export default RelatedServiceCard;
