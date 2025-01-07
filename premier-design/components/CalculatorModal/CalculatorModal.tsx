'use client'
import {FC} from 'react';
import CollapsibleContainer from './CollapsibleContainer/CollapsibleContainer';
import CostInput from './CostInput/CostInput';
import Logo from '../UX/Logo/Logo';
import ModalTabs from './ModalTabs/ModalTabs';
import Preloader from '../UX/Preloader/Preloader';
import {CalculatorModalProps} from '../../interface/CalculatorModal.props';
import styles from './CalculatorModal.module.css';
import {typeItemsConfig} from "../../configs/factorsConfig";
import useCalculatorHandlers from "../../hooks/useCalculatorHandlers";

const CalculatorModal: FC<CalculatorModalProps> = ({cards, card, onClose}) => {
    const {
        selectedTab,
        inputValue,
        isLoading,
        result,
        error,
        propertyType,
        repairType,
        serviceType,
        inputValueAsNumber,
        handleTabChange,
        handleInputChange,
        handleTypeChange,
        handleCalculate,
    } = useCalculatorHandlers(card);

    const {repairTypeItems, propertyTypeItems, serviceTypeItems} = typeItemsConfig;

    return (
        <div className={styles.modal_overlay} onClick={() => onClose()}>
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modal_header}>
                    <h2 className={styles.header_title}>
                        Рассчитайте стоимость Вашего ремонта
                    </h2>
                    <button className={styles.header_close} onClick={() => onClose()} aria-label="Закрыть калькулятор">
                        &times;
                    </button>
                </div>
                <div className={styles.modal_body}>
                    <div className={styles.body_control}>
                        <ModalTabs
                            handleTabChange={handleTabChange}
                            selectedTab={selectedTab}
                            data={cards}
                        />
                        <CollapsibleContainer
                            items={serviceTypeItems}
                            activeItem={serviceType}
                            activeLabel={serviceTypeItems.find((item) => item.value === serviceType)?.label || ''}
                            onItemClick={(type: string) => handleTypeChange(type, 'service')}
                        />
                        <CollapsibleContainer
                            items={propertyTypeItems}
                            activeItem={propertyType}
                            activeLabel={propertyTypeItems.find((item) => item.value === propertyType)?.label || ''}
                            onItemClick={(type: string) => handleTypeChange(type, 'property')}
                        />
                        <CollapsibleContainer
                            items={repairTypeItems}
                            activeItem={repairType}
                            activeLabel={repairTypeItems.find((item) => item.value === repairType)?.label || ''}
                            onItemClick={(type: string) => handleTypeChange(type, 'repair')}
                        />
                        < CostInput
                            handleInputChange={handleInputChange}
                            inputValue={inputValue}
                        />
                    </div>
                    <div className={styles.body_result}>
                        <div className={styles.result_direction}>
                            <Logo/>
                        </div>
                        {isLoading &&
                            <div className={styles.calculate_loader}>
                                <Preloader/>
                            </div>
                        }
                        {!isLoading && error &&
                            <div className={styles.error_message}>
                                {error}
                            </div>
                        }
                        {!isLoading && result > 0 &&
                            <div className={styles.calculate_result}>
                                <p>
                                    Предварительная оценка стоимости ремонта:
                                </p>
                                <p>
                                    {result} бел.руб.
                                </p>
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.modal_footer}>
                    <button
                        className={styles.calculate_button}
                        onClick={handleCalculate}
                        disabled={isLoading || inputValueAsNumber <= 0 || inputValue === ''}
                        aria-label="Рассчитайте стоимость"
                    >
                        Рассчитать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalculatorModal;