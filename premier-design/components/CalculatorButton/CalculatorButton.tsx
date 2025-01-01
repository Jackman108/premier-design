import React, {FC, useState} from 'react';
import styles from './CalculatorButton.module.css';
import CalculatorModal from '../CalculatorModal/CalculatorModal';
import {CostingCardProps} from '../../interface/Cards.props';
import Image from "next/image";

interface CalculatorButtonProps {
    costingCards: CostingCardProps[];
}

const CalculatorButton: FC<CalculatorButtonProps> = ({costingCards}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen((prev) => !prev);

    return (
        <>
            <button className={styles.toggle_button} onClick={toggleModal}>
                <Image
                    src="/panel/calculator.svg"
                    alt="Калькулятор"
                    width={40}
                    height={36}
                    className={styles.button_icon}
                />
                <div className={styles.sticky_button_text}>
                    <span>Рассчитать стоимость</span>
                </div>
            </button>
            {isModalOpen && (
                <CalculatorModal
                    cards={costingCards}
                    card={costingCards[0]}
                    onClose={toggleModal}
                />
            )}
        </>
    );
};

export default CalculatorButton;
