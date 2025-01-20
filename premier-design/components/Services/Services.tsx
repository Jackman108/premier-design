import styles from './Services.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import ServicesCards from '../Cards/ServicesCards/ServicesCards';
import Title from '../UX/Title/Title';
import {FC, ReactElement} from 'react';
import {findItemByTitle} from '../../utils/findItemByTitle';
import {ButtonProps} from "../../interface/Button.props";
import {ServicesProps} from "../../interface/Services.props";

const Services: FC<ServicesProps> = ({title, buttons, servicesCard}): ReactElement => {
    const buttonData = findItemByTitle(buttons, "leave_request") || {} as ButtonProps;

    return (
        <section className={styles.services}>
            <div className={styles.services__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title.title}
                    description={title.description}
                    shortTitle={title.shortTitle}
                />
                <ServicesCards cards={servicesCard}/>
                <OrderButton
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-black'
                />
            </div>
        </section>
    );
};
export default Services;