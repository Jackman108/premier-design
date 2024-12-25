import styles from './Services.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import ServicesCards from '../Cards/ServicesCards/ServicesCards';
import Title from '../UX/Title/Title';
import {FC, ReactElement} from 'react';
import {findItemByTitle} from '../../utils/findItemByTitle';
import {ButtonProps, DataProps, TitleProps} from '../../interface/interfaceData';

const Services: FC<{ data: DataProps }> = ({
                                               data
                                           }): ReactElement => {
    const titleData = findItemByTitle(data.title, "services") || {} as TitleProps;
    const buttonData = findItemByTitle(data.button, "leave_request") || {} as ButtonProps;

    const {title = '', description = '', shortTitle = ''} = titleData;
    return (
        <section className={styles.services}>
            <div className={styles.services__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                    shortTitle={shortTitle}
                />
                <ServicesCards data={data}/>
                <OrderButton
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-black'
                />
            </div>
        </section>
    );
};
export default Services;