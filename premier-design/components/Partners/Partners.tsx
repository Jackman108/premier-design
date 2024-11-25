import {FC} from 'react';
import styles from './Partners.module.css';
import Title from '../UX/Title/Title';
import Image from 'next/image';
import {GetDataProps} from '../../interface/interfaceData';
import {findTitle} from '../../pages/api/constants';

const Partners: FC<GetDataProps> = ({
                                        data
                                    }): JSX.Element => {
    const {title = '', description = ''} = findTitle(data, 12) || {};
    return (
        <section className={styles.partners}>

            <div className={styles.partners__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                />
                <div className={styles.partners__cards}>
                    {data.partners.map((partner) => (
                        <div
                            key={partner.id}
                            className={styles.partners__card}
                        >
                            <Image
                                priority={false}
                                src={partner.src}
                                alt={partner.alt}
                                quality={partner.quality}
                                width={partner.width}
                                height={partner.height}
                                placeholder='empty'
                                className={styles.partners__image}
                                loading={'lazy'}
                            />
                            <p className={styles.partners__discounts}>
                                {partner.discounts}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
export default Partners;