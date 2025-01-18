'use client';
import {FC} from 'react';
import styles from './BusinessServices.module.css';
import {BusinessServicesProps} from "../../interface/BusinessService.props";
import OrderButton from "../UX/OrderButton/OrderButton";
import SliderComponent from '../Slider/Slider';
import useResizeEffects from "../../hooks/useResizeEffects";
import {findItemByTitle} from "../../utils/findItemByTitle";
import {TitleProps} from "../../interface/Title.props";
import {ButtonProps} from "../../interface/Button.props";
import Title from "../UX/Title/Title";
import BusinessServicesCard from "../Cards/BusinessServicesCard/BusinessServicesCard";
import List from "../UX/List/List";


const BusinessServices: FC<BusinessServicesProps> = ({
                                                         titles,
                                                         businessServices,
                                                         businessServiceCard,
                                                         buttonData,
                                                         buttonStyle
                                                     }) => {
    const titleData = findItemByTitle(titles, "business-services") || {} as TitleProps;
    const buttonHeader = findItemByTitle(buttonData, "get_counseling") || {} as ButtonProps;
    const {headline, reasons} = businessServices.callToAction;
    const {isMobile} = useResizeEffects();

    return (
        <section className={styles.businessServices} id={`repair-for-business`}>
            <div className={styles.container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={titleData.title}
                    description={titleData.description}
                    shortTitle={titleData.shortTitle}
                />
                <article className={styles.services}>
                    <SliderComponent slidesPerView={3} isMobile={isMobile}>
                        {businessServiceCard.map(({category, details, image}) => (
                            <BusinessServicesCard key={category} category={category} details={details} image={image}/>
                        ))}
                    </SliderComponent>

                </article>
                <div className={styles.callToAction}>
                    <h3 className={styles.headline}>{headline}</h3>
                    <List items={reasons} className={styles.reasons}/>
                    <OrderButton buttonData={buttonHeader.buttonHeader} buttonStyle={buttonStyle}/>
                </div>
            </div>
        </section>
    );
};

export default BusinessServices;
