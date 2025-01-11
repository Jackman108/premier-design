// components/RelatedServices/RelatedServices.tsx
import React from 'react';
import styles from './RelatedServices.module.css';
import {RelatedServicesProps} from "../../interface/Services.props";
import Image from "next/image";
import Link from "next/link";
import {findItemByTitle} from "../../utils/findItemByTitle";
import {TitleProps} from "../../interface/Title.props";
import Title from "../UX/Title/Title";

const RelatedServices: React.FC<RelatedServicesProps> = ({titles, relatedServices}) => {
    const titleData = findItemByTitle(titles, "related-services") || {} as TitleProps;

    return (
        <section className={styles.relatedServices}>
            <div className={styles.relatedServices__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={titleData.title}
                    description={titleData.description}
                    shortTitle={titleData.shortTitle}
                />
                <div className={styles.items}>
                    {relatedServices.map((service) => (
                        <div key={service.id} className={styles.item}>
                            <div className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        height={180}
                                        width={410}
                                        className={styles.image}
                                    />
                                </div>
                                <h3 className={styles.title}>

                                        <Link href={service.link} target="_blank" rel="noopener noreferrer">
                                            {service.title}
                                        </Link>

                                </h3>
                                <p className={styles.description}>{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedServices;
