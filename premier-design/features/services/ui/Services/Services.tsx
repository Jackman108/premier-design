import styles from './Services.module.css';
import OrderButton from '@shared/ui/order/ui/OrderButton/OrderButton';
import ServicesCards from '../ServicesCards/ServicesCards';
import Title from '@shared/ui/title/ui/Title';
import {FC, ReactElement} from 'react';
import {findItemByTitle} from '@shared/utils/findItemByTitle';
import {ButtonProps} from "@shared/interface/Button.props";
import {ServicesProps} from "@features/services/interface/Services.props";

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