import styles from './Services.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import ServicesCards from '../Cards/ServicesCards/ServicesCards';
import Title from '../UX/Title/Title';
import {FC, ReactElement} from 'react';
import {findItemByTitle} from '../../utils/findItemByTitle';
import {TitleProps} from "../../interface/Title.props";
import {ButtonProps} from "../../interface/Button.props";
import {ServicesProps} from "../../interface/Services.props";

const Services: FC<ServicesProps> = ({titles, buttons, servicesCard}): ReactElement => {
    const titleData = findItemByTitle(titles, "services") || {} as TitleProps;
    const buttonData = findItemByTitle(buttons, "leave_request") || {} as ButtonProps;

    return (
        <section className={styles.services}>
            <div className={styles.services__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={titleData.title}
                    description={titleData.description}
                    shortTitle={titleData.shortTitle}
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