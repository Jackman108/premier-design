import styles from './Approach.module.css';
import Title from '../Title/Title';
import ApproachCards from '../Cards/ApproachCards/ApproachCards';
import data from '../../data/data.json';

const Approach: React.FC = (): JSX.Element => {
    const foundTitle: TitleProps | undefined = data.title.find((item: TitleProps): boolean => item.id === 3);
    const title = foundTitle?.title ?? '';
    const description = foundTitle?.description ?? '';
    return (
        <section className={styles.approach}>
            <div className={styles.approach__container}>
                <Title
                    id={foundTitle?.id ?? 3}
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description} />
                <ApproachCards data={data.cards.approachCard} />
            </div>
        </section >
    );
};
export default Approach;