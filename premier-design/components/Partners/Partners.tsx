import {FC, ReactElement} from 'react';
import styles from './Partners.module.css';
import Title from '../UX/Title/Title';
import Image from 'next/image';
import {PartnersSectionProps} from "../../interface/Partners.props";

const Partners: FC<PartnersSectionProps> = ({title, partners}): ReactElement => {
    return (
        <section className={styles.partners}>

            <div className={styles.partners__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title.title}
                    description={title.description}
                    shortTitle={title.shortTitle}
                />
                <div className={styles.partners__cards}>
                    {partners.map((partner) => (
                        <div
                            key={partner.id}
                            className={styles.partners__card}
                        >
                            <Image
                                priority={false}
                                src={partner.src}
                                alt={partner.alt}
                                quality={partner.quality}
                                width={partner.width}
                                height={partner.height}
                                placeholder='empty'
                                className={styles.partners__image}
                                loading={'lazy'}
                            />
                            <p className={styles.partners__discounts}>
                                {partner.discounts}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
export default Partners;