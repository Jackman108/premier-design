'use client';

import React, {FC, useEffect, useState} from 'react';
import styles from './CollapsibleContainer.module.css';
import {CollapsibleContainerProps} from '../../../interface/CalculatorModal.props';

const CollapsibleContainer: FC<CollapsibleContainerProps> = ({
                                                                 items,
                                                                 activeItem,
                                                                 activeLabel,
                                                                 onItemClick
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
                aria-label="Сввернуть аккордион"
            >
                <span>{activeLabel}</span>
                <span className={isCollapsed ? styles.arrow_right : styles.arrow_down}>
                    {'<'}
                </span>
            </button>
            {!isCollapsed && (
                <div className={styles.collapse_body}>
                    {items.map((item) => (
                        <button
                            key={item.value}
                            className={activeItem === item.value ? styles.active : styles.inactive}
                            onClick={() => {
                                onItemClick(item.value);
                                setIsCollapsed(!isCollapsed);
                            }}
                            aria-label="Развернуть аккордион"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


export default CollapsibleContainer;
