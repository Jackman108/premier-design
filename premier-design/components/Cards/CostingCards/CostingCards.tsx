'use strict'
import { FC, useEffect, useState } from 'react';
import styles from './CostingCards.module.css';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../../hooks/useResizeEffects';
import NextImage from 'next/image';
import CalculatorModal from '../../CalculatorModal/CalculatorModal';
import { CostingCardProps } from '../../../pages/[types]/Data';

const CostingCards: FC<{ data: CostingCardProps[] }> = ({ data }): JSX.Element => {
    const { isMobile } = useResizeEffects();
    const slidesPerView = 3;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<CostingCardProps | null>(null);

    const handleCardClick = (card: CostingCardProps) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCard(null);
    };

    useEffect(() => {
        setIsModalOpen(false);
        setSelectedCard(null);
    }, [data]);
    return (
        <div className={styles.costing__cards}>
            <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
                {data.map(({ id, title, image }: CostingCardProps) => (
                    <div
                        className={styles.costing__card}
                        key={id}
                        onClick={() => handleCardClick({ id, title, image })}
                    >
                        <div className={styles.card__background}>
                            <NextImage
                                src={image}
                                alt={title}
                                className={styles.background}
                                width={380}
                                height={520}
                                loading='lazy'
                            />
                        </div>
                        <div className={styles.card__title}>{title}</div>
                    </div>
                ))}
            </SliderComponent>
            {isModalOpen && selectedCard && (
                <CalculatorModal 
                card={selectedCard} 
                onClose={closeModal} 
                data={data}
                />
            )}
        </div>
    );
};

export default CostingCards;
