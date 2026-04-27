'use client';
import type {FC, KeyboardEvent, MouseEvent} from 'react';

import CollapsibleContainer from '@shared/ui/estimate-modal/ui/CollapsibleContainer/CollapsibleContainer';
import CostInput from '@shared/ui/estimate-modal/ui/CostInput/CostInput';
import Logo from '@shared/ui/logo/Logo';
import ModalTabs from '@shared/ui/estimate-modal/ui/ModalTabs/ModalTabs';
import Preloader from '@shared/ui/preloader/Preloader/Preloader';
import {BodyPortal} from '@shared/ui/portal/BodyPortal';
import {EstimateModalProps} from '@shared/ui/estimate-modal/interface/EstimateModal.props';
import {typeItemsConfig} from '@shared/ui/estimate-modal/configs/factorsConfig';
import useEstimateModalHandlers from '@shared/ui/estimate-modal/hooks/useEstimateModalHandlers';

import styles from './EstimateModal.module.css';

const EstimateModal: FC<EstimateModalProps> = ({cards, card, onClose}) => {
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
    } = useEstimateModalHandlers(card);

    const {repairTypeItems, propertyTypeItems, serviceTypeItems} = typeItemsConfig;
    const handleDialogMouseDown = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    const handleEscapeClose = (event: KeyboardEvent<HTMLDialogElement>) => {
        // Для `<dialog open>` (без showModal) явно дублируем ESC-закрытие для предсказуемого a11y-поведения.
        if (event.key === 'Escape') {
            event.preventDefault();
            onClose();
        }
    };

    return (
        <BodyPortal>
        <dialog
            className={styles.modal_overlay}
            open
            onCancel={onClose}
            onKeyDown={handleEscapeClose}
            onMouseDown={handleDialogMouseDown}
            aria-labelledby="estimate-modal-title"
        >
            <div className={styles.modal_container}>
                <div className={styles.modal_header}>
                    <h2 id="estimate-modal-title" className={styles.header_title}>
                        Рассчитайте стоимость Вашего ремонта
                    </h2>
                    <button className={styles.header_close} onClick={() => onClose()} aria-label="Закрыть смету">
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
                    <div className={styles.body_result} aria-live="polite" aria-atomic="true">
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
        </dialog>
        </BodyPortal>
    );
};

export default EstimateModal;