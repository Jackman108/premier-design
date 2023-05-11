import styles from './Costing.module.css';
import CostingCards from '../Cards/CostingCards/CostingCards';
import Title from '../Title/Title';
import data from '../../data/data.json';


const Costing: React.FC = (): JSX.Element => {
    const foundTitle: TitleProps | undefined = data.title.find((item: TitleProps): boolean => 
    item.id === 5);
    const title = foundTitle?.title ?? '';
    const description = foundTitle?.description ?? '';
    return (
        <section className={styles.costing}>
            <div className={styles.costing__container}>
            <Title
                    id={foundTitle?.id ?? 5}
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description} />
                <CostingCards data={data.cards.costingCard}/>
            </div>
        </section>
    );
};
export default Costing;
