import React from 'react';
import styles from './RelatedServices.module.css';
import Image from "next/image";
import Link from "next/link";
import {findItemByTitle} from "../../utils/findItemByTitle";
import {TitleProps} from "../../interface/Title.props";
import Title from "../UX/Title/Title";
import {RelatedServicesProps} from "../../interface/RelatedService.props";

const RelatedServices: React.FC<RelatedServicesProps> = ({titles, relatedServices}) => {
    const titleData = findItemByTitle(titles, "related-services") || {} as TitleProps;

    return (
        <section className={styles.relatedServices}>
            <div className={styles.relatedServices__container} id={`related-services`}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={titleData.title}
                    description={titleData.description}
                    shortTitle={titleData.shortTitle}
                />
                <div className={styles.items}>
                    {relatedServices.map((service) => (
                        <Link
                            key={service.id}
                            href={service.canonical}
                            rel="noopener noreferrer"
                            className={styles.itemLink}
                        >
                            <div key={service.id} className={styles.item}>
                                <div className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            height={180}
                                            width={410}
                                            loading='lazy'
                                            priority={false}
                                            className={styles.image}
                                        />
                                    </div>
                                    <h3 className={styles.title}>{service.title}</h3>
                                    <p className={styles.description}>{service.subTitle}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedServices;
