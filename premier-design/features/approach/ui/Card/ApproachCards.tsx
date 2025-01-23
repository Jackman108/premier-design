import {FC, ReactElement} from 'react';
import styles from './ApproachCards.module.css';
import Image from 'next/image';
import {ApproachCardProps} from "@features/approach/interface/ApproachCard.props";

const ApproachCards: FC<{ cards: ApproachCardProps[] }> = ({cards}): ReactElement => {
    return (
        <div className={styles.approach__cards}>
            {cards.map(({id, image, title, description}) => (
                <div className={styles.approach__card} key={id}>
                    <div className={styles.card__image}>
                        <Image
                            src={image}
                            alt={title}
                            width={78}
                            height={78}
                            style={{width: "auto", height: "auto"}}
                        />
                    </div>
                    <div className={styles.card__title}>
                        {title}
                    </div>
                    <div className={styles.card__description}>
                        {description}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ApproachCards;