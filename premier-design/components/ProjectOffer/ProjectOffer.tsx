import Image from 'next/image';
import OrderButton from '../UX/OrderButton/OrderButton';
import {OrderButtonProps} from '../../interface/OrderButton.props';
import styles from './ProjectOffer.module.css';
import {FC, ReactElement} from "react";
import {OfferProjectProps} from "../../interface/OfferProject.props";

// Определение компонента ProjectOffer
const ProjectOffer: FC<{ data: OfferProjectProps[] } & OrderButtonProps> = ({
                                                                           data,
                                                                           buttonData,
                                                                           buttonStyle,
                                                                       }): ReactElement => {
    let evenCounter = 1;
    return (
        <section className={styles.offer}>
            <div className={styles.offer__container}>
                {data.map(({id, image, title, price, pros, cons, prosDescription, consDescription}: OfferProjectProps,) => {
                    {
                        evenCounter += 1;
                    }
                    return (
                        <div className={styles.offer__row} key={id}>
                            <div
                                className={`${styles.offer__left_column} ${evenCounter % 2 === 0 ? '' : styles.offer__left_column_reverse}`}>
                                <div className={styles.column__description}>
                                    <div className={styles.content_description}>
                                        <p className={styles.content_subTitle}>
                                            {pros}
                                        </p>
                                        <ul className={styles.description}>
                                            {prosDescription.map((description, index) => (
                                                <li key={index}>{description}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.content_description}>
                                        <p className={styles.content_subTitle}>
                                            {cons}
                                        </p>
                                        <ul className={styles.description}>
                                            {consDescription.map((description, index) => (
                                                <li key={index}>{description}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className={styles.order__button}>
                                    <OrderButton buttonData={buttonData} buttonStyle={buttonStyle}/>
                                </div>
                            </div>
                            <div
                                className={`${styles.offer__right_column} ${evenCounter % 2 === 0 ? styles.offer__right_column_reverse : ''}`}>
                                <div className={styles.offer__image}>
                                    <Image
                                        src={image}
                                        alt={title}
                                        className={styles.image__background}
                                        width={1935}
                                        height={1119}
                                        loading='lazy'
                                    />
                                </div>
                                <div className={styles.column__content}>
                                    <p className={styles.content_title}>
                                        {title}
                                    </p>
                                    <p className={styles.content_price}>
                                        {price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );

};
export default ProjectOffer;