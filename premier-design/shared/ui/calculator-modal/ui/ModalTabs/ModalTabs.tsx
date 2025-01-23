
'use client'

import React from 'react';
import styles from './ModalTabs.module.css';
import { ModalTabsProps } from '@shared/ui/calculator-modal/interface/CalculatorModal.props';

const ModalTabs: React.FC<ModalTabsProps> = ({
    data,
    selectedTab,
    handleTabChange
}) => {
    return (
        <div className={styles.modal_tabs}>
            {data.map((tab) => (
                <div
                    key={tab.id}
                    className={`${styles.tab} ${selectedTab === tab.id ? styles.active : ''}`}
                    onClick={() => handleTabChange(tab.id)}
                >
                    {tab.title}
                </div>
            ))}
        </div>
    );
};

export default ModalTabs;
