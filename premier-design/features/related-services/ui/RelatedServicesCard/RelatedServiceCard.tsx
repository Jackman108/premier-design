// RelatedServicesCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './RelatedServiceCard.module.css';
import {RelatedServiceCardProps} from "@features/related-services/interface/RelatedService.props";

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
                            fill
                            src={relatedService.image}
                            alt={relatedService.title}
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 410px"
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
