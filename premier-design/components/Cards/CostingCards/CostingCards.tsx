'use strict'
import {FC, ReactElement, useEffect, useState} from 'react';
import styles from './CostingCards.module.css';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../../hooks/useResizeEffects';
import Image from 'next/image';
import CalculatorModal from '../../CalculatorModal/CalculatorModal';
import {CostingCardProps} from "../../../interface/Cards.props";
import {useModalState} from "../../../hooks/useModalState";

const CostingCards: FC<{ cards: CostingCardProps[] }> = ({
                                                             cards
                                                         }): ReactElement => {
    const {isMobile} = useResizeEffects();
    const slidesPerView = 3;

    const {isOpen: isModalOpen, openModal, closeModal} = useModalState(false);
    const [selectedCard, setSelectedCard] = useState<CostingCardProps | null>(null);

    const handleCardClick = (card: CostingCardProps) => {
        setSelectedCard(card);
        openModal();
    };

    useEffect(() => {
        closeModal();
        setSelectedCard(null);
    }, [cards, closeModal]);

    return (
        <div className={styles.costing__cards} id="costing-cards">
            <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
                {cards.map(({id, title, image}: CostingCardProps) => (
                    <div
                        className={styles.costing__card}
                        key={id}
                        onClick={() => handleCardClick({id, title, image})}
                    >
                        <div className={styles.card__background}>
                            <Image
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
                    cards={cards}
                />
            )}
        </div>
    );
};

export default CostingCards;
