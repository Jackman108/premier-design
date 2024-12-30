import {FC, ReactElement} from 'react';
import CategoryCollapse from '../CategoryCollapse/CategoryCollapse';
import styles from './Category.module.css';
import {DataProps} from "../../interface/interfaceData";
import {findItemByTitle} from "../../utils/findItemByTitle";
import Title from "../UX/Title/Title";
import OrderButton from "../UX/OrderButton/OrderButton";
import {ButtonProps} from "../../interface/Button.props";

const Category: FC<{ data: DataProps }> = ({data}): ReactElement => {
    const {title = '', description = '', shortTitle = ''} = findItemByTitle(data.title, "repair-categories") || {};
    const buttonData = findItemByTitle(data.button, "leave_request") || {} as ButtonProps;

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
                    {data.prices.repairs.map((category) => (
                        <CategoryCollapse key={category.id} category={category}/>
                    ))}
                </div>
                <OrderButton
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-black'
                />
            </div>
        </section>
    );
};

export default Category;
