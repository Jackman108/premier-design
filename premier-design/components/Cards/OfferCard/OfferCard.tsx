import {FC, ReactElement} from "react";
import {DescriptionBlockProps, OfferCardProps} from "../../../interface/OfferProject.props";
import styles from "./OfferCard.module.css";
import OrderButton from "../../UX/OrderButton/OrderButton";
import Image from "next/image";

const OfferCard: FC<OfferCardProps> = ({offer, buttonData, buttonStyle, isReversed = false}): ReactElement => {
    const {image, title, price, pros, cons, prosDescription, consDescription} = offer;

    const DescriptionBlock: FC<DescriptionBlockProps> = ({title, descriptions}): ReactElement => (
        <div className={styles.offer__content_description}>
            <p className={styles.offer__content_subtitle}>{title}</p>
            <ul className={styles.offer__description_list}>
                {descriptions.map((desc, index) => (
                    <li key={index}>{desc}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className={`${styles.offer__row} ${isReversed ? styles.offer__row_reversed : ""}`}>
            <div className={styles.offer__column}>
                <div className={styles.offer__image}>
                    <Image src={image} alt={title} width={1935} height={1119} loading="lazy"/>
                </div>
                <div className={styles.offer__column_content}>
                    <p className={styles.offer__content_title}>{title}</p>
                    <p className={styles.offer__content_price}>{price}</p>
                </div>
            </div>
            <div className={styles.offer__column}>
                <DescriptionBlock title={pros} descriptions={prosDescription}/>
                <DescriptionBlock title={cons} descriptions={consDescription}/>
                <div className={styles.offer__order_button}>
                    <OrderButton buttonData={buttonData} buttonStyle={buttonStyle}/>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
