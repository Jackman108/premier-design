import styles from './Services.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import ServicesCards from '../Cards/ServicesCards/ServicesCards';
import Title from '../Title/Title';
import { FC } from 'react';



const Services: FC<{ data: DataProps }> = ({ 
    data 
}): JSX.Element => {
    const foundTitle: TitleProps | undefined = data.title.find((item: TitleProps): boolean => item.id === 2);
    const title = foundTitle?.title ?? '';
    const description = foundTitle?.description ?? '';
    return (
        <section className={styles.services}>
            <div className={styles.services__container}>
                <Title
                    id={foundTitle?.id ?? 2}
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description} />
                <ServicesCards data={data} />
                <OrderButton buttonHeader={'Оставить заявку'} buttonStyle='button-black' />
            </div>
        </section>
    );
};
export default Services;