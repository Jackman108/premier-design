import {FC, ReactElement} from 'react';
import styles from './ServicesCards.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {ServiceCardProps} from "../../../interface/Cards.props";

const ServicesCards: FC<{ cards: ServiceCardProps[] }> = ({cards}): ReactElement => {

    return (
        <div className={styles.services__cards}>
            {(cards.map(({id, text, image, href}: ServiceCardProps) => (
                <Link href={href} className={styles.services__card} key={id}>
                    <div className={styles.card__title}> {text} </div>
                    <div className={styles.card__image}>
                        <Image
                            src={image}
                            alt={text}
                            className={styles.image__background}
                            width={400}
                            height={243}
                            loading='lazy'
                            priority={false}
                        />
                    </div>
                </Link>
            )))}
        </div>
    );
};
export default ServicesCards;