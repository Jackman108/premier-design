import {FC, ReactElement} from 'react';
import CategoryCollapse from '../CategoryCollapse/CategoryCollapse';
import styles from './Category.module.css';
import {DataProps} from "../../interface/interfaceData";
import {findItemByTitle} from "../../utils/findItemByTitle";
import Title from "../UX/Title/Title";

const Category: FC<{ data: DataProps }> = ({data}): ReactElement => {
    const {title = '', description = '', shortTitle = ''} = findItemByTitle(data.title, "repair-categories") || {};

    return (
        <section className={styles.categorySection}>
            <div className={styles.container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                    shortTitle={shortTitle}
                />
                <div className={styles.categories}>
                    {data.prices.repairs.map((category) => (
                        <CategoryCollapse key={category.id} category={category}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
