import { FC, useMemo, useState } from 'react';
import styles from './CostingCards.module.css';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../hooks/useResizeEffects';
import NextImage from 'next/image';
import CalculatorModal from '../../CalculatorModal/CalculatorModal';

const CostingCards: FC<{ data: CostingCardProps[] }> = ({ data }): JSX.Element => {
    const memoizedCostingCards = useMemo(() => data || [], []);

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
    return (
        <div className={styles.costing__cards}>
            <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
                {memoizedCostingCards.map(({ id, title, image }: CostingCardProps) => (
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
                <CalculatorModal onClose={closeModal} />
            )}
        </div>
    );
};

export default CostingCards;
