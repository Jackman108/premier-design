import { FC, useMemo } from 'react';
import styles from './CostingCards.module.css';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../hooks/useResizeEffects';
import Link from 'next/link';
import NextImage from 'next/image';

const CostingCards: FC<{ data: CostingCardProps[] }> = ({ data }): JSX.Element => {
    const memoizedCostingCards = useMemo(() => data || [], []);

    const { isMobile } = useResizeEffects();
    const slidesPerView = 3;
    return (
        <div className={styles.costing__cards}>
            <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
                {memoizedCostingCards.map(({ id, title, image }: CostingCardProps) => (
                    <Link href="/about" className={styles.costing__card} key={id}>
                        <div className={styles.card__background}>
                            <NextImage
                                src={image}
                                alt={title}
                                className={styles.background}
                                width={425}
                                height={312}                                
                                loading='lazy'
                            />
                        </div>
                        <div className={styles.card__title}>{title}</div>
                    </Link>
                ))}
            </SliderComponent>
        </div>
    );
};

export default CostingCards;
