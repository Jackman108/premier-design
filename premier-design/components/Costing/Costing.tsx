import styles from './Costing.module.css';
import CostingCards from '../Cards/CostingCards/CostingCards';
import Title from '../UX/Title/Title';
import {findItemByShortTitle} from '../../pages/api/constants';
import {DataProps} from '../../interface/interfaceData';
import {FC, ReactElement} from 'react';

const Costing: FC<{ data: DataProps }> = ({
                                              data
                                          }): ReactElement => {
    const {title = '', description = '', shortTitle = ''} = findItemByShortTitle(data.title, "price-calculation") || {};
    return (
        <section className={styles.costing}>
            <div className={styles.costing__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                    shortTitle={shortTitle}
                />
                <CostingCards
                    data={data.cards.costingCard}
                />
            </div>
        </section>
    );
};
export default Costing;
