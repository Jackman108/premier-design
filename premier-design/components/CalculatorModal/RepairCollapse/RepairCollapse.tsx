'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from './RepairCollapse.module.css';
import { RepairCollapseProps } from './RepairCollapse.props';

const RepairCollapse: FC<RepairCollapseProps> = ({
    repairType,
    handleRepairTypeChange
}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleOutsideClick = (event: MouseEvent) => {
        if (
            !(event.target instanceof Element) ||
            !event.target.closest(`.${styles.collapse_container}`)
        ) {
            setIsCollapsed(true);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className={styles.collapse_container}>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={styles.collapse_header}
            >
                <span>
                    {repairType === 'standard'
                        ? ' Стандартный ремонт'
                        : repairType === 'comfort'
                            ? ' Комфортный ремонт'
                            : repairType === 'business'
                                ? ' Бизнес-ремонт'
                                : ''}
                </span>
                <span className={isCollapsed ? styles.arrow_right : styles.arrow_down} >
                    {'<'}
                </span>
            </button>
            {!isCollapsed && (
                <div className={styles.collapse_body}>
                    <button
                        className={repairType === 'standard' ? styles.active : styles.inactive}
                        onClick={() => {
                            handleRepairTypeChange('standard');
                            setIsCollapsed(!isCollapsed);
                        }}
                    >
                        Стандартный ремонт
                    </button>
                    <button
                        className={repairType === 'comfort' ? styles.active : styles.inactive}
                        onClick={() => {
                            handleRepairTypeChange('comfort');
                            setIsCollapsed(!isCollapsed);
                        }}
                    >
                        Комфортный ремонт
                    </button>
                    <button
                        className={repairType === 'business' ? styles.active : styles.inactive}
                        onClick={() => {
                            handleRepairTypeChange('business');
                            setIsCollapsed(!isCollapsed);
                        }}
                    >
                        Бизнес ремонт
                    </button>
                </div>
            )}
        </div>
    );
};


export default RepairCollapse;
