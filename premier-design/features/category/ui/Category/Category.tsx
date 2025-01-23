import {FC, ReactElement} from 'react';
import CategoryCollapse from '@features/category/ui/CategoryCollapse/CategoryCollapse';
import styles from './Category.module.css';
import {findItemByTitle} from "@shared/utils/findItemByTitle";
import Title from "@shared/ui/title/ui/Title";
import OrderButton from "@shared/ui/order/ui/OrderButton/OrderButton";
import {ButtonProps} from "@shared/interface/Button.props";
import {CategoryProps} from "@features/category/interface/Category.props";

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
