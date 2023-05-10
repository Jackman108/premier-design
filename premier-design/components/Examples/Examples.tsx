import React from 'react';
import styles from './Examples.module.css';
import ExamplesCards from '../Cards/ExamplesCards/ExamplesCards';
import Title from '../Title/Title';
import data from '../../data/data.json';


const Examples: React.FC = (): JSX.Element => {
    const foundTitle: TitleProps | undefined = data.title.find((item: TitleProps): boolean =>
        item.id === 4);
    const title = foundTitle?.title ?? '';
    const description = foundTitle?.description ?? '';
    return (
        <section className={styles.examples}>
            <div className={styles.examples__container}>
                <Title
                    id={foundTitle?.id ?? 4}
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description} />
                <ExamplesCards data={data.list.examples} />
            </div>
        </section>
    );
};
export default Examples;
