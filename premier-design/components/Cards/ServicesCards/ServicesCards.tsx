import { FC, useMemo } from 'react';
import styles from './ServicesCards.module.css';
import Link from 'next/link';
import NextImage from 'next/image';

const ServicesCards: FC<{ data: DataProps }> = ({ data }): JSX.Element => {
    const memoizedServicesCards = useMemo(() => data.cards?.servicesCard || [], []);
    return (
        <div className={styles.services__cards}>
            {memoizedServicesCards.map(({ id, text, image, href }: ServiceCardProps) => (
                <Link href={href} className={styles.services__card} key={id}>
                    <div className={styles.card__title}>
                        {text}
                    </div>
                    <div className={styles.card__image}>
                        <NextImage
                            src={image}
                            alt={text}
                            className={styles.image__background}
                            width={425}
                            height={243}
                            loading='lazy'
                            priority={false}
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
};
export default ServicesCards;