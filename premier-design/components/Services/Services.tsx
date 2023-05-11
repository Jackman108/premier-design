import styles from './Services.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import ServicesCards from '../Cards/ServicesCards/ServicesCards';
import Title from '../Title/Title';
import data from '../../data/data.json';
import { OrderButtonProps } from '../UX/OrderButton/OrderButton.props';


const Services: React.FC<OrderButtonProps> = (): JSX.Element => {
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
                <ServicesCards data={data.cards.servicesCard} />
                <OrderButton buttonHeader={'Оставить заявку'} buttonStyle='button-black' />
            </div>
        </section>
    );
};
export default Services;