'use client';

import styles from './Costing.module.css';
import CostingCard from '@features/coasting/ui/CostingCard/CostingCard';
import Title from '@shared/ui/title/ui/Title';
import {FC, ReactElement} from 'react';
import {CostingProps} from "@features/coasting/interface/Costing.props";
import {useCostingCardLogic} from "@features/coasting/hooks/useCostingCardLogic";
import CalculatorModal from "@shared/ui/calculator-modal/ui/CalculatorModal/CalculatorModal";
import SliderComponent from '@shared/ui/slider/ui/Slider';

const Costing: FC<CostingProps> = ({cards, title}): ReactElement => {
    const {
        isMobile,
        isModalOpen,
        selectedCard,
        handleCardClick,
        handleKeyDown,
        closeModal,
        memoizedCards,
        slidesPerView
    } = useCostingCardLogic(cards)

    return (
        <section className={styles.costing}>
            <div className={styles.costing__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title.title}
                    description={title.description}
                    shortTitle={title.shortTitle}
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