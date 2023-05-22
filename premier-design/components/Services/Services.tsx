import styles from './Services.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import ServicesCards from '../Cards/ServicesCards/ServicesCards';
import Title from '../Title/Title';
import { FC } from 'react';
import { findTitle, findButton } from '../../pages/api/constants';

const Services: FC<{ data: DataProps }> = ({
    data
}): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 2) || {};
    const buttonHeader = findButton(data, 0);
    return (
        <section className={styles.services}>
            <div className={styles.services__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description} />
                <ServicesCards data={data} />
                <OrderButton buttonHeader={buttonHeader} buttonStyle='button-black' />
            </div>
        </section>
    );
};
export default Services;