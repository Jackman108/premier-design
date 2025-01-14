'use client';

import styles from './Costing.module.css';
import CostingCard from '../Cards/CostingCards/CostingCard';
import Title from '../UX/Title/Title';
import {findItemByTitle} from '../../utils/findItemByTitle';
import {FC, ReactElement, useMemo} from 'react';
import {CostingProps} from "../../interface/Costing.props";
import useResizeEffects from "../../hooks/useResizeEffects";
import {useCostingCardLogic} from "../../hooks/useCostingCardLogic";
import CalculatorModal from "../CalculatorModal/CalculatorModal";
import SliderComponent from '../Slider/Slider';

const Costing: FC<CostingProps> = ({
                                       cards,
                                       titles,
                                   }): ReactElement => {
    const {title = '', description = '', shortTitle = ''} = findItemByTitle(titles, "price-calculation") || {};
    const {isMobile} = useResizeEffects();
    const slidesPerView = 3;
    const {isModalOpen, selectedCard, handleCardClick, handleKeyDown, closeModal} = useCostingCardLogic(cards)
    const memoizedCards = useMemo(() => cards || [], [cards]);

    return (
        <section className={styles.costing}>
            <div className={styles.costing__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                    shortTitle={shortTitle}
                />
                <div className={styles.costing__cards} id="costing-cards">
                    <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
                        {memoizedCards.map((card) => (

                            <CostingCard
                                key={card.id}
                                {...card}
                                onClick={() => handleCardClick(card)}
                                onKeyDown={(e) => handleKeyDown(e, card)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Открыть калькулятор для ${card.title}`}
                            />
                        ))}
                    </SliderComponent>
                </div>
            </div>
            {isModalOpen && selectedCard && (
                <CalculatorModal
                    card={selectedCard}
                    onClose={closeModal}
                    cards={cards}
                />
            )}
        </section>
    );
};

export default Costing;