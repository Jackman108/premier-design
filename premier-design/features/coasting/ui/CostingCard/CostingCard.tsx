'use strict'
import {FC, ReactElement} from 'react';
import styles from './CostingCard.module.css';
import Image from 'next/image';
import {CostingCardProps} from "@features/coasting/interface/Costing.props";

const CostingCard: FC<CostingCardProps> = ({
                                               id,
                                               title,
                                               image,
                                               onClick,
                                               onKeyDown,
                                               role,
                                               tabIndex,
                                               ariaLabel
                                           }): ReactElement => {

    return (
        <div key={id} className={styles.costing__card} onClick={onClick} onKeyDown={onKeyDown} role={role}
             tabIndex={tabIndex}
             aria-label={ariaLabel}>
            <div className={styles.card__background}>
                <Image
                    src={image}
                    alt={title}
                    className={styles.image}
                    width={460}
                    height={580}
                    loading='lazy'
                />
            </div>
            <div className={styles.card__title}>{title}</div>
        </div>

    );
};

export default CostingCard;
