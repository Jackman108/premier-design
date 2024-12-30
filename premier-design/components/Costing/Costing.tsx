import styles from './Costing.module.css';
import CostingCards from '../Cards/CostingCards/CostingCards';
import Title from '../UX/Title/Title';
import {findItemByTitle} from '../../utils/findItemByTitle';
import {FC, ReactElement} from 'react';
import {CostingCardProps} from "../../interface/Cards.props";
import {TitleProps} from "../../interface/Title.props";

const Costing: FC<{ cards: CostingCardProps[]; titles: TitleProps[] }> = ({
                                                                              cards,
                                                                              titles,
                                                                          }): ReactElement => {
    const {title = '', description = '', shortTitle = ''} = findItemByTitle(titles, "price-calculation") || {};
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
                    data={cards}
                />
            </div>
        </section>
    );
};
export default Costing;
