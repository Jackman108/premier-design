'use client';

import React, {FC} from 'react';
import styles from './CollapsibleContainer.module.css';
import {CollapsibleContainerProps} from '@shared/ui/estimate-modal/interface/EstimateModal.props';
import {useCollapsibleContainer} from '@shared/ui/estimate-modal/hooks/useCollapsibleContainer';

const CollapsibleContainer: FC<CollapsibleContainerProps> = ({
                                                                 items,
                                                                 activeItem,
                                                                 activeLabel,
                                                                 onItemClick
                                                             }) => {
    const {containerRef, isCollapsed, handleToggleCollapse, handleSelectItem} = useCollapsibleContainer();

    return (
        <div className={styles.collapse_container} ref={containerRef}>
            <button
                onClick={handleToggleCollapse}
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
                            onClick={handleSelectItem(onItemClick, item.value)}
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
