import React from 'react';
import styles from './RelatedServices.module.css';
import {findItemByTitle} from "../../utils/findItemByTitle";
import {TitleProps} from "../../interface/Title.props";
import Title from "../UX/Title/Title";
import {RelatedServicesProps} from "../../interface/RelatedService.props";
import useResizeEffects from "../../hooks/useResizeEffects";
import Slider from "../Slider/Slider";
import RelatedServiceCard from "../Cards/RelatedServicesCards/RelatedServiceCard";

const RelatedServices: React.FC<RelatedServicesProps> = ({titles, relatedServices}) => {
    const titleData = findItemByTitle(titles, "related-services") || {} as TitleProps;
    const {isMobile} = useResizeEffects();


    return (
        <section className={styles.relatedServices}>
            <div className={styles.relatedServices__container} id={`related-services`}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={titleData.title}
                    description={titleData.description}
                    shortTitle={titleData.shortTitle}
                />
                <div className={styles.items}>
                    {isMobile ? (
                        <Slider isMobile={isMobile} slidesPerView={1}>
                            {relatedServices.map((relatedService) => (
                                <RelatedServiceCard key={relatedService.id} {...relatedService} />
                            ))}
                        </Slider>
                    ) : (
                        relatedServices.map((relatedService) => (
                            <RelatedServiceCard key={relatedService.id} {...relatedService} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default RelatedServices;
