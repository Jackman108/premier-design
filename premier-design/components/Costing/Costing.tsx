import styles from './Costing.module.css';
import CostingCards from '../Cards/CostingCards/CostingCards';
import Title from '../Title/Title';
import { findTitle } from '../../pages/api/constants';
import { DataProps } from '../../interface/interfaceData';
import { FC } from 'react';

const Costing: FC<{ data: DataProps }> = ({
    data
}): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 5) || {};
    return (
        <section className={styles.costing}>
            <div className={styles.costing__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                />
                <CostingCards
                    data={data.cards.costingCard}
                />
            </div>
        </section>
    );
};
export default Costing;
