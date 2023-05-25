'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from './PropertyCollapse.module.css';
import { PropertyCollapseProps } from './PropertyCollapse.props';

const PropertyCollapse: FC<PropertyCollapseProps> = ({
    propertyType,
    handlePropertyTypeChange
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
                    {propertyType === 'new' ? ' Новое жилье' : "Вторичное жилье"}
                </span>
                <span className={isCollapsed ? styles.arrow_right : styles.arrow_down} >
                    {'<'}
                </span>
            </button>
            {!isCollapsed && (
                <div className={styles.collapse_body}>
                    <button
                        className={propertyType === 'new' ? styles.active : styles.inactive}
                        onClick={() => {
                            handlePropertyTypeChange('new');
                            setIsCollapsed(!isCollapsed);
                        }}
                    >
                        Новое жилье
                    </button>
                    <button
                        className={propertyType === 'secondary' ? styles.active : styles.inactive}
                        onClick={() => {
                            handlePropertyTypeChange('secondary');
                            setIsCollapsed(!isCollapsed);
                        }}
                    >
                        Вторичное жилье
                    </button>
                </div>
            )}
        </div>
    );
};


export default PropertyCollapse;
