import {FC, ReactElement} from 'react';
import CategoryCollapse from '../CategoryCollapse/CategoryCollapse';
import styles from './Category.module.css';
import {findItemByTitle} from "../../utils/findItemByTitle";
import Title from "../UX/Title/Title";
import OrderButton from "../UX/OrderButton/OrderButton";
import {ButtonProps} from "../../interface/Button.props";
import {CategoryProps} from "../../interface/Category.props";

const Category: FC<CategoryProps> = ({titles, buttonData, repairs}): ReactElement => {
    const {title = '', description = '', shortTitle = ''} = findItemByTitle(titles, "repair-categories") || {};
    const buttonHeader = findItemByTitle(buttonData, "leave_request") || {} as ButtonProps;

    return (
        <section className={styles.categories}>
            <div className={styles.categories__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                    shortTitle={shortTitle}
                />
                <div className={styles.categories__collapses}>
                    {repairs.map((category) => (
                        <CategoryCollapse key={category.id} category={category}/>
                    ))}
                </div>
                <OrderButton
                    buttonData={buttonHeader.buttonHeader}
                    buttonStyle='button-black'
                />
            </div>
        </section>
    );
};

export default Category;
