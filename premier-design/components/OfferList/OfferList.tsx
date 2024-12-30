import React, {FC, ReactElement} from 'react';
import styles from './OfferList.module.css';
import Image from 'next/image';
import {OfferType} from "../../interface/OfferList.props";

const OfferList: FC<{ data: OfferType }> = ({data}): ReactElement => {

    return (
        <section className={styles.offer}>
            <div className={styles.offer__container}>
                {
                    <div className={styles.offer__row} key={data.id}>
                        <div className={styles.offer__left_column}>
                            <div className={styles.offer__image}>
                                <Image
                                    src={data.image}
                                    alt="Premium Interior | Ремонт и дизайн интерьеров в Беларуси"
                                    className={styles.image__background}
                                    width={1935}
                                    height={1119}
                                />
                            </div>
                        </div>
                        <div className={styles.offer__right_column}>
                            <div className={styles.text__content}>
                                <p className={styles.content_subTitle}>
                                    {data.subTitle}
                                </p>
                                <ul className={styles.content_questions}>
                                    {data.questions.map((question, index) => (
                                        <li key={index}>{question}</li>
                                    ))}
                                </ul>
                                <p className={styles.content_description}>
                                    {data.description}
                                </p>
                                <p className={styles.content_tips}>
                                    {data.tips}
                                </p>
                            </div>
                        </div>
                    </div>

                }
            </div>
        </section>
    );
};
export default OfferList;